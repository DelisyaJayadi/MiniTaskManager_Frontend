import React, { useEffect, useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { AuditLogModal } from './components/AuditLogModal';
import type { Task } from './api';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from './api';
import './index.css';

const ACTORS = ['john.doe', 'jane.smith', 'admin'];

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return <div style={{padding: 20, color: 'red'}}><h1>Something went wrong.</h1><pre>{String(this.state.error)}</pre></div>;
        }
        return this.props.children;
    }
}

function MainApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [actor, setActor] = useState<string>(ACTORS[0]);
    
    // Modal state
    const [viewingLogsFor, setViewingLogsFor] = useState<{ id: string, title: string } | null>(null);

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error("API did not return an array:", data);
            }
        } catch (e) {
            console.error("Failed to load tasks", e);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreate = async (title: string) => {
        try {
            await createTask(title);
            loadTasks();
        } catch (e) {
            alert("Failed to create task");
        }
    };

    const handleUpdateStatus = async (id: string, status: string, actor: string) => {
        try {
            await updateTaskStatus(id, status, actor);
            loadTasks();
        } catch (e: any) {
            alert(e.message || "Failed to update status");
            loadTasks(); // refresh to revert invalid local change if any
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await deleteTask(id);
            loadTasks();
        } catch (e) {
            alert("Failed to delete task");
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Mini Task Manager</h1>
                <div className="actor-select">
                    <label>Current Actor:</label>
                    <select value={actor} onChange={e => setActor(e.target.value)}>
                        {ACTORS.map(a => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                </div>
            </header>

            <TaskForm onCreate={handleCreate} />
            
            <TaskList 
                tasks={tasks} 
                actor={actor}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
                onViewLogs={(id, title) => setViewingLogsFor({ id, title })}
            />

            {viewingLogsFor && (
                <AuditLogModal 
                    taskId={viewingLogsFor.id} 
                    taskTitle={viewingLogsFor.title} 
                    onClose={() => setViewingLogsFor(null)} 
                />
            )}
        </div>
    );
}

export default function App() {
    return (
        <ErrorBoundary>
            <MainApp />
        </ErrorBoundary>
    );
}
