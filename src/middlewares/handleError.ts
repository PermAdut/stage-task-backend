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
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
