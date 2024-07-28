import Redis from 'ioredis';
import { setTimeout } from 'timers';

const redis = new Redis();

const scheduleTasks = async () => {
    const keys = await redis.keys('*');
    const tasks = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));

    tasks.forEach(task => {
        const now = new Date().getTime();
        const taskTime = new Date(task.time).getTime();

        if (task.status === 'scheduled' && taskTime <= now + 10000) {
            setTimeout(async () => {
                task.status = 'executing';
                await redis.set(task.id, JSON.stringify(task));
                // send to worker
                await redis.rpush('task_queue', JSON.stringify(task));
            }, taskTime - now);
        }
    });
};

setInterval(scheduleTasks, 10000);