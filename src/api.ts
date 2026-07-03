const API_URL = 'http://localhost:3000';

export interface Task {
    id: string;
    title: string;
    status: 'to_do' | 'pending' | 'in_progress' | 'done';
    createdAt: string;
}

export interface AuditLog {
    id: string;
    taskId: string;
    actor: string;
    fromStatus: string;
    toStatus: string;
    timestamp: string;
}

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
}

export async function createTask(title: string): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    return res.json();
}

export async function updateTaskStatus(id: string, status: string, actor: string): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, actor })
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update task');
    }
    return res.json();
}

export async function deleteTask(id: string): Promise<void> {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
}

export async function fetchAuditLogs(taskId: string): Promise<AuditLog[]> {
    const res = await fetch(`${API_URL}/tasks/${taskId}/audit-logs`);
    return res.json();
}
