# To Vo DevOps Lab

Hi! This is my personal project while learning DevOps.

I'm building a small application and trying to run it with Docker. I also set up Prometheus and Grafana to monitor the application and understand how everything works together.

This project is mainly for learning and getting more hands-on experience.

## Architecture

```text
             Client
                |
                v
        Node.js Backend
             :3000
                |
          /metrics
                |
                v
          Prometheus
             :9090
                |
                v
           Grafana
             :3001
```

## Technologies

- Ubuntu Server 24.04
- Node.js and Express
- Docker and Docker Compose
- Prometheus
- Grafana
- Git and GitHub

## Project Structure

```text
tovo-devops-project/
├── app/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── prometheus/
│   └── prometheus.yml
├── compose.yaml
└── README.md
```

## What I've Done

- Built a simple backend using Node.js and Express.
- Added `/health` to check if the backend is running.
- Added `/metrics` to provide metrics for Prometheus.
- Created a Dockerfile to build the backend image.
- Used Docker Compose to run the backend, Prometheus and Grafana.
- Set up Docker networking so the services can communicate with each other.
- Used Docker volumes to keep monitoring data after recreating containers.
- Created a Grafana dashboard to view application metrics.

## Services

| Service | Port | What it does |
|---|---:|---|
| Backend | 3000 | Runs the application |
| Prometheus | 9090 | Collects metrics |
| Grafana | 3001 | Shows metrics in dashboards |

## How to Run

### 1. Clone the project

```bash
git clone https://github.com/Tofvof/tovo-devops-lab.git
cd tovo-devops-lab
```

### 2. Start the containers

```bash
sudo docker compose up -d --build
```

### 3. Check the containers

```bash
sudo docker compose ps
```

### 4. Open the services

- Backend: http://localhost:3000
- Health check: http://localhost:3000/health
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

## Monitoring

I'm using Prometheus to collect metrics from the backend and Grafana to display them.

The dashboard currently shows:

- Backend status (UP/DOWN)
- HTTP requests per second
- Average response time
- Backend memory usage

## Learning Notes

I'm still learning DevOps and building this project step by step.

I used AI to help me with some parts of the project, mainly:
- Writing and improving the Node.js backend code.
- Learning how to write Dockerfile and Docker Compose configurations.
- Understanding Linux commands and DevOps concepts.
- Finding possible solutions when I ran into errors.

I also try things out in my Ubuntu VM, test the configurations and fix problems along the way.

There are still many things I need to learn, so I'll keep improving this project.

**Project status:** Still working on it.
