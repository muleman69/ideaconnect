import { NextRequest, NextResponse } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret) {
      logger.error('CRON_SECRET environment variable not set');
      return NextResponse.json(
        { error: 'Cron secret not configured' },
        { status: 500 }
      );
    }
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      logger.warn('Unauthorized cron request attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    logger.info('Starting automated daily sync from cron job');
    
    // Run the sync
    const results = await IdeaBrowserSync.syncIdeas();
    
    logger.info('Automated daily sync completed successfully', {
      synced: results.synced,
      skipped: results.skipped,
      cleaned: results.cleaned,
      errors: results.errors.length,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({
      success: true,
      message: `Daily sync completed successfully`,
      results: {
        synced: results.synced,
        skipped: results.skipped,
        cleaned: results.cleaned,
        errors: results.errors.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Automated daily sync failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Daily sync failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Same logic for manual triggers
  return GET(request);
} 