// ──────────────────────────────────────────────────────────────────────────────
// Async route wrapper
//
// Wraps an async Express handler so you don't have to write try/catch in
// every route. Caught errors are forwarded to the global error handler.
//
// Usage:
//   router.get('/example', asyncHandler(async (req, res) => {
//     const data = await someService();
//     res.json({ success: true, data });
//   }));
// ──────────────────────────────────────────────────────────────────────────────

import { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

