const express = require("express");
const store = require("./store");

const app = express();
app.use(express.json());

// Basic request logging (Sprint 1 retro improvement #1)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// US-6: Health check endpoint (Sprint 1 retro improvement #2)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// US-1: Create a task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }
  const task = store.createTask({ title, description });
  res.status(201).json(task);
});

// US-2 + US-5: View all tasks, optionally filtered by status
app.get("/tasks", (req, res) => {
  const { status } = req.query;
  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of ${VALID_STATUSES.join(", ")}` });
  }
  const tasks = store.getAllTasks(status);
  res.json(tasks);
});

// US-3: Update a task's status
const VALID_STATUSES = ["todo", "in-progress", "done"];
app.patch("/tasks/:id", (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of ${VALID_STATUSES.join(", ")}` });
  }
  const task = store.updateStatus(req.params.id, status);
  if (!task) return res.status(404).json({ error: "task not found" });
  res.json(task);
});

// US-4: Delete a task
app.delete("/tasks/:id", (req, res) => {
  const deleted = store.deleteTask(req.params.id);
  if (!deleted) return res.status(404).json({ error: "task not found" });
  res.status(204).send();
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`TaskFlow API running on port ${PORT}`));
}
