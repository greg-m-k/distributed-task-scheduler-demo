import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import path from 'path';

const app = express();
const port = 3000;
const redis = new Redis();

app.use(express.json());

app.post('/task', async (req, res) => {
    const { title, description, type, time } = req.body;
    const id = uuidv4();
    const task = { id, title, description, type, time, status: 'scheduled' };
    await redis.set(id, JSON.stringify(task));
    res.status(201).json(task);
});

app.get('/task', async (req, res) => {
    const keys = await redis.keys('*');
    const tasks = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));
    res.json(tasks);
});

app.put('/task/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, type, time } = req.body;
    const task = { id, title, description, type, time, status: 'scheduled' };
    await redis.set(id, JSON.stringify(task));
    res.json(task);
});

app.delete('/task/:id', async (req, res) => {
    const { id } = req.params;
    await redis.del(id);
    res.status(204).send();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Task API running on http://localhost:${port}`);
});