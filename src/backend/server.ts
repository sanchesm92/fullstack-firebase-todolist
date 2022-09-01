import '../utils/module-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express'
import { TodosController } from './controller/todos.controller';
import cors from 'cors';

import todoRouter from './router/Todos.routes';

export class SetupServer extends Server {
  constructor(private port = process.env.PORT || 3001) {
    super();
  }

  public init(): void {
    this.setupExpress()
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(express.json())
    this.app.use(cors());
    this.app.use(todoRouter)
  }
  
  private setupControllers(): void {
    const todosController = new TodosController();
    this.addControllers([todosController])
  }

  public getApp(): Application {
    return this.app
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }

}