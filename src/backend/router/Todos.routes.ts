import { TodosController } from '@src/backend/controller/todos.controller';
import ValidateTask from '@src/backend/middlewares/TaskMiddleware';
import { Router } from 'express';

const todoRouter = Router();

const todoController = new TodosController();

todoRouter.get('/todos', (req, res) => todoController.getTodos(req, res));
todoRouter.get('/todos/:id', (req, res) => todoController.getTodoById(req, res));
todoRouter.put('/todos/:id',ValidateTask.validate, (req, res) => todoController.updateTodo(req, res));
todoRouter.post('/todos', ValidateTask.validate, (req, res) => todoController.createTodos(req, res));
todoRouter.delete('/todos/:id', (req, res) => todoController.deleteTodos(req, res));

export default todoRouter;