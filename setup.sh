#!/bin/bash

# Initialize Docker Swarm
docker swarm init

# Remove existing network if it exists
if docker network ls | grep -q "task-network"; then
  docker network rm task-network
fi

# Build and tag images
docker build -t task-api:latest ./task-api || { echo 'task-api build failed' ; exit 1; }
docker build -t scheduler:latest ./scheduler || { echo 'scheduler build failed' ; exit 1; }
docker build -t worker:latest ./worker || { echo 'worker build failed' ; exit 1; }
docker build -t frontend:latest ./frontend || { echo 'frontend build failed' ; exit 1; }
docker build -t metrics:latest ./metrics || { echo 'metrics build failed' ; exit 1; }

# Deploy the stack
docker stack deploy -c docker-compose.yml distributed-task-scheduler

# Wait for services to stabilize
sleep 30

# Start k6 test
k6 run k6-test.js
