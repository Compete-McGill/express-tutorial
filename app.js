// Importing necessary packages + necessary boilerplate
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const PORT = 3000;
let databaseCurrentID = 1;
const db = [{
  id: databaseCurrentID,
  message: "Get groceries",
  isComplete: false,
}]

// GET /hello
app.get("/hello", (req, res) => {
  console.log("Hello world route reached!");
  res.send("hello world!");
  // res.status(200).json({ "message" : "hello world!" })
});

// GET /todos returns a list of all the todos
app.get("/todos", (req, res) => {
  console.log("GET /todos (get all todos)");
  res.status(200).json(db);
});

// GET /todos/:id returns a specific todo by ID
// @params:
//     - "id" in the path
app.get("/todos/:id", (req, res) => {
  console.log(`GET /todos/:id (get a todo by ID) ${req.params.id}`);
  let foundTodo = db.find(todo => req.params.id == todo.id);
  if (!foundTodo) {
    return res.status(404).json({ "error" : "todo not found" });
  }
  res.status(200).json(foundTodo);
});

// POST /todos creates a new todo and returns it
// @params:
//     - "message" in the body
app.post("/todos", (req, res) => {
  console.log(`POST /todos (create a new todo)`);
  let newTodo = {
    id: ++databaseCurrentID,
    message: req.body.message,
    isComplete: false,
  };
  db.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id updates the message of a todo and returns the todo
// @params:
//     - "id" in the path
app.put("/todos/:id", (req, res) => {
  console.log(`PUT /todos/:id (update todo by ID) ${req.params.id}`);
  let todoId = req.params.id;
  let todoToUpdate = db.find(todo => todo.id == todoId);
  if (!todoToUpdate) {
    return res.status(404).json({ "error" : "todo to update not found" });
  }
  todoToUpdate.isComplete = req.body.isComplete;
  res.status(200).json(todoToUpdate);
});

// DELETE /todos/:id deletes a todo and returns "success": true or false
// @params:
//     - "id" in the path
app.delete("/todos/:id", (req, res) => {
  console.log(`DELETE /todos/:id (delete todo by ID) ${req.params.id}`);
  let todoId = req.params.id;
  let todoToDeleteIndex = db.findIndex(todo => todo.id == todoId);
  if (todoToDeleteIndex === -1) {
    return res.status(404).json({ "error" : "todo to delete not found" });
  }
  db.splice(todoToDeleteIndex, todoToDeleteIndex + 1);
  res.status(200).json({ "success" : true })
});

// Initializes the server on a certain PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
