const request = require("supertest");
const app = require("../src/app");
const store = require("../src/store");

beforeEach(() => store.reset());

describe("Sprint 1 - core task features", () => {
  test("US-1: POST /tasks creates a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Write backlog", description: "Draft user stories" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Write backlog");
    expect(res.body.status).toBe("todo");
  });

  test("US-1: POST /tasks rejects missing title", async () => {
    const res = await request(app).post("/tasks").send({ description: "no title" });
    expect(res.status).toBe(400);
  });

  test("US-2: GET /tasks returns all tasks", async () => {
    await request(app).post("/tasks").send({ title: "Task A" });
    await request(app).post("/tasks").send({ title: "Task B" });
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test("US-3: PATCH /tasks/:id updates status", async () => {
    const created = await request(app).post("/tasks").send({ title: "Task C" });
    const res = await request(app)
      .patch(`/tasks/${created.body.id}`)
      .send({ status: "in-progress" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("in-progress");
  });

  test("US-3: PATCH /tasks/:id rejects invalid status", async () => {
    const created = await request(app).post("/tasks").send({ title: "Task D" });
    const res = await request(app)
      .patch(`/tasks/${created.body.id}`)
      .send({ status: "not-a-status" });
    expect(res.status).toBe(400);
  });
});
