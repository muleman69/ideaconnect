import { IdeaBrowserSync } from './ideabrowser-sync';

/**
 * Scheduled sync service for IdeaBrowser integration
 * Runs daily at 7:15 AM EST (after IdeaBrowser sends emails at 7:01 AM EST)
 */
export class ScheduledSync {
  private static isRunning = false;
  
  /**
   * Start the scheduled sync service
   * In production, this would be called from a cron job or scheduled task
   */
  public static async startScheduler(): Promise<void> {
    console.log('Starting IdeaBrowser scheduled sync service...');
    
    // Calculate next 7:15 AM EST
    const nextSync = this.getNext715AMEST();
    console.log(`Next sync scheduled for: ${nextSync.toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    })}`);
    
    // Set timeout for next sync
    const timeToWait = nextSync.getTime() - Date.now();
    setTimeout(() => {
      this.runDailySync();
      // Set up recurring daily sync
      setInterval(() => {
        this.runDailySync();
      }, 24 * 60 * 60 * 1000); // 24 hours
    }, timeToWait);
  }
  
  /**
   * Calculate the next 7:15 AM EST occurrence
   */
  private static getNext715AMEST(): Date {
    const now = new Date();
    const estOffset = -5; // EST is UTC-5
    
    // Create date for today 7:15 AM EST
    const today715EST = new Date();
    today715EST.setUTCHours(7 + (-estOffset), 15, 0, 0); // 7:15 AM EST = 12:15 PM UTC
    
    // If we've already passed today's 7:15 AM EST, schedule for tomorrow
    if (now >= today715EST) {
      today715EST.setDate(today715EST.getDate() + 1);
    }
    
    return today715EST;
  }
  
  /**
   * Run the daily sync process
   */
  private static async runDailySync(): Promise<void> {
    if (this.isRunning) {
      console.log('Sync already in progress, skipping...');
      return;
    }
    
    this.isRunning = true;
    
    try {
      console.log('🚀 Starting daily IdeaBrowser sync at', new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'short',
        timeStyle: 'medium'
      }));
      
      const results = await IdeaBrowserSync.syncIdeas();
      
      console.log('✅ Daily sync completed:', {
        synced: results.synced,
        skipped: results.skipped,
        errors: results.errors.length,
        timestamp: new Date().toISOString()
      });
      
      // Log errors if any
      if (results.errors.length > 0) {
        console.error('❌ Sync errors:', results.errors);
      }
      
      // You could add notifications here:
      // - Email alerts for admins
      // - Slack/Discord notifications
      // - Database logging
      // - Metrics collection
      
    } catch (error) {
      console.error('💥 Daily sync failed:', error);
      
      // Handle critical errors:
      // - Send alert to administrators
      // - Log to error tracking service
      // - Retry logic could be added here
      
    } finally {
      this.isRunning = false;
    }
  }
  
  /**
   * Run sync manually (for testing or immediate execution)
   */
  public static async runSyncNow(): Promise<void> {
    console.log('🔧 Running manual sync...');
    await this.runDailySync();
  }
  
  /**
   * Get status of the scheduler
   */
  public static getStatus(): {
    isRunning: boolean;
    nextSync: Date;
    lastSync?: Date;
  } {
    return {
      isRunning: this.isRunning,
      nextSync: this.getNext715AMEST()
    };
  }
}

// Export for use in API routes or application startup
export default ScheduledSync;