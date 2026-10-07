import { Request, Response, NextFunction } from 'express';

// ──────────────────────────────────────────────────────────────────────────────
// 404 Not Found handler
//
// Registered AFTER all routes but BEFORE the error handler in app.ts.
// Catches requests that didn't match any route.
// ──────────────────────────────────────────────────────────────────────────────

export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found.`,
    },
  });
}

