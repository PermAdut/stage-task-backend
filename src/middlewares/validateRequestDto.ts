import { Request, Response, NextFunction } from 'express';

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
  return (req: Request, res: Response, next: NextFunction): void => {
    const body = req.body as unknown;
    if (!body || typeof body !== 'object') {
      res
        .status(400)
        .json({ error: 'Invalid request body: body must be an object' });
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
        res.status(400).json({error: `Missing required field: ${name}`});
        continue;
      }

      if (!required && !(name in typedBody)) {
        continue;
      }

      if (value != null && typeof value !== type) {
        res.status(400).json({error: `Invalid type for field ${name}: must be ${type}`})
        continue;
      }

      if (type === 'string' && typeof value === 'string') {
        if (minLength && value.length < minLength) {
          res.status(400).json({error: `Field ${name} must be at least ${minLength} characters`})
        }
        if (maxLength && value.length > maxLength) {
          res.status(400).json({error: `Field ${name} must be at most ${maxLength} characters`})
        }
      }

      if (type === 'number' && typeof value === 'number') {
        if (min != null && value < min) {
          res.status(400).json({error: `Field ${name} must be at least ${min}`})
        }
        if (max != null && value > max) {
          res.status(400).json({error: `Field ${name} must be at most ${max}`})
        }
      }

      if (customValidator && value != null && !customValidator(value).result) {
        res.status(400).json({error: `Field ${name} failed with ${customValidator(value).error} error`})
      }
    }

    req.body = typedBody as T;
    next();
  };
}
