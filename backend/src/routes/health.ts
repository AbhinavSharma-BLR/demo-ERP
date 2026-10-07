import { Router, Request, Response } from 'express';

const router: Router = Router();

/**
 * GET /api/v1/health
 * Returns a JSON payload confirming the backend service is healthy.
 */
router.get('/health', (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is healthy',
    timestamp: new Date().toISOString(),
  });
});

export default router;

