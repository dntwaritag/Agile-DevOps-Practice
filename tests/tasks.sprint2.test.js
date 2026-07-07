const request = require("supertest");
const app = require("../src/app");
const store = require("../src/store");

beforeEach(() => store.reset());

describe("Sprint 2 - delete, filter, health, logging", () => {
  test("US-4: DELETE /tasks/:id removes a task", async () => {
    const created = await request(app).post("/tasks").send({ title: "Temp task" });
    const del = await request(app).delete(`/tasks/${created.body.id}`);
    expect(del.status).toBe(204);

    const list = await request(app).get("/tasks");
    expect(list.body.length).toBe(0);
  });

  test("US-4: DELETE /tasks/:id returns 404 for unknown id", async () => {
    const res = await request(app).delete("/tasks/999");
    expect(res.status).toBe(404);
  });

  test("US-5: GET /tasks?status=done filters correctly", async () => {
    const a = await request(app).post("/tasks").send({ title: "A" });
    await request(app).post("/tasks").send({ title: "B" });
    await request(app).patch(`/tasks/${a.body.id}`).send({ status: "done" });

    const res = await request(app).get("/tasks?status=done");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].status).toBe("done");
  });

  test("US-5: GET /tasks?status=bogus rejects invalid filter", async () => {
    const res = await request(app).get("/tasks?status=bogus");
    expect(res.status).toBe(400);
  });

  test("US-6: GET /health reports ok status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptime).toBe("number");
  });

  test("US-1 extension: task defaults to normal priority", async () => {
  const res = await request(app).post("/tasks").send({ title: "Check priority" });
  expect(res.body.priority).toBe("normal");
});
});
