import { useEffect, useState } from 'react';
import type { AuditLog } from '../api';
import { fetchAuditLogs } from '../api';

interface AuditLogModalProps {
    taskId: string;
    taskTitle: string;
    onClose: () => void;
}

export function AuditLogModal({ taskId, taskTitle, onClose }: AuditLogModalProps) {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuditLogs(taskId)
            .then(setLogs)
            .finally(() => setLoading(false));
    }, [taskId]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Audit Logs: {taskTitle}</h2>
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
                
                {loading ? (
                    <p>Loading logs...</p>
                ) : logs.length === 0 ? (
                    <p>No status changes recorded yet.</p>
                ) : (
                    <div className="log-list">
                        {logs.map(log => (
                            <div key={log.id} className="log-entry">
                                <div className="log-time">{new Date(log.timestamp).toLocaleString()}</div>
                                <div>
                                    User <strong>"{log.actor}"</strong> changed status from <strong>"{log.fromStatus}"</strong> to <strong>"{log.toStatus}"</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
