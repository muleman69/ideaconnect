# AI Assistant Guidelines for IdeaConnect

## 🎯 Purpose
This document ensures consistent development practices and prevents breaking changes when working with different AI assistants on the IdeaConnect project.

## 📜 Mandatory Reading
Before making ANY changes, read:
1. `PROJECT_STATE.md` - Current project status and constraints
2. `CLAUDE.md` - Technical standards and patterns
3. This file - Development guidelines

## 🚨 Critical Rules (NEVER BREAK)

### 1. Always Assess Current State
Before suggesting changes:
- Read existing code to understand current patterns
- Check if similar functionality already exists
- Understand the data flow and dependencies
- Verify authentication requirements

### 2. Maintain Consistency
- Follow existing naming conventions
- Use established error handling patterns
- Maintain existing API response formats
- Keep consistent styling approaches

### 3. Preserve Working Features
- Never remove working functionality
- Don't change database schemas without migrations
- Don't break existing component interfaces
- Don't modify authentication flows

## 🔧 Development Patterns (FOLLOW THESE)

### API Route Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError, validateRequiredFields } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    validateRequiredFields(data, ['field1', 'field2']);
    
    // Your logic here
    logger.info('Operation completed', { context: data });
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return handleApiError(error, 'operation-name');
  }
}
```

### Component Pattern
```typescript
'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  // Define props with TypeScript
}

export function Component({ prop }: ComponentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use consistent error handling
  const handleAction = async () => {
    try {
      setLoading(true);
      setError(null);
      // Your logic here
    } catch (err) {
      logger.error('Component action failed', err as Error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <Button onClick={handleAction} disabled={loading}>
        {loading ? 'Loading...' : 'Action'}
      </Button>
    </div>
  );
}
```

### Database Query Pattern
```typescript
import { prisma } from '@/lib/prisma';
import { AppError } from '@/lib/error-handler';

// Always handle database errors
try {
  const result = await prisma.model.findMany({
    where: { /* conditions */ },
    include: { /* relations */ },
  });
  
  if (!result) {
    throw new AppError('Resource not found', 404);
  }
  
  return result;
} catch (error) {
  if (error instanceof AppError) throw error;
  throw new AppError('Database operation failed', 500);
}
```

## 🛡️ Security Guidelines

### Authentication Checks
```typescript
// Always verify user authentication in protected routes
const supabase = createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  throw new AppError('Authentication required', 401);
}
```

### Input Validation
```typescript
// Always validate user inputs
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

const validatedData = schema.parse(inputData);
```

## 📊 Database Guidelines

### Migration Rules
- Always create migrations for schema changes
- Never modify existing migrations
- Test migrations on development database first
- Include rollback plans for breaking changes

### Query Optimization
- Use `include` for necessary relations only
- Implement pagination for large datasets
- Add database indexes for frequently queried fields
- Use transactions for multi-table operations

## 🎨 UI/UX Guidelines

### Component Standards
- Use Shadcn/UI components consistently
- Implement loading states for all async operations
- Show error messages clearly to users
- Ensure responsive design (mobile-first)

### Styling Rules
- Use Tailwind utility classes
- Follow established color scheme
- Maintain consistent spacing and typography
- Test on multiple screen sizes

## 🧪 Testing Requirements

### Before Implementation
- Test existing functionality still works
- Verify new features work as expected
- Check responsive design
- Test error scenarios

### API Testing
- Test all HTTP methods and status codes
- Verify authentication requirements
- Test with invalid/missing data
- Check rate limiting if applicable

## 📱 Feature Development Process

### 1. Planning Phase
- Understand the user requirement
- Check if feature already exists
- Review existing codebase for patterns
- Plan database changes if needed

### 2. Implementation Phase
- Follow established patterns
- Write tests for new functionality
- Implement proper error handling
- Add logging for debugging

### 3. Validation Phase
- Test all user flows
- Verify responsive design
- Check performance impact
- Validate security measures

## 🚫 Common Mistakes to Avoid

### DON'T:
- Delete or modify existing files without understanding their purpose
- Change API endpoints without checking all consumers
- Remove error handling or logging
- Skip TypeScript type definitions
- Ignore responsive design requirements
- Break authentication flows
- Modify database schemas without migrations

### DO:
- Read existing code before making changes
- Test changes thoroughly
- Follow established patterns
- Ask for clarification when uncertain
- Document complex logic
- Use proper Git commit messages

## 🆘 When to Ask for Help

### Always ask before:
- Making breaking changes to existing APIs
- Modifying authentication or security features
- Changing database schemas
- Adding new dependencies
- Modifying build or deployment configuration

### Provide context when asking:
- What you're trying to accomplish
- What you've already tried
- Any error messages or issues encountered
- Impact on existing functionality

This document should be consulted for every development session to ensure consistency and prevent rogue behaviors. 