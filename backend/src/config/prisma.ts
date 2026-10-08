import { PrismaClient } from '@prisma/client';

// ──────────────────────────────────────────────────────────────────────────────
// Singleton Prisma client
//
// In development, we reuse a single client stored on `globalThis` so that
// hot-reloads (ts-node) don't open multiple database connections.
// In production a new client is created once per process.
// ──────────────────────────────────────────────────────────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const prisma: PrismaClient =
  globalThis.__prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

export default prisma;

