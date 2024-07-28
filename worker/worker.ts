import Redis from 'ioredis';

const redis = new Redis();

const executeTask = async (task) => {
    console.log(`Executing task ${task.id} of type ${task.type}`);
    task.status = 'executed';
    await redis.set(task.id, JSON.stringify(task));
    await redis.rpush('task_log', JSON.stringify({ id: task.id, executedAt: new Date().toISOString() }));
};

const processQueue = async () => {
    const taskData = await redis.lpop('task_queue');
    if (taskData) {
        const task = JSON.parse(taskData);
        await executeTask(task);
    }
};

setInterval(processQueue, 1000);