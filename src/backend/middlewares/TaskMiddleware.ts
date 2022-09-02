import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

/**
* @description
* Validate middleware
*/

export default class ValidateTask {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = Joi.object({
      task: Joi.string().max(30).required(),
      email: Joi.string().email().required()
    }).validate(req.body);
    if (error) {
      next(error);
    }
    next();
  }
}