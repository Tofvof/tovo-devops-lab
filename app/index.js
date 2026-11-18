const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 3000;

// Enable default Node.js metrics
client.collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"]
});

const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "route", "status_code"]
});

// Collect HTTP request metrics
app.use((req, res, next) => {
    const start = process.hrtime();

    res.on("finish", () => {
        const duration = process.hrtime(start);
        const seconds = duration[0] + duration[1] / 1e9;

        httpRequestsTotal.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status_code: res.statusCode
        });

        httpRequestDuration.observe({
            method: req.method,
            route: req.route?.path || req.path,
            status_code: res.statusCode
        }, seconds);
    });

    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to To Vo DevOps Lab!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "tovo-backend"
    });
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
