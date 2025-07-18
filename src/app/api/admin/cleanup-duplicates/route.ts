import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function POST() {
  try {
    logger.info('Starting manual duplicate cleanup');
    
    // Find ideas with duplicate titles (case insensitive)
    const duplicateGroups = await prisma.$queryRaw<{title: string, ids: string[], count: number}[]>`
      SELECT 
        LOWER(title) as title,
        array_agg(id ORDER BY "createdAt" ASC) as ids,
        COUNT(*) as count
      FROM ideas 
      GROUP BY LOWER(title) 
      HAVING COUNT(*) > 1
    `;
    
    let deletedCount = 0;
    const deletedTitles: string[] = [];
    
    for (const group of duplicateGroups) {
      if (group.ids && group.ids.length > 1) {
        // Keep the first one (oldest, usually best quality), delete the rest
        const idsToDelete = group.ids.slice(1);
        
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
    logger.error('Manual duplicate cleanup failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Duplicate cleanup failed',
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