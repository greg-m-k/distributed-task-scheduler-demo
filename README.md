# Clone the repository and navigate to the root directory
git clone <your-repo-url>
cd distributed-task-scheduler

# Run the installation script (with SUDO)
chmod +x install.sh
./install.sh

# Run the setup script to initialize Docker Swarm, build and start services, and start k6 tests
chmod +x setup.sh
./setup.sh

# Run the monitoring and scaling script in a separate terminal
chmod +x monitor_and_scale.sh
./monitor_and_scale.sh

# Access the application
# Task Scheduler UI: http://localhost:8080
# Metrics UI: http://localhost:8080/metrics
# About Page: http://localhost:8080/about

# Tear down the services
chmod +x teardown.sh
./teardown.sh