# IdeaConnect Project Rules

## Project Overview
IdeaConnect is a collaborative platform for entrepreneurs to share ideas, find co-founders, and build successful ventures together. This platform facilitates meaningful connections between innovators and provides tools for project collaboration.

## Development Guidelines

### Tech Stack
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM
- **Authentication**: Clerk
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Form Management**: React Hook Form + Zod

### Code Standards
- Use TypeScript for all components and utilities
- Follow Next.js App Router conventions
- Implement proper error handling and loading states
- Use Zod schemas for all form validations
- Maintain consistent component structure and naming
- Write clean, readable code with proper JSDoc comments
- Use Tailwind CSS for styling with semantic class names

### Project Structure
```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and configurations
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

### Development Workflow
1. Always run linting and type checking before committing
2. Use meaningful commit messages
3. Test all features thoroughly
4. Ensure responsive design on all screens
5. Follow accessibility best practices

### Authentication & Security
- Use Clerk for user authentication
- Implement proper route protection
- Validate all user inputs
- Follow security best practices for API routes

### Database
- Use Prisma for database operations
- Write migrations for schema changes
- Use proper relationships and constraints
- Implement soft deletes where appropriate

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create and apply migrations