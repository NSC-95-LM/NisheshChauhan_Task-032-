const express = require("express");
const todosRouter = require("./routes/todos.js");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "To-Do List API Server"
    });
});

app.use("/todos", todosRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});
