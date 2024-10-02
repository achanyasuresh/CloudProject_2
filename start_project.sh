#! /usr/bin/bash
echo "Building the docker image"
sudo docker build -t backend .
echo "Done building the docker image, now moving on to starting a container"
sudo docker run \
  --log-driver=awslogs \
  --log-opt awslogs-region=us-east-1 \
  --log-opt awslogs-group=backend_logs \
  -dp 8080:8080 \
    backend