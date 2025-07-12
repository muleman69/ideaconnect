import { NextResponse } from 'next/server';
import { ScheduledSync } from '@/lib/scheduler';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const status = ScheduledSync.getStatus();
    
    return NextResponse.json({
      scheduler: status,
      message: 'Scheduler status retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting scheduler status:', error);
    return NextResponse.json(
      { error: 'Failed to get scheduler status' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Run manual sync
    await ScheduledSync.runSyncNow();

    return NextResponse.json({
      success: true,
      message: 'Manual sync completed successfully'
    });
  } catch (error) {
    console.error('Error running manual sync:', error);
    return NextResponse.json(
      { error: 'Manual sync failed' },
      { status: 500 }
    );
  }
}