import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

export default class ValidateTask {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = Joi.object({
      task: Joi.string().max(10).required(),
      details: Joi.string().max(30).required()
    }).validate(req.body);
    if (error) {
      next(error);
    }
    next();
  }
}