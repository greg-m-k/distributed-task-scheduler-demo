#!/bin/bash

METRICS_ENDPOINT="http://localhost:4000/metrics"
SCALE_THRESHOLD=80 # CPU usage percentage
DURATION_THRESHOLD=60 # seconds
CHECK_INTERVAL=10 # seconds

function post_metrics {
    local service=$1
    local metric=$2
    local value=$3
    local event_type=$4

    curl -X POST -H "Content-Type: application/json" -d "{\"service\":\"$service\",\"metric\":\"$metric\",\"value\":$value,\"event\":\"$event_type\"}" $METRICS_ENDPOINT
}

while true; do
    for service in $(docker service ls --format '{{.Name}}'); do
        cpu_usage=$(docker service ps $service --format '{{.ID}}' | xargs -I {} docker inspect {} --format '{{.HostConfig.CpuPercent}}')
        cpu_usage=${cpu_usage%.*}

        if [ $cpu_usage -gt $SCALE_THRESHOLD ]; then
            echo "High load detected on $service: $cpu_usage%"
            post_metrics $service "cpu_usage" $cpu_usage "high_load"

            start_time=$(date +%s)
            while [ $cpu_usage -gt $SCALE_THRESHOLD ]; do
                sleep $CHECK_INTERVAL
                cpu_usage=$(docker service ps $service --format '{{.ID}}' | xargs -I {} docker inspect {} --format '{{.HostConfig.CpuPercent}}')
                cpu_usage=${cpu_usage%.*}
                current_time=$(date +%s)
                elapsed_time=$((current_time - start_time))

                if [ $elapsed_time -gt $DURATION_THRESHOLD ]; then
                    echo "Scaling up $service due to sustained high load"
                    replicas=$(docker service inspect $service --format '{{.Spec.Mode.Replicated.Replicas}}')
                    new_replicas=$((replicas + 1))
                    docker service scale $service=$new_replicas
                    post_metrics $service "replicas" $new_replicas "scaled_up"
                    break
                fi
            done
        else
            post_metrics $service "cpu_usage" $cpu_usage "normal_load"
        fi
    done
    sleep $CHECK_INTERVAL
done
