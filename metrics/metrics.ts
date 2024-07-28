import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();
const port = 4000;
const mongoUri = 'mongodb://mongo:27017';
const dbName = 'metricsDB';
const client = new MongoClient(mongoUri);

app.use(express.json());

app.post('/metrics', async (req, res) => {
    const { service, metric, value, event } = req.body;

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('metrics');
        await collection.insertOne({ service, metric, value, event, timestamp: new Date() });
        res.status(201).send('Metric recorded');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/metrics', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('metrics');
        const metrics = await collection.find({}).toArray();
        res.status(200).json(metrics);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Metrics service running on http://localhost:${port}`);
});