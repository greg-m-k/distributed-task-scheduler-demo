import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Task {
    id: string;
    title: string;
    description: string;
    type: string;
    time: string;
}

const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [scheduleType, setScheduleType] = useState('datetime');
    const [datetime, setDatetime] = useState('');
    const [cron, setCron] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get<Task[]>('http://localhost:3000/task');
            setTasks(res.data);
        };

        fetchTasks();
    }, []);

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const task = {
            title,
            description,
            type: scheduleType,
            time: scheduleType === 'datetime' ? datetime : cron,
        };
        const res = await axios.post<Task>('http://localhost:3000/task', task);
        setTasks([...tasks, res.data]);
    };

    return (
        <div>
            <h1>Task Scheduler</h1>
            <form onSubmit={addTask}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Schedule Type</label>
                    <select className="form-control" value={scheduleType} onChange={(e) => setScheduleType(e.target.value)}>
                        <option value="datetime">Datetime</option>
                        <option value="cron">Cron</option>
                    </select>
                </div>
                {scheduleType === 'datetime' && (
                    <div className="form-group">
                        <label>Datetime</label>
                        <input type="datetime-local" className="form-control" value={datetime} onChange={(e) => setDatetime(e.target.value)} required />
                    </div>
                )}
                {scheduleType === 'cron' && (
                    <div className="form-group">
                        <label>Cron</label>
                        <input type="text" className="form-control" value={cron} onChange={(e) => setCron(e.target.value)} required />
                        <small className="form-text text-muted">Cron format: * * * * *</small>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
            <h2 className="mt-4">Tasks</h2>
            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task.id} className="list-group-item">
                        {task.title} - {task.description} - {task.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskPage;
