const cheerio = require('cheerio');
const { default: fetch } = require('node-fetch');

async function debugScraping() {
  try {
    console.log('Debugging IdeaBrowser database scraping...');
    
    const url = 'https://ideabrowser.com/database';
    console.log(`Fetching: ${url}`);
    
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
    
    console.log('Page title:', $('title').text());
    console.log('Body length:', html.length);
    
    // Try different selectors to find idea cards
    const selectors = [
      '.idea-card', '.card', '.list-item', 'article', '.post', '.item',
      '[class*="idea"]', '[class*="card"]', '[class*="item"]',
      'div[class*="grid"] > div', '.grid > div', '.flex > div'
    ];
    
    for (const selector of selectors) {
      const elements = $(selector);
      console.log(`\nSelector "${selector}": found ${elements.length} elements`);
      
      if (elements.length > 0) {
        elements.slice(0, 2).each((i, el) => {
          const $el = $(el);
          console.log(`  Element ${i + 1}:`);
          console.log(`    Classes: ${$el.attr('class') || 'none'}`);
          console.log(`    Text preview: ${$el.text().substring(0, 100)}...`);
          console.log(`    Links: ${$el.find('a').length}`);
          if ($el.find('a').length > 0) {
            console.log(`    First link: ${$el.find('a').first().attr('href')}`);
          }
        });
      }
    }
    
    // Check for pagination info
    console.log('\nPagination info:');
    console.log('Pagination elements:', $('.pagination, .page, [class*="page"]').length);
    
    // Look for any text that mentions ideas
    const bodyText = $('body').text();
    const ideaMatches = bodyText.match(/\d+\s+ideas?/gi);
    if (ideaMatches) {
      console.log('Found idea count references:', ideaMatches);
    }
    
  } catch (error) {
    console.error('Debug scraping error:', error);
  }
}

debugScraping();