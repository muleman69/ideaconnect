const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearMockData() {
  try {
    console.log('Clearing existing mock data...');
    
    // Delete ideas that were synced from mock data (have sourceId starting with 'ib-')
    const result = await prisma.idea.deleteMany({
      where: {
        OR: [
          { sourceId: { startsWith: 'ib-' } },
          { title: { contains: 'AI-Powered Personal Finance Assistant' } },
          { title: { contains: 'Sustainable Food Delivery Platform' } },
          { title: { contains: 'Virtual Reality Fitness Studios' } },
          { title: { contains: 'Smart Home Energy Optimization' } },
          { title: { contains: 'Peer-to-Peer Skill Exchange Platform' } }
        ]
      }
    });
    
    console.log(`Deleted ${result.count} mock ideas`);
    
    // Reset featured flags
    await prisma.idea.updateMany({
      where: { isFeatured: true },
      data: { isFeatured: false }
    });
    
    console.log('Mock data cleared successfully!');
  } catch (error) {
    console.error('Error clearing mock data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearMockData();