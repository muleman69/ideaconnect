import sgMail from '@sendgrid/mail';
import { getWelcomeEmailTemplate } from './welcome-template';
import { getVerificationEmailTemplate } from './verification-template';
import { getIdeaMatchTemplate, type IdeaMatchData } from './idea-match-template';
import { getWeeklyDigestTemplate, type WeeklyDigestData } from './weekly-digest-template';
import { getTeamInvitationTemplate, type TeamInvitationData } from './team-invitation-template';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface WelcomeEmailData {
  email: string;
  name?: string;
}

export interface VerificationEmailData {
  email: string;
  name?: string;
  verificationUrl: string;
}

export interface IdeaMatchEmailData {
  email: string;
  recipientName?: string;
  matchData: IdeaMatchData;
}

export interface WeeklyDigestEmailData {
  email: string;
  digestData: WeeklyDigestData;
}

export interface TeamInvitationEmailData {
  email: string;
  recipientName?: string;
  invitationData: TeamInvitationData;
}

export class EmailService {
  private static instance: EmailService;
  private readonly fromEmail: string;
  private readonly fromName: string;

  private constructor() {
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'support@ideaconnect.co';
    this.fromName = process.env.SENDGRID_FROM_NAME || 'IdeaConnect';
    
    // Log configuration for debugging
    console.log('Email service initialized with:');
    console.log(`From Name: ${this.fromName}`);
    console.log(`From Email: ${this.fromEmail}`);
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.warn('SendGrid API key not configured - email not sent');
        return false;
      }

      const msg = {
        to: options.to,
        from: {
          email: this.fromEmail,
          name: this.fromName,
        },
        subject: options.subject,
        html: options.html,
        text: options.text || this.htmlToText(options.html),
      };

      console.log(`Sending email from: ${this.fromName} <${this.fromEmail}>`);
      await sgMail.send(msg);
      console.log(`Email sent successfully to ${options.to}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  private htmlToText(html: string): string {
    // Simple HTML to text conversion - strips HTML tags
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  }

  public async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    const subject = 'Welcome to IdeaConnect - Your Journey to Building Something Amazing Starts Now! 🚀';
    const html = getWelcomeEmailTemplate(data.name);

    return this.sendEmail({
      to: data.email,
      subject,
      html,
    });
  }

  public async sendVerificationEmail(data: VerificationEmailData): Promise<boolean> {
    const subject = 'Verify Your IdeaConnect Account';
    const html = getVerificationEmailTemplate(data.verificationUrl, data.name);

    return this.sendEmail({
      to: data.email,
      subject,
      html,
    });
  }

  public async sendIdeaMatchEmail(data: IdeaMatchEmailData): Promise<boolean> {
    const subject = `🎯 New Match: ${data.matchData.matcherName} wants to collaborate on ${data.matchData.ideaName}`;
    const html = getIdeaMatchTemplate(data.matchData, data.recipientName);

    return this.sendEmail({
      to: data.email,
      subject,
      html,
    });
  }

  public async sendWeeklyDigestEmail(data: WeeklyDigestEmailData): Promise<boolean> {
    const subject = `Your Weekly IdeaConnect Digest - ${data.digestData.hotIdeas.length} Hot Ideas & ${data.digestData.potentialMatches.length} Potential Matches`;
    const html = getWeeklyDigestTemplate(data.digestData);

    return this.sendEmail({
      to: data.email,
      subject,
      html,
    });
  }

  public async sendTeamInvitationEmail(data: TeamInvitationEmailData): Promise<boolean> {
    const subject = `You've been invited to join Team ${data.invitationData.teamName}`;
    const html = getTeamInvitationTemplate(data.invitationData, data.recipientName);

    return this.sendEmail({
      to: data.email,
      subject,
      html,
    });
  }

  public async sendCustomEmail(options: EmailOptions): Promise<boolean> {
    return this.sendEmail(options);
  }
}

export const emailService = EmailService.getInstance();