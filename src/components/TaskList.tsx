import type { Task } from '../api';

interface TaskListProps {
    tasks: Task[];
    actor: string;
    onUpdateStatus: (id: string, status: string, actor: string) => void;
    onDelete: (id: string) => void;
    onViewLogs: (taskId: string, title: string) => void;
}

const STATUS_OPTIONS = ['to_do', 'pending', 'in_progress', 'done'];

export function TaskList({ tasks, actor, onUpdateStatus, onDelete, onViewLogs }: TaskListProps) {
    return (
        <div className="card">
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>
                                <select
                                    className="status-select"
                                    value={task.status}
                                    onChange={(e) => onUpdateStatus(task.id, e.target.value, actor)}
                                >
                                    {STATUS_OPTIONS.map(status => (
                                        <option key={status} value={status}>
                                            {status.replace('_', ' ').toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <div className="actions">
                                    <button className="btn btn-secondary" onClick={() => onViewLogs(task.id, task.title)}>
                                        Logs
                                    </button>
                                    <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {tasks.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                No tasks found. Create one above.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
