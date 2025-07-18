import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

// Simple rate limiting - track last cleanup time
let lastCleanupTime: number | undefined;

export async function POST() {
  try {
    // Simple rate limiting - only allow cleanup every 5 minutes
    const now = Date.now();
    const fiveMinutesAgo = now - (5 * 60 * 1000);
    
    if (lastCleanupTime && lastCleanupTime > fiveMinutesAgo) {
      const waitTime = Math.ceil((lastCleanupTime + (5 * 60 * 1000) - now) / 1000);
      return NextResponse.json(
        { 
          error: `Rate limited. Try again in ${waitTime} seconds.`,
          retryAfter: waitTime 
        },
        { status: 429 }
      );
    }
    
    lastCleanupTime = now;
    logger.info('Starting manual duplicate cleanup');
    
    // Find ideas with duplicate titles (case insensitive) - using safer approach
    const duplicateGroups = await prisma.$queryRaw<{title: string, ids: string[], count: bigint}[]>`
      SELECT 
        LOWER(title) as title,
        array_agg(id::text ORDER BY "createdAt" ASC) as ids,
        COUNT(*) as count
      FROM ideas 
      GROUP BY LOWER(title) 
      HAVING COUNT(*) > 1
    `;
    
    let deletedCount = 0;
    const deletedTitles: string[] = [];
    
    logger.info(`Found ${duplicateGroups.length} groups with duplicate titles`);
    
    for (const group of duplicateGroups) {
      try {
        if (group.ids && group.ids.length > 1) {
          // Keep the first one (oldest, usually best quality), delete the rest
          const idsToDelete = group.ids.slice(1);
          
          logger.info(`Processing duplicates for "${group.title}": ${group.ids.length} total, deleting ${idsToDelete.length}`);
          
          const deleted = await prisma.idea.deleteMany({
            where: {
              id: {
                in: idsToDelete
              }
            }
          });
          
          deletedCount += deleted.count;
          deletedTitles.push(`"${group.title}" (${deleted.count} duplicates removed)`);
          logger.info(`Removed ${deleted.count} duplicates of "${group.title}"`);
        }
      } catch (error) {
        logger.error(`Error deleting duplicates for "${group.title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
        // Continue with other groups even if one fails
      }
    }
    
    // Also clean up any ideas with generic titles that may have gotten through
    const genericTitleCleanup = await prisma.idea.deleteMany({
      where: {
        OR: [
          { title: { equals: 'Idea of the Day', mode: 'insensitive' } },
          { title: { equals: 'Daily Idea', mode: 'insensitive' } },
          { title: { equals: 'IdeaBrowser', mode: 'insensitive' } },
          { title: { equals: 'Today\'s Idea', mode: 'insensitive' } },
          { title: { contains: 'Welcome to', mode: 'insensitive' } },
          { description: { contains: 'This is a placeholder', mode: 'insensitive' } }
        ]
      }
    });
    
    deletedCount += genericTitleCleanup.count;
    if (genericTitleCleanup.count > 0) {
      deletedTitles.push(`${genericTitleCleanup.count} generic/placeholder ideas`);
    }
    
    logger.info('Manual duplicate cleanup completed successfully', {
      duplicateGroupsFound: duplicateGroups.length,
      totalDeleted: deletedCount,
      genericDeleted: genericTitleCleanup.count
    });
    
    return NextResponse.json({
      success: true,
      message: `Cleanup completed successfully`,
      results: {
        duplicateGroupsFound: duplicateGroups.length,
        totalDeleted: deletedCount,
        genericDeleted: genericTitleCleanup.count,
        deletedTitles,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    logger.error(`Manual duplicate cleanup failed: ${errorMessage}`);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Duplicate cleanup failed',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Duplicate cleanup endpoint. Use POST to trigger cleanup of duplicate ideas.' 
  });
} 