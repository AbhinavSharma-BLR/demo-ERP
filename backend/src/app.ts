import express, { Application } from 'express';
import healthRouter from './routes/health';
import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/v1', healthRouter);

// ── Catch-all handlers (must be last) ─────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

