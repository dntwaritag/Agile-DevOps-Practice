// Simple in-memory data store for tasks.
// Kept separate from routes so it's easy to swap for a real DB later.

let tasks = [];
let nextId = 1;

function reset() {
  tasks = [];
  nextId = 1;
}

function createTask({ title, description, priority = "normal" }) {
  const task = {
    id: nextId++,
    title,
    description,
    priority,
    status: "todo", // todo | in-progress | done
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function getAllTasks(statusFilter) {
  if (statusFilter) {
    return tasks.filter((t) => t.status === statusFilter);
  }
  return tasks;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === Number(id));
}

function updateStatus(id, status) {
  const task = getTaskById(id);
  if (!task) return null;
  task.status = status;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = {
  reset,
  createTask,
  getAllTasks,
  getTaskById,
  updateStatus,
  deleteTask,
};
