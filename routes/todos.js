const express = require("express");
const todos = require("../data/todos.json");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: todos
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((each) => each.id === id);

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: `Task not found for id: ${id}`
        });
    }

    res.status(200).json({
        success: true,
        data: todo
    });
});

router.post("/", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Please provide a task title"
        });
    }

    const newTask = {
        id: Date.now().toString(),
        title,
        isCompleted: false,
        order: todos.length + 1
    };

    todos.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Please provide updated task title"
        });
    }

    const todo = todos.find((each) => each.id === id);

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: `Task not found for id: ${id}`
        });
    }

    todo.title = title;

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: todo
    });
});

router.patch("/:id/status", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((each) => each.id === id);

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: `Task not found for id: ${id}`
        });
    }

    todo.isCompleted = req.body.isCompleted !== undefined ? req.body.isCompleted : !todo.isCompleted;

    res.status(200).json({
        success: true,
        message: "Task status updated successfully",
        data: todo
    });
});

router.patch("/reorder", (req, res) => {
    const { taskId, targetPosition } = req.body;
    const taskIndex = todos.findIndex((each) => each.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Task not found for id: ${taskId}`
        });
    }

    const [movedTask] = todos.splice(taskIndex, 1);
    todos.splice(targetPosition - 1, 0, movedTask);

    todos.forEach((task, index) => {
        task.order = index + 1;
    });

    res.status(200).json({
        success: true,
        message: "Task repositioned successfully",
        data: todos
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((each) => each.id === id);

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: `Task not found for id: ${id}`
        });
    }

    const index = todos.indexOf(todo);
    todos.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });
});

module.exports = router;
