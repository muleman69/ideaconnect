import { NextRequest } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let isRunning = false;

export async function GET(request: NextRequest) {
  try {
    // Verify request (Authorization bearer; optional UA informational)
    const authHeader = request.headers.get('authorization');
    const userAgent = request.headers.get('user-agent') || '';
    const cronSecret = process.env.CRON_SECRET;

    const okBearer = !!cronSecret && authHeader === `Bearer ${cronSecret}`;
    const okUA = userAgent.toLowerCase().includes('vercel-cron'); // informational only

    if (!okBearer && !okUA) {
      logger.warn('Unauthorized cron request attempt');
      return new Response('Unauthorized', { status: 401 });
    }

    if (isRunning) {
      logger.warn('Cron sync skipped: job already running');
      return Response.json({ ok: false, reason: 'already-running' }, { status: 429 });
    }

    isRunning = true;
    const started = Date.now();
    logger.info('Starting automated daily sync from cron job');

    const results = await IdeaBrowserSync.syncIdeas();

    const ms = Date.now() - started;
    logger.info('Automated daily sync completed successfully', {
      synced: results.synced,
      skipped: results.skipped,
      cleaned: results.cleaned,
      errors: results.errors.length,
      durationMs: ms,
      timestamp: new Date().toISOString()
    });

    return Response.json({ ok: true, ms, ...results });
  } catch (error) {
    logger.error('Automated daily sync failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  } finally {
    isRunning = false;
  }
}

export async function POST(request: NextRequest) {
  // Same logic for manual triggers
  return GET(request);
} 