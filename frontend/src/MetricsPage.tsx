import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Metric {
    service: string;
    metric: string;
    value: number;
    event: string;
    timestamp: string;
}

const MetricsPage = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            const res = await axios.get<Metric[]>('http://localhost:4000/metrics');
            setMetrics(res.data);
        };

        fetchMetrics();
    }, []);

    return (
        <div>
            <h1>Metrics</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Metric</th>
                        <th>Value</th>
                        <th>Event</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((metric, index) => (
                        <tr key={index}>
                            <td>{metric.service}</td>
                            <td>{metric.metric}</td>
                            <td>{metric.value}</td>
                            <td>{metric.event}</td>
                            <td>{new Date(metric.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MetricsPage;
