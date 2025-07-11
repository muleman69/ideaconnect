export const getWelcomeEmailTemplate = (name: string = 'there') => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to IdeaConnect</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
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
            background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
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
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .action-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 25px;
            padding: 20px;
            background: #F8FAFC;
            border-radius: 12px;
            border-left: 4px solid #3B82F6;
        }
        
        .action-emoji {
            font-size: 20px;
            flex-shrink: 0;
        }
        
        .action-content h3 {
            font-size: 16px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 5px;
        }
        
        .action-content p {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 15px;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #3B82F6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }
        
        .btn:hover {
            background: #2563EB;
        }
        
        .checklist {
            background: #F0F9FF;
            border: 1px solid #E0F2FE;
            border-radius: 12px;
            padding: 25px;
        }
        
        .checklist-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            color: #475569;
        }
        
        .checkbox {
            width: 18px;
            height: 18px;
            border: 2px solid #3B82F6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .closing {
            background: #FFF7ED;
            border: 1px solid #FDBA74;
            border-radius: 12px;
            padding: 25px;
            margin-top: 30px;
        }
        
        .closing p {
            font-size: 14px;
            color: #92400E;
            margin-bottom: 10px;
        }
        
        .closing .signature {
            font-weight: 600;
            color: #1E293B;
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
            background: #3B82F6;
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
            
            .action-item {
                flex-direction: column;
                gap: 10px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .social-links {
                flex-wrap: wrap;
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c0 1.3-.2 2.5-.5 3.7a10.5 10.5 0 0 1-1.9 3.1 10.5 10.5 0 0 1-3.1 1.9c-1.2.3-2.4.5-3.7.5s-2.5-.2-3.7-.5a10.5 10.5 0 0 1-3.1-1.9 10.5 10.5 0 0 1-1.9-3.1c-.3-1.2-.5-2.4-.5-3.7s.2-2.5.5-3.7a10.5 10.5 0 0 1 1.9-3.1 10.5 10.5 0 0 1 3.1-1.9c1.2-.3 2.4-.5 3.7-.5s2.5.2 3.7.5a10.5 10.5 0 0 1 3.1 1.9 10.5 10.5 0 0 1 1.9 3.1c.3 1.2.5 2.4.5 3.7z"></path>
                    </svg>
                </div>
                IdeaConnect
            </a>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hi ${name},</div>
            
            <div class="intro">
                <p>Welcome to IdeaConnect - where entrepreneurs come together to transform ideas into thriving businesses!</p>
                <p>We're thrilled you've joined our community of builders, dreamers, and doers. You're now part of a movement that's changing how startups get built.</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Here's What You Can Do Right Now:</h2>
                
                <div class="action-item">
                    <div class="action-emoji">✨</div>
                    <div class="action-content">
                        <h3>Browse Today's Ideas</h3>
                        <p>Discover the latest startup ideas from IdeaBrowser and join discussions with fellow entrepreneurs who share your interests.</p>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/ideas" class="btn">Explore Ideas</a>
                    </div>
                </div>
                
                <div class="action-item">
                    <div class="action-emoji">🤝</div>
                    <div class="action-content">
                        <h3>Complete Your Profile</h3>
                        <p>Add your skills, interests, and what you're looking for. The more complete your profile, the better matches you'll find.</p>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile" class="btn">Complete Profile</a>
                    </div>
                </div>
                
                <div class="action-item">
                    <div class="action-emoji">💬</div>
                    <div class="action-content">
                        <h3>Join the Conversation</h3>
                        <p>Jump into idea discussions, share your insights, and connect with potential co-founders.</p>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">Join Discussions</a>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Your First Week Checklist:</h2>
                <div class="checklist">
                    <div class="checklist-item">
                        <div class="checkbox">□</div>
                        <span>Set up your profile with skills and interests</span>
                    </div>
                    <div class="checklist-item">
                        <div class="checkbox">□</div>
                        <span>Browse and bookmark 3 ideas that excite you</span>
                    </div>
                    <div class="checklist-item">
                        <div class="checkbox">□</div>
                        <span>Comment on at least one idea discussion</span>
                    </div>
                    <div class="checklist-item">
                        <div class="checkbox">□</div>
                        <span>Connect with 2 entrepreneurs with complementary skills</span>
                    </div>
                </div>
            </div>
            
            <div class="closing">
                <p>Remember, every successful company started with people just like you taking that first step. Whether you're technical, creative, or business-minded, there's a perfect match waiting for you here.</p>
                <p>Questions? Reply to this email - we're here to help!</p>
                <p class="signature">Let's build something incredible together,<br><strong>The IdeaConnect Team</strong></p>
                <p style="margin-top: 20px; font-style: italic; color: #B45309;">P.S. Pro tip: The best collaborations happen when you're active in discussions. Don't be shy - your next co-founder might be one conversation away!</p>
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