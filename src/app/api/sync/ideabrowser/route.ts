import { NextResponse } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';
import { handleApiError } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

// Simple rate limiting - track last sync time
let lastSyncTime: number | undefined;

export async function GET() {
  try {
    // Simple rate limiting - only allow sync every 2 minutes
    const now = Date.now();
    const twoMinutesAgo = now - (2 * 60 * 1000);
    
    if (lastSyncTime && lastSyncTime > twoMinutesAgo) {
      const waitTime = Math.ceil((lastSyncTime + (2 * 60 * 1000) - now) / 1000);
      return NextResponse.json(
        { 
          error: `Rate limited. Try again in ${waitTime} seconds.`,
          retryAfter: waitTime 
        },
        { status: 429 }
      );
    }
    
    lastSyncTime = now;
    logger.info('Starting IdeaBrowser sync');
    
    const results = await IdeaBrowserSync.syncIdeas();
    
    logger.info('IdeaBrowser sync completed successfully', {
      synced: results.synced,
      skipped: results.skipped,
      cleaned: results.cleaned,
      errors: results.errors.length,
    });
    
    return NextResponse.json({
      success: true,
      message: `Sync completed successfully`,
      results: {
        synced: results.synced,
        skipped: results.skipped,
        cleaned: results.cleaned,
        errors: results.errors.length,
        errorDetails: results.errors
      }
    });
  } catch (error) {
    return handleApiError(error, 'ideabrowser-sync');
  }
}

export async function POST() {
  // Same logic for manual triggers
  return GET();
}