import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../utils/statusCodes';
import { ErrorMessages } from '../utils/errorMessages';

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
  res.status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    error: err.message || ErrorMessages.INTERNAL_SERVER_ERROR,
  });
};
