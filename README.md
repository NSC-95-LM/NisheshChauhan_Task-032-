# NisheshChauhan_Task(32)

## Summary
A RESTful API backend service for a To-Do List Application built using ExpressJS. This project demonstrates API planning, RESTful endpoint design, route modularization, unique identifier assignment, and status/order management.

## What it Does?
- Creates an ExpressJS server listening on port **8081**
- Implements modular routing via Express Router (`/todos`)
- Supports full CRUD operations:
  - Add new tasks with unique IDs and auto-sequenced order
  - Retrieve all tasks or fetch a single task by ID
  - Edit/update task titles
  - Toggle completion status (complete/incomplete)
  - Reposition/reorder task sequence in the list
  - Delete tasks by ID
- Returns standardized JSON responses (`success`, `message`, `data`) and appropriate HTTP status codes (200, 201, 400, 404)

## Project Structure
```
NisheshChauhan_Task(32)/
├── data/
│   └── todos.json       # Initial task dataset
├── routes/
│   └── todos.js         # Modular routes for todos API
├── .gitignore
├── index.js             # Main server entry point
├── package.json         # Project config and scripts
└── README.md
```

## Routes and Endpoints

### 1. Add Task (Create)
- **Endpoint:** `POST /todos`
- **Description:** Create a new task item
- **Request Body:**
  ```json
  {
    "title": "Complete ExpressJS Assignment"
  }
  ```
- **Unique Identifier Logic:** Generated on the server using timestamp (`Date.now().toString()`).
- **Response:** `201 Created` with newly created task object.

### 2. Get All Tasks (Read)
- **Endpoint:** `GET /todos`
- **Description:** Retrieve all tasks in sequence
- **Response:** `200 OK` with array of tasks.

### 3. Get Single Task (Read by ID)
- **Endpoint:** `GET /todos/:id`
- **Description:** Retrieve details of a specific task by its ID
- **Parameters:** `id` (Route parameter)
- **Response:** `200 OK` or `404 Not Found`.

### 4. Edit Task (Update)
- **Endpoint:** `PUT /todos/:id`
- **Description:** Update task title or details
- **Parameters:** `id` (Route parameter)
- **Request Body:**
  ```json
  {
    "title": "Updated Task Title"
  }
  ```
- **Response:** `200 OK`, `400 Bad Request`, or `404 Not Found`.

### 5. Toggle Completion Status
- **Endpoint:** `PATCH /todos/:id/status`
- **Description:** Toggle or update task completion state
- **Parameters:** `id` (Route parameter)
- **Request Body:**
  ```json
  {
    "isCompleted": true
  }
  ```
- **Response:** `200 OK` or `404 Not Found`.

### 6. Reposition Task Order
- **Endpoint:** `PATCH /todos/reorder`
- **Description:** Shift or move task position before/after another task
- **Request Body:**
  ```json
  {
    "taskId": "1",
    "targetPosition": 2
  }
  ```
- **Response:** `200 OK` with updated task order list.

### 7. Delete Task
- **Endpoint:** `DELETE /todos/:id`
- **Description:** Remove a task permanently by its ID
- **Parameters:** `id` (Route parameter)
- **Response:** `200 OK` or `404 Not Found`.

## Future Additions
- **Clear Completed Tasks (`DELETE /todos/completed`)**: Bulk delete all tasks marked completed.
- **Filtering & Search (`GET /todos?status=completed&search=keyword`)**: Filter active/completed tasks or search by keyword.
- **Priority Levels & Due Dates**: Extend task schema with `priority` (`"low"`, `"medium"`, `"high"`) and `dueDate`.
- **Categories / Tags**: Organize tasks into groups (e.g., `"Work"`, `"Personal"`).

## How to Run?
1. Make sure **Node.js** is installed on your machine.
2. Open a terminal in the project folder:
   ```bash
   cd "004. Task"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server (pick one):
   ```bash
   # Using node directly
   npm start

   # Using nodemon (auto-restarts on file changes)
   npm run dev
   ```
5. Test the APIs:
   - Base URL — [http://localhost:8081/](http://localhost:8081/)
   - Todos Route — [http://localhost:8081/todos](http://localhost:8081/todos)

## Technologies Used
- **Node.js** — JavaScript runtime environment
- **ExpressJS** — Fast, unopinionated web framework for routing and middleware
- **nodemon** — Dev dependency for automatic server restarts during development

## Author
**Nishesh Chauhan**
