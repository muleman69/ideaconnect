export interface IdeaMatchData {
  matcherName: string;
  matcherEmail: string;
  ideaName: string;
  ideaDescription: string;
  matcherSkills: string[];
  matcherMessage?: string;
  ideaUrl: string;
  matcherProfileUrl: string;
}

export const getIdeaMatchTemplate = (data: IdeaMatchData, recipientName: string = 'there') => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>🎯 New Match on IdeaConnect</title>
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
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
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
        
        .match-badge {
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
        
        .match-card {
            background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
            border: 1px solid #F59E0B;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }
        
        .match-card::before {
            content: '🎯';
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            opacity: 0.7;
        }
        
        .matcher-info {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .matcher-avatar {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .matcher-details h3 {
            font-size: 18px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 5px;
        }
        
        .matcher-details p {
            font-size: 14px;
            color: #92400E;
        }
        
        .idea-info {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .idea-title {
            font-size: 18px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 10px;
        }
        
        .idea-description {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 15px;
        }
        
        .skills-section {
            margin-bottom: 20px;
        }
        
        .skills-label {
            font-size: 14px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 10px;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-tag {
            background: #EFF6FF;
            color: #1E40AF;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .personal-message {
            background: #F0F9FF;
            border: 1px solid #E0F2FE;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .message-label {
            font-size: 14px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 10px;
        }
        
        .message-text {
            font-size: 14px;
            color: #475569;
            font-style: italic;
        }
        
        .action-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            text-decoration: none;
            transition: all 0.3s ease;
            text-align: center;
            min-width: 120px;
        }
        
        .btn-primary {
            background: #EF4444;
            color: white;
        }
        
        .btn-primary:hover {
            background: #DC2626;
        }
        
        .btn-secondary {
            background: white;
            color: #374151;
            border: 2px solid #D1D5DB;
        }
        
        .btn-secondary:hover {
            background: #F9FAFB;
            border-color: #9CA3AF;
        }
        
        .tips-section {
            background: #F0FDF4;
            border: 1px solid #BBF7D0;
            border-radius: 12px;
            padding: 25px;
            margin-top: 30px;
        }
        
        .tips-title {
            font-size: 16px;
            font-weight: 600;
            color: #166534;
            margin-bottom: 15px;
        }
        
        .tip-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            color: #15803D;
        }
        
        .tip-icon {
            flex-shrink: 0;
            margin-top: 2px;
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
            background: #EF4444;
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
            
            .action-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .btn {
                width: 100%;
                max-width: 200px;
            }
            
            .matcher-info {
                flex-direction: column;
                text-align: center;
            }
            
            .skills-list {
                justify-content: center;
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c0 1.3-.2 2.5-.5 3.7a10.5 10.5 0 0 1-1.9 3.1 10.5 10.5 0 0 1-3.1 1.9c-1.2.3-2.4.5-3.7.5s-2.5-.2-3.7-.5a10.5 10.5 0 0 1-3.1-1.9 10.5 10.5 0 0 1-1.9-3.1c-.3-1.2-.5-2.4-.5-3.7s.2-2.5.5-3.7a10.5 10.5 0 0 1 1.9-3.1 10.5 10.5 0 0 1 3.1-1.9c1.2-.3 2.4-.5 3.7-.5s2.5.2 3.7.5a10.5 10.5 0 0 1 3.1 1.9 10.5 10.5 0 0 1 1.9 3.1c.3 1.2.5 2.4.5 3.7z"></path>
                    </svg>
                </div>
                IdeaConnect
            </a>
            <div class="match-badge">🎯 New Match Alert</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hi ${recipientName},</div>
            
            <div class="intro">
                <p>Great news! Someone wants to collaborate with you on an idea that matches your interests and skills.</p>
            </div>
            
            <div class="match-card">
                <div class="matcher-info">
                    <div class="matcher-avatar">
                        ${data.matcherName.charAt(0).toUpperCase()}
                    </div>
                    <div class="matcher-details">
                        <h3>${data.matcherName}</h3>
                        <p>Interested in collaborating with you</p>
                    </div>
                </div>
                
                <div class="idea-info">
                    <div class="idea-title">${data.ideaName}</div>
                    <div class="idea-description">${data.ideaDescription}</div>
                </div>
                
                <div class="skills-section">
                    <div class="skills-label">Their Skills:</div>
                    <div class="skills-list">
                        ${data.matcherSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                ${data.matcherMessage ? `
                <div class="personal-message">
                    <div class="message-label">Personal Message:</div>
                    <div class="message-text">"${data.matcherMessage}"</div>
                </div>
                ` : ''}
            </div>
            
            <div class="action-buttons">
                <a href="${data.matcherProfileUrl}" class="btn btn-primary">View Profile</a>
                <a href="${data.ideaUrl}" class="btn btn-secondary">View Idea</a>
            </div>
            
            <div class="tips-section">
                <div class="tips-title">💡 Tips for Great Collaborations:</div>
                <div class="tip-item">
                    <span class="tip-icon">✓</span>
                    <span>Check their profile to see if your skills complement each other</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">✓</span>
                    <span>Start with a friendly message introducing yourself</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">✓</span>
                    <span>Discuss expectations and time commitment early</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">✓</span>
                    <span>Consider a video call to see if you're a good fit</span>
                </div>
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