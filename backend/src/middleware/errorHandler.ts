import { Request, Response, NextFunction } from 'express';

// ──────────────────────────────────────────────────────────────────────────────
// Typed API response helpers
// ──────────────────────────────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ──────────────────────────────────────────────────────────────────────────────
// Global error handler middleware
//
// Must be registered LAST in app.ts (after all routes).
// Express identifies error handlers by their 4-argument signature.
// ──────────────────────────────────────────────────────────────────────────────

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    } satisfies ApiError);
    return;
  }

  // Unexpected errors — don't leak internal details in production
  console.error('[error]', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
    },
  } satisfies ApiError);
}

