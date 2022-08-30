import { Request, Response } from "express";

export default class errorMiddleware {
    //eslint-disable-next-line
  public static validate = (err: any, _req: Request, res: Response) => {
    if (err.isJoi) {
      return res.status(400).json({
        message: err.details[0].message,
      });
    }
    return res.status(400).json({
        message: 'Invalid fields',
    });
}
}