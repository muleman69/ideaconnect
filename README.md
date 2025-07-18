# IdeaConnect - Where Innovation Meets Collaboration

A collaborative platform for entrepreneurs to discover daily startup ideas from IdeaBrowser.com, find co-founders, and build successful ventures together.

## Features

- 🚀 **Daily Startup Ideas**: Automatically syncs fresh ideas from IdeaBrowser.com
- 👥 **Team Formation**: Find teammates interested in the same ideas
- 💡 **Interest Tracking**: "Raise your hand" for ideas you want to build  
- 📧 **Email Notifications**: Weekly digests and team invitations
- 🔒 **Secure Authentication**: Powered by Supabase

## Quick Setup

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Database
DATABASE_URL=your_postgresql_database_url_here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# SendGrid Email Configuration (optional)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=support@ideaconnect.co
SENDGRID_FROM_NAME=IdeaConnect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Key Configuration Steps

### Supabase Setup
1. Create a Supabase project
2. Get your project URL and anon key from Settings > API
3. Create a service role key with appropriate permissions
4. Add the values to your `.env.local`

### Database Setup
- Use Supabase's built-in PostgreSQL or external PostgreSQL
- Set `DATABASE_URL` to your database connection string
- Run `npx prisma db push` to create tables

### Email Setup (Optional)
- Create a SendGrid account for email functionality
- Add API key to enable welcome emails and notifications

## Daily Idea Sync

The platform automatically syncs new startup ideas from IdeaBrowser.com:
- **Scheduled**: Daily at 7:15 AM EST
- **Manual**: Visit `/api/sync/ideabrowser` or click "Sync New Ideas" on homepage

## Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run type-check   # TypeScript validation
npm run lint         # ESLint validation
```

## Learn More

- [Project Documentation](./IDEABROWSER_INTEGRATION.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
# Updated Fri Jul 18 00:26:39 PDT 2025
