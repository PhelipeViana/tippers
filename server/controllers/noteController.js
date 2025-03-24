const fs = require("fs");
const arquivo = "notes.json";

exports.create = (req, res) => {
  let tasks = [];
  const { name, description } = req.body;
  if (name === undefined || description === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name and Description are required",
    });
  }

  if (fs.existsSync(arquivo)) {
    const data = fs.readFileSync(arquivo, "utf8");
    tasks = JSON.parse(data);
  }

  const newTask = {
    id: tasks.length + 1,
    name,
    description,
  };

  tasks.push(newTask);
  fs.writeFileSync(arquivo, JSON.stringify(tasks, null, 2), "utf8");

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task: newTask,
  });
};
const getTasksFromFile = () => {
  if (fs.existsSync(arquivo)) {
    const data = fs.readFileSync(arquivo, "utf8");
    return JSON.parse(data);
  }
  return [];
};
exports.getAll = (req, res) => {
  let tasks = [];
  if (fs.existsSync(arquivo)) {
    const data = fs.readFileSync(arquivo, "utf8");
    tasks = JSON.parse(data);
  }
  res.status(200).json({
    success: true,
    tasks,
  });
};
exports.getId = (req, res) => {
  let tasks = [];
  if (fs.existsSync(arquivo)) {
    const data = fs.readFileSync(arquivo, "utf8");
    tasks = JSON.parse(data);
  }

  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  res.status(200).json({
    success: true,
    task,
  });
};

exports.update = (req, res) => {
  let tasks = [];
  if (fs.existsSync(arquivo)) {
    const data = fs.readFileSync(arquivo, "utf8");
    tasks = JSON.parse(data);
  }

  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const { name, description } = req.body;
  if (name === undefined || description === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name or Description is required",
    });
  }
  task.name = name;
  task.description = description;

  fs.writeFileSync(arquivo, JSON.stringify(tasks, null, 2), "utf8");

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task,
  });
};
exports.remove = (req, res) => {
  let tasks = [];
  if (fs.existsSync(arquivo)) {
    const data = fs.readFileSync(arquivo, "utf8");
    tasks = JSON.parse(data);
  }
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  fs.writeFileSync(arquivo, JSON.stringify(tasks, null, 2), "utf8");
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};
