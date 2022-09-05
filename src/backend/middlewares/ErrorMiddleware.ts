import { Request, Response } from "express";

/**
* @description
* Middleware de error responsável por tratar os erros, evitando a aplicação de quebrar durante alguma requisição HTTP
*/

export default class errorMiddleware {
    //eslint-disable-next-line
  public static validate = (err: any, req: Request, res: Response) => {
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