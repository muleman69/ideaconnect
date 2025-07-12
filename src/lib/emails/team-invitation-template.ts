export interface TeamInvitationData {
  inviterName: string;
  inviterEmail: string;
  teamName: string;
  teamDescription: string;
  role: string;
  projectDescription?: string;
  teamMembers: Array<{
    name: string;
    role: string;
    skills: string[];
  }>;
  invitationUrl: string;
  inviterProfileUrl: string;
  personalMessage?: string;
}

export const getTeamInvitationTemplate = (data: TeamInvitationData, recipientName: string = 'there') => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Team Invitation - ${data.teamName}</title>
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
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
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
        
        .invitation-badge {
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
        
        .invitation-card {
            background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
            border: 1px solid #10B981;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }
        
        .invitation-card::before {
            content: '🎉';
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            opacity: 0.7;
        }
        
        .inviter-info {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .inviter-avatar {
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
        
        .inviter-details h3 {
            font-size: 18px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 5px;
        }
        
        .inviter-details p {
            font-size: 14px;
            color: #065F46;
        }
        
        .team-info {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
        }
        
        .team-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .team-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            flex-shrink: 0;
        }
        
        .team-details h2 {
            font-size: 20px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 5px;
        }
        
        .team-role {
            background: #F0FDF4;
            color: #166534;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
        }
        
        .team-description {
            font-size: 14px;
            color: #64748B;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .project-info {
            background: #F8FAFC;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        .project-label {
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }
        
        .project-text {
            font-size: 14px;
            color: #64748B;
        }
        
        .team-members {
            margin-top: 20px;
        }
        
        .members-label {
            font-size: 14px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 15px;
        }
        
        .member-card {
            background: #F9FAFB;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .member-avatar {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .member-info {
            flex: 1;
        }
        
        .member-name {
            font-size: 14px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 5px;
        }
        
        .member-role {
            font-size: 12px;
            color: #6B7280;
            margin-bottom: 8px;
        }
        
        .member-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
        }
        
        .skill-tag {
            background: #EFF6FF;
            color: #1E40AF;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 500;
        }
        
        .personal-message {
            background: #F0F9FF;
            border: 1px solid #E0F2FE;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
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
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            text-decoration: none;
            transition: all 0.3s ease;
            text-align: center;
            min-width: 140px;
        }
        
        .btn-primary {
            background: #10B981;
            color: white;
        }
        
        .btn-primary:hover {
            background: #059669;
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
        
        .benefits-section {
            background: #FFFBEB;
            border: 1px solid #F59E0B;
            border-radius: 12px;
            padding: 25px;
            margin-top: 30px;
        }
        
        .benefits-title {
            font-size: 16px;
            font-weight: 600;
            color: #92400E;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .benefit-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            color: #A16207;
        }
        
        .benefit-icon {
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .expiry-notice {
            background: #FEF2F2;
            border: 1px solid #FCA5A5;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            text-align: center;
        }
        
        .expiry-text {
            font-size: 12px;
            color: #B91C1C;
            margin-bottom: 5px;
        }
        
        .expiry-time {
            font-size: 14px;
            font-weight: 600;
            color: #991B1B;
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
            background: #10B981;
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
                max-width: 250px;
            }
            
            .inviter-info {
                flex-direction: column;
                text-align: center;
            }
            
            .team-header {
                flex-direction: column;
                text-align: center;
            }
            
            .member-card {
                flex-direction: column;
                text-align: center;
            }
            
            .member-skills {
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c0 1.3-.2 2.5-.5 3.7a10.5 10.5 0 0 1-1.9 3.1 10.5 10.5 0 0 1-3.1 1.9c-1.2.3-2.4.5-3.7.5s-2.5-.2-3.7-.5a10.5 10.5 0 0 1-3.1-1.9 10.5 10.5 0 0 1-1.9-3.1c-.3-1.2-.5-2.4-.5-3.7s.2-2.5.5-3.7a10.5 10.5 0 0 1 1.9-3.1 10.5 10.5 0 0 1 3.1-1.9c1.2-.3 2.4-.5 3.7-.5s2.5.2 3.7.5a10.5 10.5 0 0 1 3.1 1.9 10.5 10.5 0 0 1 1.9 3.1c.3 1.2.5 2.4.5 3.7z"></path>
                    </svg>
                </div>
                IdeaConnect
            </a>
            <div class="invitation-badge">🎉 Team Invitation</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hi ${recipientName},</div>
            
            <div class="intro">
                <p>Exciting news! You've been invited to join a team that's building something amazing. Here are the details:</p>
            </div>
            
            <div class="invitation-card">
                <div class="inviter-info">
                    <div class="inviter-avatar">
                        ${data.inviterName.charAt(0).toUpperCase()}
                    </div>
                    <div class="inviter-details">
                        <h3>${data.inviterName}</h3>
                        <p>has invited you to join their team</p>
                    </div>
                </div>
                
                <div class="team-info">
                    <div class="team-header">
                        <div class="team-icon">
                            👥
                        </div>
                        <div class="team-details">
                            <h2>${data.teamName}</h2>
                            <div class="team-role">Role: ${data.role}</div>
                        </div>
                    </div>
                    
                    <div class="team-description">${data.teamDescription}</div>
                    
                    ${data.projectDescription ? `
                    <div class="project-info">
                        <div class="project-label">Project Details</div>
                        <div class="project-text">${data.projectDescription}</div>
                    </div>
                    ` : ''}
                    
                    <div class="team-members">
                        <div class="members-label">Meet Your Future Teammates:</div>
                        ${data.teamMembers.map(member => `
                        <div class="member-card">
                            <div class="member-avatar">
                                ${member.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="member-info">
                                <div class="member-name">${member.name}</div>
                                <div class="member-role">${member.role}</div>
                                <div class="member-skills">
                                    ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                
                ${data.personalMessage ? `
                <div class="personal-message">
                    <div class="message-label">Personal Message from ${data.inviterName}:</div>
                    <div class="message-text">"${data.personalMessage}"</div>
                </div>
                ` : ''}
            </div>
            
            <div class="action-buttons">
                <a href="${data.invitationUrl}" class="btn btn-primary">Accept Invitation</a>
                <a href="${data.inviterProfileUrl}" class="btn btn-secondary">View Profile</a>
            </div>
            
            <div class="benefits-section">
                <div class="benefits-title">
                    <span>🌟</span>
                    <span>Why Join This Team?</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🚀</span>
                    <span>Work on an exciting project with passionate entrepreneurs</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🎯</span>
                    <span>Contribute your unique skills to a focused team</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📈</span>
                    <span>Gain valuable experience and expand your network</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">💡</span>
                    <span>Turn ideas into reality with like-minded innovators</span>
                </div>
            </div>
            
            <div class="expiry-notice">
                <div class="expiry-text">This invitation expires in:</div>
                <div class="expiry-time">7 days</div>
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