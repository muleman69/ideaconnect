export interface WeeklyDigestData {
  userFirstName: string;
  hotIdeas: Array<{
    id: string;
    title: string;
    description: string;
    author: string;
    category: string;
    engagementCount: number;
    url: string;
  }>;
  potentialMatches: Array<{
    id: string;
    name: string;
    skills: string[];
    interests: string[];
    profileUrl: string;
    matchReason: string;
  }>;
  weeklyStats: {
    totalIdeas: number;
    totalUsers: number;
    totalConnections: number;
    topCategory: string;
  };
}

export const getWeeklyDigestTemplate = (data: WeeklyDigestData) => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Your Weekly IdeaConnect Digest</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        /* Header styles */
        .header {
            background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: white;
            text-decoration: none;
            font-size: 24px;
            font-weight: 700;
        }
        
        .logo-icon {
            width: 32px;
            height: 32px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .digest-badge {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 10px;
            display: inline-block;
        }
        
        /* Content styles */
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 20px;
        }
        
        .intro {
            font-size: 16px;
            color: #64748B;
            margin-bottom: 30px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        
        .stat-number {
            font-size: 24px;
            font-weight: 700;
            color: #8B5CF6;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 12px;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .section-emoji {
            font-size: 24px;
        }
        
        .idea-card {
            background: #FAFAFA;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
            transition: transform 0.2s ease;
        }
        
        .idea-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .idea-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        
        .idea-title {
            font-size: 16px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 5px;
        }
        
        .idea-author {
            font-size: 12px;
            color: #8B5CF6;
            font-weight: 500;
        }
        
        .idea-category {
            background: #EDE9FE;
            color: #7C3AED;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .idea-description {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .idea-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .engagement-count {
            font-size: 12px;
            color: #6B7280;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .view-idea-btn {
            background: #8B5CF6;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
            transition: background-color 0.3s ease;
        }
        
        .view-idea-btn:hover {
            background: #7C3AED;
        }
        
        .match-card {
            background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
            border: 1px solid #F59E0B;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
        }
        
        .match-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .match-avatar {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .match-info h3 {
            font-size: 16px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 5px;
        }
        
        .match-reason {
            font-size: 12px;
            color: #92400E;
            font-style: italic;
        }
        
        .match-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 15px;
        }
        
        .skill-tag {
            background: #EFF6FF;
            color: #1E40AF;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 500;
        }
        
        .match-actions {
            display: flex;
            gap: 10px;
        }
        
        .btn {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 500;
            font-size: 12px;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #F59E0B;
            color: white;
        }
        
        .btn-primary:hover {
            background: #D97706;
        }
        
        .btn-secondary {
            background: white;
            color: #374151;
            border: 1px solid #D1D5DB;
        }
        
        .btn-secondary:hover {
            background: #F9FAFB;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
            border: 1px solid #0EA5E9;
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            margin-top: 40px;
        }
        
        .cta-title {
            font-size: 20px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 10px;
        }
        
        .cta-description {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 20px;
        }
        
        .cta-button {
            background: #0EA5E9;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }
        
        .cta-button:hover {
            background: #0284C7;
        }
        
        /* Footer styles */
        .footer {
            background: #1E293B;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer-brand {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .footer-tagline {
            font-size: 14px;
            color: #94A3B8;
            margin-bottom: 25px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: #374151;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        
        .social-link:hover {
            background: #8B5CF6;
        }
        
        .footer-links {
            font-size: 12px;
            color: #94A3B8;
        }
        
        .footer-links a {
            color: #94A3B8;
            text-decoration: none;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        /* Mobile responsive */
        @media (max-width: 600px) {
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .footer {
                padding: 30px 20px;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .match-header {
                flex-direction: column;
                text-align: center;
            }
            
            .match-actions {
                justify-content: center;
            }
            
            .idea-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="logo">
                <div class="logo-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c0 1.3-.2 2.5-.5 3.7a10.5 10.5 0 0 1-1.9 3.1 10.5 10.5 0 0 1-3.1 1.9c-1.2.3-2.4.5-3.7.5s-2.5-.2-3.7-.5a10.5 10.5 0 0 1-3.1-1.9 10.5 10.5 0 0 1-1.9-3.1c-.3-1.2-.5-2.4-.5-3.7s.2-2.5.5-3.7a10.5 10.5 0 0 1 1.9-3.1 10.5 10.5 0 0 1 3.1-1.9c1.2-.3 2.4-.5 3.7-.5s2.5.2 3.7.5a10.5 10.5 0 0 1 3.1 1.9 10.5 10.5 0 0 1 1.9 3.1c.3 1.2.5 2.4.5 3.7z"></path>
                    </svg>
                </div>
                IdeaConnect
            </a>
            <div class="digest-badge">📊 Weekly Digest</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hi ${data.userFirstName},</div>
            
            <div class="intro">
                <p>Here's your weekly roundup of the hottest ideas, potential matches, and what's happening in the IdeaConnect community!</p>
            </div>
            
            <!-- Weekly Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${data.weeklyStats.totalIdeas}</div>
                    <div class="stat-label">New Ideas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.weeklyStats.totalUsers}</div>
                    <div class="stat-label">New Members</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.weeklyStats.totalConnections}</div>
                    <div class="stat-label">New Connections</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.weeklyStats.topCategory}</div>
                    <div class="stat-label">Trending Category</div>
                </div>
            </div>
            
            <!-- Hot Ideas Section -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-emoji">🔥</span>
                    5 Hot Ideas This Week
                </h2>
                
                ${data.hotIdeas.map((idea, index) => `
                <div class="idea-card">
                    <div class="idea-header">
                        <div>
                            <div class="idea-title">#${index + 1} ${idea.title}</div>
                            <div class="idea-author">by ${idea.author}</div>
                        </div>
                        <div class="idea-category">${idea.category}</div>
                    </div>
                    <div class="idea-description">${idea.description}</div>
                    <div class="idea-footer">
                        <div class="engagement-count">
                            <span>💬</span>
                            <span>${idea.engagementCount} discussions</span>
                        </div>
                        <a href="${idea.url}" class="view-idea-btn">View Idea</a>
                    </div>
                </div>
                `).join('')}
            </div>
            
            <!-- Potential Matches Section -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-emoji">🤝</span>
                    3 Potential Matches
                </h2>
                
                ${data.potentialMatches.map(match => `
                <div class="match-card">
                    <div class="match-header">
                        <div class="match-avatar">
                            ${match.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="match-info">
                            <h3>${match.name}</h3>
                            <div class="match-reason">${match.matchReason}</div>
                        </div>
                    </div>
                    <div class="match-skills">
                        ${match.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    <div class="match-actions">
                        <a href="${match.profileUrl}" class="btn btn-primary">View Profile</a>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/connect/${match.id}" class="btn btn-secondary">Connect</a>
                    </div>
                </div>
                `).join('')}
            </div>
            
            <!-- Call to Action -->
            <div class="cta-section">
                <div class="cta-title">Ready to Make Your Mark?</div>
                <div class="cta-description">
                    Don't just browse - engage! The best collaborations happen when you actively participate in the community.
                </div>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta-button">
                    Explore More Ideas
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-brand">IdeaConnect</div>
            <div class="footer-tagline">Where Innovation Meets Collaboration</div>
            
            <div class="social-links">
                <a href="#" class="social-link">🐦</a>
                <a href="#" class="social-link">💼</a>
                <a href="#" class="social-link">💬</a>
            </div>
            
            <div class="footer-links">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe">Unsubscribe</a> |
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy">Privacy Policy</a> |
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/terms">Terms of Service</a>
            </div>
        </div>
    </div>
</body>
</html>
  `.trim();
};