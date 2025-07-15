# IdeaConnect - Current Project State & Guidelines

## 🚨 CRITICAL: READ THIS FIRST
This document prevents "rogue AI assistant" issues by clearly defining the current project state, constraints, and development guidelines. **NEVER** make changes that contradict this documentation without explicit user approval.

## 📊 Project Status: PRODUCTION READY
- **Domain**: ideaconnect.co (purchased, ready to connect)
- **Stage**: Pre-launch (final feature additions ongoing)
- **Deployment Target**: Vercel
- **Database**: Production-ready Supabase setup

## 🏗️ Confirmed Architecture (DO NOT CHANGE)

### Tech Stack (LOCKED)
- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript (strict mode)
- **Database**: Prisma ORM + Supabase PostgreSQL
- **Authentication**: Supabase Auth (configured)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Email**: SendGrid (configured)
- **Deployment**: Vercel

### Core Features (IMPLEMENTED)
1. ✅ **User Authentication** - Supabase Auth with email/password
2. ✅ **Daily Idea Sync** - Automated scraping from IdeaBrowser.com
3. ✅ **Interest Tracking** - Users can "raise hand" for ideas
4. ✅ **Team Formation** - Find others interested in same ideas
5. ✅ **Email System** - Welcome emails, notifications via SendGrid
6. ✅ **Responsive UI** - Mobile-friendly design with Tailwind

### Database Schema (STABLE)
```sql
- users (auth + profile data)
- ideas (scraped from IdeaBrowser)
- interests (user-idea relationships)  
- connections (user networking)
- messages (user communication)
- teams & discussions (collaboration)
```

## 🔒 Development Constraints (NEVER VIOLATE)

### 1. Database Rules
- **NEVER** delete or modify existing migrations
- **ALWAYS** create new migrations for schema changes
- **NEVER** change existing column types without migration
- **PRESERVE** all existing relationships and foreign keys

### 2. Authentication Rules  
- **NEVER** change Supabase auth configuration
- **NEVER** modify user table structure without migration
- **PRESERVE** existing middleware.ts authentication flow
- **MAINTAIN** RLS policies if implemented

### 3. API Route Rules
- **NEVER** change existing API endpoint URLs
- **NEVER** break existing request/response formats
- **ALWAYS** maintain backward compatibility
- **PRESERVE** existing error handling patterns

### 4. Component Rules
- **NEVER** change existing component prop interfaces
- **NEVER** remove existing components without replacement
- **MAINTAIN** Tailwind styling approach
- **PRESERVE** responsive design patterns

## 🚀 Production Configuration

### Environment Variables (Required)
```bash
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Database (REQUIRED)
DATABASE_URL=postgresql://connection_string

# Application (REQUIRED)
NEXT_PUBLIC_APP_URL=https://ideaconnect.co

# SendGrid (REQUIRED for emails)
SENDGRID_API_KEY=your_key
SENDGRID_FROM_EMAIL=support@ideaconnect.co
SENDGRID_FROM_NAME=IdeaConnect
```

### Production Checklist
- [x] Remove development shortcuts from next.config.ts
- [x] Implement proper logging system
- [x] Add production error handling
- [x] Protect development routes
- [ ] Configure domain on Vercel
- [ ] Test all email functionality
- [ ] Verify Supabase auth redirects with new domain

## 🎯 Current Development Goals

### Next Features to Implement
1. **Enhanced Team Formation** - Better matching algorithms
2. **Direct Messaging** - In-app communication system
3. **Project Management** - Tools for teams to collaborate
4. **Skill Matching** - Find teammates by complementary skills
5. **Idea Analytics** - Track popularity and trends

### Known Technical Debt
- Console.log statements being migrated to new logger system
- Email templates could use more styling improvements
- Loading states could be more consistent

## 🚫 What NOT to Do

### NEVER:
- Change the core idea-centric concept
- Remove IdeaBrowser.com integration
- Change authentication from Supabase
- Modify database schema without migrations
- Remove existing API endpoints
- Change the Tailwind + Shadcn/UI approach
- Break responsive design
- Remove TypeScript or make it optional

### ALWAYS ASK BEFORE:
- Adding new dependencies
- Changing build configuration
- Modifying middleware
- Changing email templates
- Adding new database tables
- Changing existing component interfaces

## 📞 Integration Points (CRITICAL)

### IdeaBrowser.com Sync
- **URL**: Daily scraping from ideabrowser.com
- **Schedule**: Daily at 7:15 AM EST via cron
- **Data**: Title, description, category, difficulty
- **Status**: Working and tested

### Supabase Auth
- **Setup**: Complete with user webhooks
- **Tables**: Users synced via auth triggers
- **Status**: Production ready

### SendGrid Email
- **Templates**: Welcome, verification, digest, invitations
- **Status**: Configured and tested
- **Domain**: Needs verification for ideaconnect.co

## 🔄 Deployment Process

### Vercel Setup
1. Connect GitHub repository
2. Configure environment variables
3. Set build command: `npm run build`
4. Set output directory: `out` (if using static export)
5. Add domain: ideaconnect.co

### Domain Configuration
1. Point Namecheap DNS to Vercel
2. Configure SSL (automatic with Vercel)
3. Update Supabase auth URLs
4. Update SendGrid domain verification

## 📋 Testing Checklist

### Before Deployment
- [ ] All TypeScript builds without errors
- [ ] All API routes return expected responses
- [ ] Authentication flow works end-to-end
- [ ] Email sending works with production domains
- [ ] IdeaBrowser sync runs successfully
- [ ] Database migrations apply cleanly
- [ ] Responsive design works on all screen sizes

This document should be updated whenever significant changes are made to the project. 