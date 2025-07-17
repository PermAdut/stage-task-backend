import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
