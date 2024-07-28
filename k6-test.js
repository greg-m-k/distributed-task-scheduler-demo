import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const payload = JSON.stringify({
        title: 'Test Task',
        description: 'This is a test task',
        type: 'datetime',
        time: new Date(Date.now() + 15000).toISOString(), // 15 seconds from now
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post('http://localhost:3000/task', payload, params);

    check(res, {
        'status was 201': (r) => r.status === 201,
        'task was created': (r) => JSON.parse(r.body).id !== undefined,
    });

    sleep(1);
}