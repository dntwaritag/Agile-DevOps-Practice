const express = require("express");
const store = require("./store");

const app = express();
app.use(express.json());

// US-1: Create a task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }
  const task = store.createTask({ title, description });
  res.status(201).json(task);
});

// US-2: View all tasks
app.get("/tasks", (req, res) => {
  const tasks = store.getAllTasks();
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

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`TaskFlow API running on port ${PORT}`));
}
