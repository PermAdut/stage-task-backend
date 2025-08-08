import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../utils/statusCodes';
import { ErrorMessages } from '../utils/errorMessages';

interface FieldValidation<T> {
  name: keyof T & string;
  type: 'string' | 'number' | 'boolean';
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

export function validateRequest<T>(validations: Array<FieldValidation<T>>) {
  return (req: Request<object, any, T, any>, res: Response, next: NextFunction): void => {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: ErrorMessages.INVALID_REQUEST_BODY_MUST_BE_AN_OBJECT });
    }

    const typedBody = body as Record<string, unknown>;

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
      const value = typedBody[name];
      if (required && !(name in typedBody)) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: `Missing required field: ${name}` });
        return;
      }

      if (!required && !(name in typedBody)) {
        return;
      }

      if (typeof value !== type) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ error: `Invalid type for field ${name}: must be ${type}` });
        return;
      }

      if (type === 'string' && typeof value === 'string') {
        if (minLength && value.length < minLength) {
          res
            .status(HttpStatusCode.BAD_REQUEST)
            .json({
              error: `Field ${name} must be at least ${minLength} characters`,
            });
          return;
        }
        if (maxLength && value.length > maxLength) {
          res
            .status(HttpStatusCode.BAD_REQUEST)
            .json({
              error: `Field ${name} must be at most ${maxLength} characters`,
            });
          return;
        }
      }

      if (type === 'number' && typeof value === 'number') {
        if (min != null && value < min) {
          res
            .status(HttpStatusCode.BAD_REQUEST)
            .json({ error: `Field ${name} must be at least ${min}` });
          return;
        }
        if (max != null && value > max) {
          res
            .status(HttpStatusCode.BAD_REQUEST)
            .json({ error: `Field ${name} must be at most ${max}` });
          return;
        }
      }

      if (customValidator && value != null && !customValidator(value).result) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({
            error: `Field ${name} failed with ${customValidator(value).error}`,
          });
        return;
      }
    }
    next();
  };
}
