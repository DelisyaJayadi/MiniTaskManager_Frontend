import { useState } from 'react';

interface TaskFormProps {
    onCreate: (title: string) => void;
}

export function TaskForm({ onCreate }: TaskFormProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onCreate(title.trim());
            setTitle('');
        }
    };

    return (
        <div className="card">
            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter new task title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button type="submit" className="btn">Add Task</button>
            </form>
        </div>
    );
}
