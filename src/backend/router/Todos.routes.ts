import { TodosController } from '@src/backend/controller/todos.controller';
import ValidateTask from '@src/backend/middlewares/TaskMiddleware';
import { Router } from 'express';
import errorMiddleware from '../middlewares/ErrorMiddleware';

const todoRouter = Router();
const todoController = new TodosController();

todoRouter.get('/', (req, res) => res.status(200).json({message: 'Wellcome to todolist firebase'}));
todoRouter.get('/todos', (req, res) => todoController.getTodos(req, res));
todoRouter.get('/todos/:id', (req, res) => todoController.getTodoById(req, res));
todoRouter.put('/todos/:id',(req, res, next) => ValidateTask.validate(req,res,next), (req, res) => todoController.updateTodo(req, res));
todoRouter.post('/todos', (req, res, next) => ValidateTask.validate(req,res,next), (req, res) => todoController.createTodos(req, res));
todoRouter.delete('/todos/:id', (req, res) => todoController.deleteTodos(req, res));
todoRouter.use((req, res) => errorMiddleware.validate(Error, req, res))

export default todoRouter;