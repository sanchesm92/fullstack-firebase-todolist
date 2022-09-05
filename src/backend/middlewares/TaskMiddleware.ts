import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

/**
* @description
* Middleware de validação de dados recebidos via requisições HTTP, utilizando a biblioteca joi
*/

export default class ValidateTask {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = Joi.object({
      task: Joi.string().max(30).required(),
      email: Joi.string().email(),
      completed: Joi.boolean()
    }).validate(req.body);
    if (error) {
      next(error);
    }
    next();
  }
}