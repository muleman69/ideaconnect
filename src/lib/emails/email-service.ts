import sgMail from '@sendgrid/mail';
import { getWelcomeEmailTemplate } from './welcome-template';
import { getVerificationEmailTemplate } from './verification-template';

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

export class EmailService {
  private static instance: EmailService;
  private readonly fromEmail: string;
  private readonly fromName: string;

  private constructor() {
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@ideaconnect.com';
    this.fromName = process.env.SENDGRID_FROM_NAME || 'IdeaConnect Team';
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

  public async sendCustomEmail(options: EmailOptions): Promise<boolean> {
    return this.sendEmail(options);
  }
}

export const emailService = EmailService.getInstance();