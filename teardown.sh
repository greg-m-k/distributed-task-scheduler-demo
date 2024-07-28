#!/bin/bash

# Remove the stack
docker stack rm distributed-task-scheduler

# Leave the swarm
docker swarm leave --force