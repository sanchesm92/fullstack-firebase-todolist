"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todos_controller_1 = require("@src/backend/controller/todos.controller");
const TaskMiddleware_1 = __importDefault(require("@src/backend/middlewares/TaskMiddleware"));
const express_1 = require("express");
const ErrorMiddleware_1 = __importDefault(require("../middlewares/ErrorMiddleware"));
const todoRouter = (0, express_1.Router)();
const todoController = new todos_controller_1.TodosController();
todoRouter.get('/', (req, res) => res.status(200).json({ message: 'Wellcome to todolist firebase' }));
todoRouter.get('/todos', (req, res) => todoController.getTodos(req, res));
todoRouter.get('/todos/:id', (req, res) => todoController.getTodoById(req, res));
todoRouter.put('/todos/:id', (req, res, next) => TaskMiddleware_1.default.validate(req, res, next), (req, res) => todoController.updateTodo(req, res));
todoRouter.post('/todos', (req, res, next) => TaskMiddleware_1.default.validate(req, res, next), (req, res) => todoController.createTodos(req, res));
todoRouter.delete('/todos/:id', (req, res) => todoController.deleteTodos(req, res));
todoRouter.use((req, res) => ErrorMiddleware_1.default.validate(Error, req, res));
exports.default = todoRouter;
//# sourceMappingURL=Todos.routes.js.map