"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todos_controller_1 = require("@src/backend/controller/todos.controller");
const TaskMiddleware_1 = __importDefault(require("@src/backend/middlewares/TaskMiddleware"));
const express_1 = require("express");
const todoRouter = (0, express_1.Router)();
const todoController = new todos_controller_1.TodosController();
todoRouter.get('/todos', (req, res) => todoController.getTodos(req, res));
todoRouter.get('/todos/:id', (req, res) => todoController.getTodoById(req, res));
todoRouter.put('/todos/:id', TaskMiddleware_1.default.validate, (req, res) => todoController.updateTodo(req, res));
todoRouter.post('/todos', TaskMiddleware_1.default.validate, (req, res) => todoController.createTodos(req, res));
todoRouter.delete('/todos/:id', (req, res) => todoController.deleteTodos(req, res));
exports.default = todoRouter;
//# sourceMappingURL=Todos.routes.js.map