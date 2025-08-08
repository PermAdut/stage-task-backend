import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../utils/statusCodes';

interface QueryValidator<T>{
    name: keyof T & string;
    type: string | number | boolean;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    customValidator?: (value: unknown) => customValidatorResult;
}

interface customValidatorResult {
  result: boolean;
  error?: string;
}

export function validateQuery<T>(validations: Array<QueryValidator<T>>) {
  return (req: Request<object, any, any, T>, res: Response, next: NextFunction): void => {
    const query = req.query as Record<string, unknown>;
    for (const {
      name,
      type,
      required = true,
      minLength,
      maxLength,
      min,
      max,
      customValidator,
    } of validations) {
      const value = query[name];

      if (required && !(name in query)) {
        res.status(HttpStatusCode.BAD_REQUEST).json({error: `Missing required query: ${name}`});
        return;
      }

      if (!required && !(name in query)) {
        return;
      }

      if (value != null && typeof value !== type) {
        res.status(HttpStatusCode.BAD_REQUEST).json({error: `Invalid type for query ${name}: must be ${type}`})
        return;
      }

      if (type === 'string' && typeof value === 'string') {
        if (minLength && value.length < minLength) {
          res.status(HttpStatusCode.BAD_REQUEST).json({error: `Query ${name} must be at least ${minLength} characters`});
          return;
        }
        if (maxLength && value.length > maxLength) {
          res.status(HttpStatusCode.BAD_REQUEST).json({error: `Query ${name} must be at most ${maxLength} characters`});
          return;
        }
      }

      if (type === 'number' && typeof value === 'number') {
        if (min != null && value < min) {
          res.status(HttpStatusCode.BAD_REQUEST).json({error: `Query ${name} must be at least ${min}`});
          return;
        }
        if (max != null && value > max) {
          res.status(HttpStatusCode.BAD_REQUEST).json({error: `Query ${name} must be at most ${max}`});
          return;
        }
      }

      if (customValidator && value != null && !customValidator(value).result) {
        res.status(HttpStatusCode.BAD_REQUEST).json({error: `Query ${name} failed with ${customValidator(value).error} error`})
        return;
      }
    }
    next();
  };
}