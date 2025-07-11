# IdeaConnect MVP Requirements

## Core Features for Initial Launch

### 1. User Authentication & Profiles
- **User Registration/Login** via Clerk
- **Profile Creation** with:
  - Basic info (name, email, location)
  - Skills and expertise
  - Bio/description
  - Profile picture upload
  - LinkedIn/social links
- **Profile Editing** capabilities

### 2. Idea Management System
- **Create Ideas** with:
  - Title and description
  - Category/industry selection
  - Required skills/roles
  - Stage of development
  - Equity/compensation details
- **Browse Ideas** with:
  - Search and filtering
  - Category browsing
  - Saved/bookmarked ideas
- **Idea Details Page** with:
  - Full description
  - Creator profile
  - Required team roles
  - Contact/interest buttons

### 3. Connection System
- **Express Interest** in ideas
- **Direct Messaging** between users
- **Match Suggestions** based on:
  - Skills alignment
  - Location proximity
  - Industry interest
- **Connection Status** tracking

### 4. Basic Dashboard
- **User Dashboard** showing:
  - Posted ideas
  - Saved ideas
  - Active connections
  - Recent activity
- **Notifications** for:
  - New interest in ideas
  - Messages received
  - Profile views

### 5. Search & Discovery
- **Search Ideas** by:
  - Keywords
  - Skills needed
  - Location
  - Industry/category
- **Browse Categories** with popular industries
- **Featured Ideas** section

## Technical Requirements

### Database Schema (Prisma)
```prisma
model User {
  id          String   @id @default(cuid())
  clerkId     String   @unique
  email       String   @unique
  name        String?
  bio         String?
  location    String?
  skills      String[]
  linkedinUrl String?
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  ideas       Idea[]
  interests   Interest[]
  connections Connection[]
  messages    Message[]
}

model Idea {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  stage       String
  equity      String?
  skills      String[]
  location    String?
  authorId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  author      User       @relation(fields: [authorId], references: [id])
  interests   Interest[]
}

model Interest {
  id     String @id @default(cuid())
  userId String
  ideaId String
  
  user User @relation(fields: [userId], references: [id])
  idea Idea @relation(fields: [ideaId], references: [id])
  
  @@unique([userId, ideaId])
}
```

### Pages Structure
- `/` - Landing page
- `/dashboard` - User dashboard
- `/ideas` - Browse ideas
- `/ideas/[id]` - Individual idea page
- `/ideas/create` - Create new idea
- `/profile` - User profile
- `/profile/edit` - Edit profile
- `/messages` - Direct messaging
- `/search` - Search results

### UI Components Needed
- Navigation bar
- Idea cards
- User profile cards
- Forms (idea creation, profile editing)
- Search/filter components
- Messaging interface
- Loading states
- Error boundaries

## Success Metrics
- User registration and profile completion
- Idea creation and browsing activity
- Connection/matching success rate
- User engagement and retention
- Platform growth metrics

## Future Enhancements (Post-MVP)
- Video introductions
- Team formation tools
- Project management features
- Funding/investor connections
- Advanced matching algorithms
- Mobile app
- Integration with external tools