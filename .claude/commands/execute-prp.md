# Execute Product Requirements Page (PRP)

## Purpose
This command executes the implementation of a feature based on its Product Requirements Page (PRP).

## Usage
After a PRP has been generated and approved, use this command to implement the feature following the specifications.

## Execution Process

### 1. Pre-Implementation Setup
- Review the PRP document thoroughly
- Verify all dependencies are met
- Check current codebase state
- Create feature branch (if using git)

### 2. Database Changes
- Update Prisma schema if needed
- Create and run migrations
- Seed test data if required
- Update database types

### 3. Backend Implementation
- Create API routes
- Implement business logic
- Add error handling
- Add validation with Zod schemas
- Write API documentation

### 4. Frontend Implementation
- Create necessary components
- Implement forms with React Hook Form
- Add proper loading states
- Handle error states
- Ensure responsive design
- Add accessibility features

### 5. Testing
- Write unit tests for utilities
- Create integration tests for API routes
- Add component tests
- Perform manual testing
- Test edge cases

### 6. Code Quality
- Run linting and type checking
- Ensure code follows project standards
- Add proper JSDoc comments
- Review for security issues

### 7. Documentation
- Update relevant documentation
- Add usage examples
- Update API documentation
- Create user guides if needed

## Verification Checklist
- [ ] All acceptance criteria met
- [ ] Code follows project standards
- [ ] Tests pass
- [ ] No TypeScript errors
- [ ] Responsive design works
- [ ] Accessibility requirements met
- [ ] Performance benchmarks met
- [ ] Error handling implemented
- [ ] Documentation updated

## Example Command Usage
```
Execute the PRP for user messaging system, implementing all backend APIs, frontend components, and testing as specified.
```

This will implement the feature according to IdeaConnect's technical standards and the specific requirements outlined in the PRP.