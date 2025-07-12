import { ScheduledSync } from './scheduler';

/**
 * Application startup initialization
 * Call this when the application starts to set up scheduled tasks
 */
export async function initializeScheduledTasks() {
  try {
    console.log('🚀 Initializing scheduled tasks...');
    
    // Start the IdeaBrowser sync scheduler
    await ScheduledSync.startScheduler();
    
    console.log('✅ Scheduled tasks initialized successfully');
    
    // Log the current status
    const status = ScheduledSync.getStatus();
    console.log('📅 Next IdeaBrowser sync:', status.nextSync.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    }));
    
  } catch (error) {
    console.error('❌ Failed to initialize scheduled tasks:', error);
    throw error;
  }
}

// Auto-start in production environments
if (process.env.NODE_ENV === 'production') {
  initializeScheduledTasks().catch(console.error);
}

export default initializeScheduledTasks;