import { prisma } from './prisma';
import * as cheerio from 'cheerio';
import { logger } from './logger';

export interface IdeaBrowserIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficultyLevel?: number;
  marketSize?: string;
  url?: string;
  publishedAt?: string;
  searchVolume?: number;
  growth?: string;
}

export class IdeaBrowserSync {
  private static readonly IDEABROWSER_BASE_URL = 'https://ideabrowser.com';
  private static readonly REQUEST_DELAY = 2000; // 2 seconds between requests to be respectful
  
  /**
   * Delay function for respectful scraping
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Fetches a single page from IdeaBrowser database
   */
  private static async fetchDatabasePage(page: number): Promise<Partial<IdeaBrowserIdea>[]> {
    try {
      const url = `${this.IDEABROWSER_BASE_URL}/database?page=${page}`;
      logger.info(`Fetching page ${page} from IdeaBrowser database`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const ideas: Partial<IdeaBrowserIdea>[] = [];
      
      // Look for idea cards in the database listing
      $('.idea-card, .card, .list-item').each((index, element) => {
        const $card = $(element);
        
        // Extract title
        const title = $card.find('h3, h2, .title, .idea-title').first().text().trim() ||
                     $card.find('a').first().text().trim();
        
        // Extract description
        const description = $card.find('p, .description, .idea-description').first().text().trim();
        
        // Extract URL
        const relativeUrl = $card.find('a').first().attr('href');
        const url = relativeUrl ? `${this.IDEABROWSER_BASE_URL}${relativeUrl}` : undefined;
        
        // Extract ID from URL
        const id = relativeUrl ? relativeUrl.split('/').pop() || `page${page}-${index}` : `page${page}-${index}`;
        
        if (title && description) {
          ideas.push({
            id,
            title,
            description,
            url,
            category: 'Startup Idea', // Default category, will be refined later
            publishedAt: new Date().toISOString()
          });
        }
      });
      
      // If no ideas found with above selectors, try alternative selectors
      if (ideas.length === 0) {
        $('article, .post, .item').each((index, element) => {
          const $item = $(element);
          const title = $item.find('h1, h2, h3, h4').first().text().trim();
          const description = $item.find('p').first().text().trim();
          const relativeUrl = $item.find('a').first().attr('href');
          const url = relativeUrl ? `${this.IDEABROWSER_BASE_URL}${relativeUrl}` : undefined;
          const id = relativeUrl ? relativeUrl.split('/').pop() || `alt-page${page}-${index}` : `alt-page${page}-${index}`;
          
          if (title && description) {
            ideas.push({
              id,
              title,
              description,
              url,
              category: 'Startup Idea',
              publishedAt: new Date().toISOString()
            });
          }
        });
      }
      
      await this.delay(this.REQUEST_DELAY); // Respectful delay
      return ideas;
      
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      return [];
    }
  }
  
  /**
   * Fetches detailed information for a specific idea
   */
  private static async fetchIdeaDetails(ideaUrl: string): Promise<Partial<IdeaBrowserIdea>> {
    try {
      console.log(`Fetching idea details from: ${ideaUrl}`);
      
      const response = await fetch(ideaUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Extract additional metadata
      const searchVolume = this.extractSearchVolume($);
      const growth = this.extractGrowth($);
      const category = this.extractCategory($);
      const marketSize = this.extractMarketSize($);
      const difficultyLevel = this.extractDifficultyLevel($);
      
      await this.delay(this.REQUEST_DELAY); // Respectful delay
      
      return {
        searchVolume,
        growth,
        category: category || 'Startup Idea',
        marketSize,
        difficultyLevel
      };
      
    } catch (error) {
      console.error(`Error fetching idea details from ${ideaUrl}:`, error);
      return {};
    }
  }
  
  /**
   * Extract search volume from idea page
   */
  private static extractSearchVolume($: cheerio.Root): number | undefined {
    const volumeText = $('.search-volume, .volume, .keyword-volume').text();
    const match = volumeText.match(/(\d+(?:\.\d+)?)\s*k?/i);
    if (match) {
      const num = parseFloat(match[1]);
      return volumeText.toLowerCase().includes('k') ? num * 1000 : num;
    }
    return undefined;
  }
  
  /**
   * Extract growth percentage from idea page
   */
  private static extractGrowth($: cheerio.Root): string | undefined {
    const growthText = $('.growth, .trend, .percentage').text();
    const match = growthText.match(/([+-]?\d+(?:\.\d+)?%)/);
    return match ? match[1] : undefined;
  }
  
  /**
   * Extract category from idea page
   */
  private static extractCategory($: cheerio.Root): string | undefined {
    const category = $('.category, .tag, .industry').first().text().trim();
    return category || undefined;
  }
  
  /**
   * Extract market size from idea page
   */
  private static extractMarketSize($: cheerio.Root): string | undefined {
    const text = $('body').text();
    const marketMatches = text.match(/\$(\d+(?:\.\d+)?)\s*([bmk])/i);
    if (marketMatches) {
      // const value = marketMatches[1]; // Extracted but unit determines size
      const unit = marketMatches[2].toLowerCase();
      if (unit === 'b') return 'Large';
      if (unit === 'm') return 'Medium';
      if (unit === 'k') return 'Small';
    }
    return undefined;
  }
  
  /**
   * Extract difficulty level from idea page
   */
  private static extractDifficultyLevel($: cheerio.Root): number | undefined {
    // Look for complexity indicators
    const text = $('body').text().toLowerCase();
    if (text.includes('complex') || text.includes('advanced') || text.includes('difficult')) {
      return 8;
    }
    if (text.includes('moderate') || text.includes('medium')) {
      return 5;
    }
    if (text.includes('simple') || text.includes('easy') || text.includes('basic')) {
      return 3;
    }
    return undefined;
  }
  
  /**
   * Fetches the current "Idea of the Day"
   */
  private static async fetchIdeaOfTheDay(): Promise<IdeaBrowserIdea | null> {
    try {
      console.log('Fetching Idea of the Day...');
      
      const response = await fetch(`${this.IDEABROWSER_BASE_URL}/idea-of-the-day`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Extract the main idea content with better filtering
      let title = '';
      
      // Try h1 elements first, but skip generic ones
      $('h1').each((i, el) => {
        const text = $(el).text().trim();
        if (text && 
            text !== 'Idea of the Day' && 
            text !== 'IdeaBrowser' &&
            text !== 'Daily Idea' &&
            !text.toLowerCase().includes('welcome') &&
            text.length > 10) {
          title = text;
          return false; // Break out of loop
        }
      });
      
      // If no good h1, try h2 elements
      if (!title) {
        $('h2').each((i, el) => {
          const text = $(el).text().trim();
          if (text && 
              text !== 'Idea of the Day' && 
              text !== 'IdeaBrowser' &&
              text !== 'Daily Idea' &&
              !text.toLowerCase().includes('welcome') &&
              text.length > 10) {
            title = text;
            return false; // Break out of loop
          }
        });
      }
      
      // Fallback to other selectors
      if (!title) {
        $('.title, .idea-title, .main-title').each((i, el) => {
          const text = $(el).text().trim();
          if (text && 
              text !== 'Idea of the Day' && 
              text.length > 10) {
            title = text;
            return false; // Break out of loop
          }
        });
      }
      
      // Extract description with better targeting
      let description = '';
      
      // Try to find the main description paragraph
      $('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text && 
            text.length > 50 && // Longer descriptions are better
            !text.toLowerCase().includes('welcome') &&
            !text.toLowerCase().includes('sign up') &&
            !text.toLowerCase().includes('login')) {
          description = text;
          return false; // Break out of loop
        }
      });
      
      // Fallback to first substantial paragraph
      if (!description) {
        description = $('p').first().text().trim();
      }
      const url = response.url;
      
      // Extract metadata
      const searchVolume = this.extractSearchVolume($);
      const growth = this.extractGrowth($);
      const category = this.extractCategory($) || 'Featured';
      const marketSize = this.extractMarketSize($);
      const difficultyLevel = this.extractDifficultyLevel($);
      
      if (title && description && title !== 'Idea of the Day') {
        console.log(`✓ Got current Idea of the Day: ${title}`);
        return {
          id: `idea-of-the-day-${new Date().toISOString().split('T')[0]}`,
          title,
          description,
          category,
          difficultyLevel,
          marketSize,
          url,
          publishedAt: new Date().toISOString(),
          searchVolume,
          growth
        };
      }
      
      return null;
      
    } catch (error) {
      console.error('Error fetching Idea of the Day:', error);
      return null;
    }
  }
  
  /**
   * Fetches historical ideas by trying different date-based URLs
   */
  private static async fetchHistoricalIdeas(): Promise<IdeaBrowserIdea[]> {
    const ideas: IdeaBrowserIdea[] = [];
    
    try {
      // Try to get recent ideas by going back in dates
      const today = new Date();
      for (let i = 0; i < 7; i++) { // Try last 7 days
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        try {
          // Try different URL patterns that might exist
          const dateStr = date.toISOString().split('T')[0];
          const urls = [
            `${this.IDEABROWSER_BASE_URL}/idea-of-the-day?date=${dateStr}`,
            `${this.IDEABROWSER_BASE_URL}/ideas/${dateStr}`,
            `${this.IDEABROWSER_BASE_URL}/archive/${dateStr}`
          ];
          
          for (const url of urls) {
            try {
              const response = await fetch(url, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                }
              });
              
              if (response.ok) {
                const html = await response.text();
                const $ = cheerio.load(html);
                
                const title = $('h1, h2, .title').first().text().trim();
                const description = $('p, .description, .content').first().text().trim();
                
                if (title && description && !ideas.find(idea => idea.title === title)) {
                  ideas.push({
                    id: `historical-${dateStr}-${ideas.length}`,
                    title,
                    description,
                    category: 'Startup Idea',
                    url,
                    publishedAt: date.toISOString()
                  });
                  
                  console.log(`Found historical idea: ${title}`);
                }
                
                await this.delay(this.REQUEST_DELAY);
                break; // Found something, move to next date
              }
            } catch {
              // Continue trying other URLs
            }
          }
        } catch {
          console.log(`No idea found for ${date.toDateString()}`);
        }
      }
    } catch (error) {
      console.error('Error fetching historical ideas:', error);
    }
    
    return ideas;
  }
  
  /**
   * Try to find individual idea URLs by exploring known patterns
   */
  private static async fetchKnownIdeaPatterns(): Promise<IdeaBrowserIdea[]> {
    const ideas: IdeaBrowserIdea[] = [];
    
    // Known real idea URLs from IdeaBrowser (we found this one works!)
    const commonPatterns = [
      'job-board-for-ai-video-creators', // We know this exists from WebFetch
      'genuinematch-the-anti-ghosting-dating-platform', // From WebFetch analysis
      'ai-video-creator-talent-hub',
      'social-media-scheduler',
      'remote-work-productivity',
      'subscription-box-service',
      'mobile-app-builder',
      'ecommerce-automation',
      'fitness-tracking-app',
      'meal-planning-service'
    ];
    
    for (const pattern of commonPatterns) {
      try {
        const url = `${this.IDEABROWSER_BASE_URL}/idea/${pattern}`;
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          }
        });
        
        if (response.ok) {
          const html = await response.text();
          const $ = cheerio.load(html);
          
          const title = $('h1, h2, .title').first().text().trim();
          const description = $('p, .description, .content').first().text().trim();
          
          if (title && description) {
            const searchVolume = this.extractSearchVolume($);
            const growth = this.extractGrowth($);
            const category = this.extractCategory($) || 'Startup Idea';
            const marketSize = this.extractMarketSize($);
            const difficultyLevel = this.extractDifficultyLevel($);
            
            ideas.push({
              id: pattern,
              title,
              description,
              category,
              difficultyLevel,
              marketSize,
              url,
              publishedAt: new Date().toISOString(),
              searchVolume,
              growth
            });
            
            console.log(`Found idea: ${title}`);
          }
        }
        
        await this.delay(this.REQUEST_DELAY);
        
        // Only try first few to avoid overwhelming
        if (ideas.length >= 5) break;
        
      } catch {
        console.log(`Pattern ${pattern} not found`);
      }
    }
    
    return ideas;
  }
  
  /**
   * Fetches ideas from IdeaBrowser.com using multiple strategies
   */
  private static async fetchIdeasFromSource(): Promise<IdeaBrowserIdea[]> {
    try {
      console.log('Starting IdeaBrowser scraping with multiple strategies...');
      const allIdeas: IdeaBrowserIdea[] = [];
      
      // Strategy 1: Get the current Idea of the Day (this works!)
      console.log('Strategy 1: Fetching Idea of the Day...');
      const ideaOfTheDay = await this.fetchIdeaOfTheDay();
      if (ideaOfTheDay) {
        allIdeas.push(ideaOfTheDay);
        console.log(`✓ Got Idea of the Day: ${ideaOfTheDay.title}`);
      }
      
      // Strategy 2: Try to get historical ideas
      console.log('Strategy 2: Fetching historical ideas...');
      const historicalIdeas = await this.fetchHistoricalIdeas();
      allIdeas.push(...historicalIdeas);
      console.log(`✓ Got ${historicalIdeas.length} historical ideas`);
      
      // Strategy 3: Try known idea URL patterns
      console.log('Strategy 3: Trying known idea patterns...');
      const patternIdeas = await this.fetchKnownIdeaPatterns();
      allIdeas.push(...patternIdeas);
      console.log(`✓ Got ${patternIdeas.length} ideas from patterns`);
      
      // Filter out error messages and invalid content
      const validIdeas = allIdeas.filter(idea => {
        // Filter out error messages from IdeaBrowser.com
        if (idea.title.toLowerCase().includes('unlock the full idea report') ||
            idea.title.toLowerCase().includes('access window has expired') ||
            idea.description.toLowerCase().includes('24-hour access window has expired') ||
            idea.description.toLowerCase().includes('upgrade to access this idea')) {
          console.log(`Filtered out error message: ${idea.title}`);
          return false;
        }
        
        // Filter out generic/invalid titles
        if (idea.title === 'Idea of the Day' && idea.description.length < 100) {
          console.log(`Filtered out generic title with short description: ${idea.title}`);
          return false;
        }
        
        return true;
      });
      
      // Remove duplicates based on both title AND description content
      const uniqueIdeas = validIdeas.filter((idea, index, self) => {
        // Find if there's any previous idea with same title OR same description (first 200 chars)
        const duplicateIndex = self.findIndex(i => 
          i.title === idea.title || 
          i.description.substring(0, 200) === idea.description.substring(0, 200)
        );
        
        // Keep only the first occurrence (which will be the best one from Strategy 1)
        return duplicateIndex === index;
      });
      
      console.log(`Successfully scraped ${uniqueIdeas.length} unique ideas from IdeaBrowser.com`);
      return uniqueIdeas;
      
    } catch (error) {
      console.error('Error scraping IdeaBrowser:', error);
      throw new Error('Failed to scrape ideas from IdeaBrowser.com');
    }
  }
  
  /**
   * Syncs ideas from IdeaBrowser to local database
   */
  public static async syncIdeas(): Promise<{ 
    synced: number; 
    skipped: number; 
    errors: string[] 
  }> {
    const results = {
      synced: 0,
      skipped: 0,
      errors: [] as string[]
    };
    
    try {
      console.log('Starting IdeaBrowser sync...');
      const ideas = await this.fetchIdeasFromSource();
      
      for (const ideaData of ideas) {
        try {
          // Check if idea already exists
          const existingIdea = await prisma.idea.findUnique({
            where: { sourceId: ideaData.id }
          });
          
          if (existingIdea) {
            console.log(`Skipping existing idea: ${ideaData.title}`);
            results.skipped++;
            continue;
          }
          
          // Create new idea
          await prisma.idea.create({
            data: {
              title: ideaData.title,
              description: ideaData.description,
              category: ideaData.category,
              sourceId: ideaData.id,
              sourceUrl: ideaData.url,
              difficultyLevel: ideaData.difficultyLevel,
              marketSize: ideaData.marketSize,
              skills: this.extractSkillsFromDescription(ideaData.description),
              syncedAt: new Date()
            }
          });
          
          console.log(`Synced idea: ${ideaData.title}`);
          results.synced++;
        } catch (error) {
          const errorMsg = `Failed to sync idea ${ideaData.title}: ${error}`;
          console.error(errorMsg);
          results.errors.push(errorMsg);
        }
      }
      
      console.log(`Sync completed. Synced: ${results.synced}, Skipped: ${results.skipped}, Errors: ${results.errors.length}`);
      
      // Update featured idea if needed
      await this.updateFeaturedIdea();
      
      return results;
    } catch (error) {
      console.error('Error during IdeaBrowser sync:', error);
      results.errors.push(`Sync failed: ${error}`);
      return results;
    }
  }
  
  /**
   * Extracts relevant skills from idea description using simple keyword matching
   */
  private static extractSkillsFromDescription(description: string): string[] {
    const skillKeywords = [
      'AI', 'Machine Learning', 'ML', 'JavaScript', 'Python', 'React', 'Node.js',
      'Mobile Development', 'iOS', 'Android', 'Flutter', 'React Native',
      'Data Science', 'Analytics', 'Database', 'SQL', 'NoSQL',
      'UI/UX', 'Design', 'Marketing', 'Sales', 'Business Development',
      'Blockchain', 'Web3', 'Cryptocurrency', 'NFT',
      'IoT', 'Hardware', 'Electronics', 'Robotics',
      'Cloud Computing', 'AWS', 'Azure', 'Google Cloud',
      'DevOps', 'CI/CD', 'Docker', 'Kubernetes',
      'Finance', 'FinTech', 'Banking', 'Investment',
      'Healthcare', 'Medical', 'Biotech', 'Pharmaceutical',
      'Education', 'EdTech', 'E-learning', 'Online Courses',
      'Gaming', 'Game Development', 'Unity', 'Unreal Engine',
      'VR', 'AR', 'Virtual Reality', 'Augmented Reality',
      'Sustainability', 'Green Tech', 'Climate', 'Environmental'
    ];
    
    const foundSkills: string[] = [];
    const lowerDescription = description.toLowerCase();
    
    for (const skill of skillKeywords) {
      if (lowerDescription.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    }
    
    return foundSkills;
  }
  
  /**
   * Updates the featured idea based on algorithm
   */
  private static async updateFeaturedIdea(): Promise<void> {
    try {
      // Reset all featured flags
      await prisma.idea.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false }
      });
      
      const today = new Date().toISOString().split('T')[0];
      
      // First priority: Today's Idea of the Day
      const todaysIdea = await prisma.idea.findFirst({
        where: {
          sourceId: `idea-of-the-day-${today}`,
        }
      });
      
      if (todaysIdea) {
        await prisma.idea.update({
          where: { id: todaysIdea.id },
          data: { isFeatured: true }
        });
        console.log(`Featured idea set: ${todaysIdea.title}`);
        return;
      }
      
      // Second priority: Any recent Idea of the Day (last 3 days)
      const recentIdeaOfTheDay = await prisma.idea.findFirst({
        where: {
          sourceId: {
            startsWith: 'idea-of-the-day-'
          },
          syncedAt: {
            gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // Last 3 days
          }
        },
        orderBy: {
          syncedAt: 'desc'
        }
      });
      
      if (recentIdeaOfTheDay) {
        await prisma.idea.update({
          where: { id: recentIdeaOfTheDay.id },
          data: { isFeatured: true }
        });
        console.log(`Featured idea set: ${recentIdeaOfTheDay.title}`);
        return;
      }
      
      // Fallback: Use engagement scoring for other ideas
      const ideasWithEngagement = await prisma.idea.findMany({
        include: {
          _count: {
            select: {
              interests: true,
              discussions: true
            }
          }
        },
        where: {
          syncedAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      });
      
      // Simple algorithm: highest engagement score
      let featuredIdea = ideasWithEngagement[0];
      let highestScore = 0;
      
      for (const idea of ideasWithEngagement) {
        const score = (idea._count.interests * 2) + (idea._count.discussions * 3);
        if (score > highestScore) {
          highestScore = score;
          featuredIdea = idea;
        }
      }
      
      // If no ideas have engagement, pick the most recent one
      if (!featuredIdea) {
        const recentIdeas = await prisma.idea.findMany({
          where: {
            syncedAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
          },
          include: {
            _count: {
              select: {
                interests: true,
                discussions: true
              }
            }
          },
          orderBy: {
            syncedAt: 'desc'
          },
          take: 1
        });
        
        featuredIdea = recentIdeas[0];
      }
      
      if (featuredIdea) {
        await prisma.idea.update({
          where: { id: featuredIdea.id },
          data: { isFeatured: true }
        });
        console.log(`Featured idea set: ${featuredIdea.title}`);
      }
      
    } catch (error) {
      console.error('Error updating featured idea:', error);
    }
  }
  
  /**
   * Gets the current featured idea
   */
  public static async getFeaturedIdea() {
    try {
      const featuredIdea = await prisma.idea.findFirst({
        where: { isFeatured: true },
        include: {
          interests: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true
                }
              }
            }
          },
          discussions: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 5
          },
          _count: {
            select: {
              interests: true,
              discussions: true,
              teams: true
            }
          }
        }
      });
      
      return featuredIdea;
    } catch (error) {
      console.error('Error getting featured idea:', error);
      return null;
    }
  }
  
  /**
   * Schedules daily sync (to be called from cron job or scheduled task)
   */
  public static async scheduledSync(): Promise<void> {
    try {
      console.log('Running scheduled IdeaBrowser sync...');
      const results = await this.syncIdeas();
      
      // Log results for monitoring
      console.log('Scheduled sync results:', results);
      
      // You could send notifications, update metrics, etc. here
      
    } catch (error) {
      console.error('Scheduled sync failed:', error);
      // You could send alerts, retry logic, etc. here
    }
  }
}

export default IdeaBrowserSync;