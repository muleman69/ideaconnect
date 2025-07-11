export const getVerificationEmailTemplate = (verificationUrl: string, name: string = 'there') => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Verify Your IdeaConnect Account</title>
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
            text-align: center;
        }
        
        .verification-icon {
            width: 80px;
            height: 80px;
            background: #F0F9FF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            font-size: 40px;
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
        
        .verify-btn {
            display: inline-block;
            padding: 16px 32px;
            background: #3B82F6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: background-color 0.3s ease;
        }
        
        .verify-btn:hover {
            background: #2563EB;
        }
        
        .manual-link {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: left;
        }
        
        .manual-link p {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 10px;
        }
        
        .manual-link code {
            background: #E2E8F0;
            padding: 2px 4px;
            border-radius: 4px;
            font-size: 12px;
            word-break: break-all;
        }
        
        .security-note {
            background: #FEF3C7;
            border: 1px solid #F59E0B;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .security-note p {
            font-size: 14px;
            color: #92400E;
            margin-bottom: 10px;
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
            
            .greeting {
                font-size: 20px;
            }
            
            .verify-btn {
                padding: 14px 28px;
                font-size: 14px;
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
            <div class="verification-icon">
                🔐
            </div>
            
            <div class="greeting">Verify Your Email Address</div>
            
            <div class="intro">
                <p>Hi ${name},</p>
                <p>Thanks for signing up for IdeaConnect! We need to verify your email address to complete your account setup and ensure the security of your account.</p>
            </div>
            
            <a href="${verificationUrl}" class="verify-btn">Verify My Email Address</a>
            
            <div class="manual-link">
                <p><strong>Having trouble clicking the button?</strong></p>
                <p>Copy and paste this link into your browser:</p>
                <code>${verificationUrl}</code>
            </div>
            
            <div class="security-note">
                <p><strong>Security Note:</strong></p>
                <p>This verification link will expire in 24 hours for security purposes. If you didn't create an account with IdeaConnect, please ignore this email.</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #64748B;">
                Once verified, you'll be able to access all of IdeaConnect's features and start connecting with fellow entrepreneurs!
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-brand">IdeaConnect</div>
            <div class="footer-tagline">Where Innovation Meets Collaboration</div>
            
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