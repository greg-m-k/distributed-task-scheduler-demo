import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import mermaid from 'mermaid';

const AboutPage = () => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
    }, []);

    const diagram = `
    graph TD
        A[Client] -->|Registers Task| B[Task API]
        B -->|Stores Task| C[Task Store]
        D[Scheduler Service] -->|Fetches Tasks| C
        D -->|Schedules Task| E[Worker Service]
        E -->|Executes Task| F[Logging Service]
        F -->|Logs Execution| G[Frontend UI]
        H[Metrics Service] -->|Stores Metrics| I[Metrics DB]
        E -->|Reports Metrics| H
        subgraph Docker Swarm
            B
            D
            E
            C
            H
        end
        subgraph k6 Testing
            A
        end
    `;

    return (
        <div>
            <h1>About</h1>
            <div className="mb-4">
                <div className="mermaid">
                    {diagram}
                </div>
            </div>
            <h2>Design Document: Distributed Task Scheduler</h2>
            <p>The distributed task scheduler allows clients to register one-time and recurring tasks. These tasks are executed within 10 seconds of their scheduled time. This system aims to provide high availability, durability, and scalability while being cost-effective.</p>
            <h3>Core Components</h3>
            <ul>
                <li><strong>Task API</strong>: Provides endpoints for registering, updating, deleting, and viewing tasks.</li>
                <li><strong>Scheduler Service</strong>: Manages the scheduling and execution of tasks.</li>
                <li><strong>Worker Service</strong>: Picks up tasks for execution.</li>
                <li><strong>Task Store</strong>: Persists task data.</li>
                <li><strong>Frontend UI</strong>: React-based GUI for task management.</li>
                <li><strong>Logging Service</strong>: Logs executed tasks.</li>
                <li><strong>Docker Swarm</strong>: Manages service orchestration and scaling.</li>
                <li><strong>k6 Testing</strong>: Ensures performance under load.</li>
            </ul>
            <h3>High-Level Design</h3>
            <div className="mermaid">
                {diagram}
            </div>
            <h2>Conclusion</h2>
            <p>This complete updated example includes:</p>
            <ul>
                <li><strong>Frontend UI</strong>: Updated to include task title, description, and schedule type (datetime or cron) with Bootstrap styling.</li>
                <li><strong>Task API</strong>: Updated to handle the new task attributes.</li>
                <li><strong>Scheduler and Worker Services</strong>: Updated to support the new task format.</li>
                <li><strong>Metrics Service</strong>: Logs metrics and scaling events.</li>
                <li><strong>Static HTML</strong>: Separated HTML into static files.</li>
                <li><strong>Unit Tests</strong>: For the Task API.</li>
                <li><strong>k6 Test</strong>: Ensures the system meets the performance requirements.</li>
                <li><strong>Docker Compose Configuration</strong>: For service orchestration and scaling.</li>
            </ul>
            <h2>Rationale and Trade-offs</h2>
            <h3>1. Frontend UI</h3>
            <p>The frontend UI is updated to include task title, description, and scheduling options (datetime or cron). This enhancement improves user experience by providing a clear interface for task creation and management. Using Bootstrap ensures a responsive and visually appealing design, making the application accessible on various devices. <a href="https://en.wikipedia.org/wiki/User_interface_design" target="_blank">[Wikipedia: User Interface Design]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Complexity</strong>: Introducing more fields increases the UI complexity, which might require more validation and handling.</li>
                <li><strong>Performance</strong>: Adding Bootstrap might add some load time due to additional CSS and JavaScript.</li>
                <li><strong>Flexibility</strong>: Using Bootstrap limits customization to the framework's capabilities.</li>
            </ul>
            <h3>2. Task API</h3>
            <p>The Task API now handles the new task attributes, supporting richer task definitions. This flexibility allows users to define specific tasks more accurately, making the system more useful for various applications. The RESTful API design ensures scalability and easy integration with other systems. <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">[Wikipedia: Representational State Transfer]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Complexity</strong>: Handling more attributes in the API increases the complexity of the backend logic.</li>
                <li><strong>Storage</strong>: More detailed tasks might require more storage capacity.</li>
                <li><strong>Validation</strong>: More attributes necessitate robust validation mechanisms to ensure data integrity.</li>
            </ul>
            <h3>3. Scheduler and Worker Services</h3>
            <p>These services are updated to support the new task format, ensuring they can handle both datetime and cron-based schedules. This separation of concerns allows the system to efficiently manage task scheduling and execution. It also enhances scalability, as these services can be scaled independently based on load. <a href="https://en.wikipedia.org/wiki/Microservices" target="_blank">[Wikipedia: Microservices]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Resource Allocation</strong>: Independently scaling these services might require more resources.</li>
                <li><strong>Coordination</strong>: More services can lead to increased coordination overhead.</li>
                <li><strong>Latency</strong>: Introducing separate services might introduce slight latency due to inter-service communication.</li>
            </ul>
            <h3>4. Metrics Service</h3>
            <p>The Metrics Service logs and monitors system performance, scaling events, and task execution metrics. This service ensures that the system meets its performance requirements and helps identify bottlenecks. Monitoring is crucial for maintaining high availability and reliability. <a href="https://en.wikipedia.org/wiki/Monitoring_(software)" target="_blank">[Wikipedia: Monitoring (software)]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Overhead</strong>: Continuous monitoring and logging can introduce some performance overhead.</li>
                <li><strong>Storage</strong>: Storing metrics data requires additional storage.</li>
                <li><strong>Complexity</strong>: Integrating a monitoring service adds to the system's complexity.</li>
            </ul>
            <h3>5. Static HTML</h3>
            <p>Separating HTML into static files improves the maintainability and scalability of the frontend. It allows for better separation of concerns, making the codebase easier to manage and update. Static files also enable faster loading times for the frontend, enhancing the user experience. <a href="https://en.wikipedia.org/wiki/Static_web_page" target="_blank">[Wikipedia: Static web page]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Caching</strong>: Static files need proper caching strategies to ensure they are up-to-date.</li>
                <li><strong>Initial Load</strong>: Splitting content might slightly increase the initial load time due to multiple requests.</li>
                <li><strong>Development</strong>: Requires careful structuring and management of files.</li>
            </ul>
            <h3>6. Unit Tests</h3>
            <p>Adding unit tests for the Task API ensures the reliability and correctness of the system. Automated tests help catch issues early in the development cycle, reducing the likelihood of bugs in production. Unit tests also provide documentation for expected behavior, making the system easier to understand and maintain. <a href="https://en.wikipedia.org/wiki/Unit_testing" target="_blank">[Wikipedia: Unit testing]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Time</strong>: Writing and maintaining unit tests require additional development time.</li>
                <li><strong>Resources</strong>: Running tests regularly can consume resources.</li>
                <li><strong>Scope</strong>: Unit tests focus on individual components and might miss integration issues.</li>
            </ul>
            <h3>7. k6 Test</h3>
            <p>The k6 test ensures that the system meets performance requirements, particularly the 10-second SLA for task execution. Load testing identifies potential bottlenecks and helps optimize the system for high load conditions. This is crucial for ensuring reliability and performance under various conditions. <a href="https://en.wikipedia.org/wiki/Load_testing" target="_blank">[Wikipedia: Load testing]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Resource Consumption</strong>: Load testing consumes significant resources, especially under high load.</li>
                <li><strong>Complexity</strong>: Setting up and analyzing load tests can be complex.</li>
                <li><strong>Frequency</strong>: Regular load testing is necessary to ensure ongoing performance, requiring a systematic approach.</li>
            </ul>
            <h3>8. Docker Compose Configuration</h3>
            <p>Docker Compose facilitates service orchestration and scaling, ensuring that the system is easy to deploy and manage. It provides a straightforward way to define and run multi-container applications, improving the development and deployment workflow. Docker Compose ensures consistent environments across development, testing, and production. <a href="https://en.wikipedia.org/wiki/Docker_(software)" target="_blank">[Wikipedia: Docker (software)]</a></p>
            <p><strong>Trade-offs:</strong></p>
            <ul>
                <li><strong>Learning Curve</strong>: Docker Compose introduces a learning curve for those unfamiliar with containerization.</li>
                <li><strong>Overhead</strong>: Running multiple containers can introduce overhead compared to running a single application.</li>
                <li><strong>Dependencies</strong>: Managing dependencies across multiple containers can be challenging.</li>
            </ul>
        </div>
    );
};

export default AboutPage;
