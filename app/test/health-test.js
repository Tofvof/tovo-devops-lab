const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../index");

test("GET /health should return healthy status", async (t) => {
    const server = app.listen(0);

    await new Promise((resolve) => {
        server.once("listening", resolve);
    });

    t.after(() => {
        return new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });

    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}/health`);

    assert.equal(response.status, 200);

    const data = await response.json();

    assert.deepEqual(data, {
        status: "healthy",
        service: "tovo-backend"
    });
});
