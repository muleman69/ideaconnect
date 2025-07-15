// This script will trigger the real IdeaBrowser sync using the development endpoint
// It fetches REAL ideas from IdeaBrowser.com and stores them with proper UUIDs

async function syncIdeaBrowserData() {
  try {
    console.log('🚀 Starting IdeaBrowser sync...');
    console.log('This will fetch REAL ideas from IdeaBrowser.com');
    
    const response = await fetch('http://localhost:3000/api/sync/ideabrowser/dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const results = await response.json();
    
    if (results.success) {
      console.log('\n✅ Sync completed successfully!');
      console.log(`📊 Results:`);
      console.log(`   • Synced: ${results.results.synced} new ideas`);
      console.log(`   • Skipped: ${results.results.skipped} existing ideas`);
      console.log(`   • Errors: ${results.results.errors.length}`);
      
      if (results.results.errors.length > 0) {
        console.log('\n❌ Errors:');
        results.results.errors.forEach(error => console.log(`   • ${error}`));
      }
      
      console.log('\n🎉 Your database now has real IdeaBrowser data!');
      console.log('💡 The "View Details" links should now work with real UUIDs!');
      console.log('🔄 Refresh your browser to see the real ideas.');
    } else {
      console.error('❌ Sync failed:', results.error);
      if (results.details) {
        console.error('Details:', results.details);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to sync endpoint:', error.message);
    console.log('\n💡 Make sure your development server is running (npm run dev)');
    process.exit(1);
  }
}

syncIdeaBrowserData(); 