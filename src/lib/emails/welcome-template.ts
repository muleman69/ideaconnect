export const getWelcomeEmailTemplate = (name: string = 'there') => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to IdeaConnect</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
            padding: 40px 32px;
            text-align: center;
        }
        
        .logo {
            color: white;
            font-size: 28px;
            font-weight: 700;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo-icon {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        
        .content {
            padding: 48px 32px;
        }
        
        .greeting {
            font-size: 32px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 24px;
        }
        
        .intro {
            font-size: 18px;
            color: #64748B;
            margin-bottom: 48px;
            line-height: 1.7;
        }
        
        .intro p {
            margin-bottom: 16px;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 32px;
        }
        
        .action-item {
            background: #F0F9FF;
            border: 1px solid #E0F2FE;
            border-radius: 8px;
            padding: 32px;
            margin-bottom: 24px;
        }
        
        .action-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
        }
        
        .action-emoji {
            width: 48px;
            height: 48px;
            background: #3B82F6;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
        }
        
        .action-title {
            font-size: 20px;
            font-weight: 700;
            color: #1E293B;
            margin: 0;
        }
        
        .action-description {
            font-size: 16px;
            color: #64748B;
            margin: 0 0 24px 0;
            line-height: 1.6;
        }
        
        .btn {
            display: inline-block;
            padding: 14px 28px;
            background: #3B82F6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
        
        .btn:hover {
            background: #2563EB;
        }
        
        .checklist {
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 32px;
            margin-bottom: 48px;
        }
        
        .checklist-item {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 16px;
            font-size: 16px;
            color: #374151;
        }
        
        .checklist-item:last-child {
            margin-bottom: 0;
        }
        
        .checkbox {
            width: 24px;
            height: 24px;
            background: #3B82F6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 14px;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .closing {
            background: #FEF9C3;
            border: 1px solid #FDE047;
            border-radius: 8px;
            padding: 32px;
            margin-top: 48px;
        }
        
        .closing p {
            font-size: 16px;
            color: #92400E;
            margin-bottom: 16px;
            line-height: 1.6;
        }
        
        .closing .signature {
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 0;
        }
        
        .closing .ps {
            font-style: italic;
            color: #A16207;
            border-top: 1px solid #FDE047;
            padding-top: 16px;
            margin-top: 24px;
            margin-bottom: 0;
        }
        
        .footer {
            background: #1E293B;
            color: white;
            padding: 48px 32px;
            text-align: center;
        }
        
        .footer-brand {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .footer-tagline {
            font-size: 16px;
            color: #94A3B8;
            margin-bottom: 32px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-bottom: 32px;
        }
        
        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background: #374151;
            border-radius: 12px;
            text-decoration: none;
            color: white;
            font-size: 20px;
        }
        
        .social-link:hover {
            background: #3B82F6;
        }
        
        .footer-links {
            font-size: 14px;
            color: #94A3B8;
            padding-top: 24px;
            border-top: 1px solid #374151;
        }
        
        .footer-links a {
            color: #94A3B8;
            text-decoration: none;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        @media (max-width: 600px) {
            .header {
                padding: 32px 24px;
            }
            
            .content {
                padding: 32px 24px;
            }
            
            .footer {
                padding: 32px 24px;
            }
            
            .greeting {
                font-size: 28px;
            }
            
            .intro {
                font-size: 16px;
            }
            
            .section-title {
                font-size: 20px;
            }
            
            .action-item {
                padding: 24px;
            }
            
            .action-header {
                flex-direction: column;
                text-align: center;
                gap: 12px;
            }
            
            .btn {
                width: 100%;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="logo">
                <div class="logo-icon">💡</div>
                IdeaConnect
            </a>
        </div>
        
        <!-- Content -->
        <div class="content">
            <h1 class="greeting">Hi ${name},</h1>
            
            <div class="intro">
                <p>Welcome to IdeaConnect - where entrepreneurs come together to transform ideas into thriving businesses!</p>
                <p>We're thrilled you've joined our community of builders, dreamers, and doers. You're now part of a movement that's changing how startups get built.</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Here's What You Can Do Right Now:</h2>
                
                <div class="action-item">
                    <div class="action-header">
                        <div class="action-emoji">✨</div>
                        <h3 class="action-title">Browse Today's Ideas</h3>
                    </div>
                    <p class="action-description">Discover the latest startup ideas from IdeaBrowser and join discussions with fellow entrepreneurs who share your interests.</p>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/ideas" class="btn">Explore Ideas</a>
                </div>
                
                <div class="action-item">
                    <div class="action-header">
                        <div class="action-emoji">🤝</div>
                        <h3 class="action-title">Complete Your Profile</h3>
                    </div>
                    <p class="action-description">Add your skills, interests, and what you're looking for. The more complete your profile, the better matches you'll find.</p>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile" class="btn">Complete Profile</a>
                </div>
                
                <div class="action-item">
                    <div class="action-header">
                        <div class="action-emoji">💬</div>
                        <h3 class="action-title">Join the Conversation</h3>
                    </div>
                    <p class="action-description">Jump into idea discussions, share your insights, and connect with potential co-founders.</p>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">Join Discussions</a>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Your First Week Checklist:</h2>
                <div class="checklist">
                    <div class="checklist-item">
                        <div class="checkbox">✓</div>
                        <span>Set up your profile with skills and interests</span>
                    </div>
                    <div class="checklist-item">
                        <div class="checkbox">✓</div>
                        <span>Browse and bookmark 3 ideas that excite you</span>
                    </div>
                    <div class="checklist-item">
                        <div class="checkbox">✓</div>
                        <span>Comment on at least one idea discussion</span>
                    </div>
                    <div class="checklist-item">
                        <div class="checkbox">✓</div>
                        <span>Connect with 2 entrepreneurs with complementary skills</span>
                    </div>
                </div>
            </div>
            
            <div class="closing">
                <p>Remember, every successful company started with people just like you taking that first step. Whether you're technical, creative, or business-minded, there's a perfect match waiting for you here.</p>
                <p>Questions? Reply to this email - we're here to help!</p>
                <p class="signature">Let's build something incredible together,<br><strong>The IdeaConnect Team</strong></p>
                <p class="ps">P.S. Pro tip: The best collaborations happen when you're active in discussions. Don't be shy - your next co-founder might be one conversation away!</p>
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
}