# Architecture

## System Overview

Campus Lab is a full-stack web application designed with a modular, scalable architecture that separates concerns into distinct layers. The system comprises a backend API server, a frontend client application and external services for code execution and data persistence.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React)                             │
│          ┌──────────────────────────────────────────┐           │
│          │  UI Components | State Management | APIs  │           │
│          └──────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     Express.js Backend                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Routes → Controllers → Services → Data Access Layer     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ↓                              ↓                    ↓
    ┌─────────┐                  ┌──────────────┐    ┌──────────┐
    │PostgreSQL│              │ Judge0 API    │    │  Redis   │
    │ Database │              │ (Code Exec)   │    │  Cache   │
    └─────────┘                  └──────────────┘    └──────────┘
```

## Backend Architecture

### 1. Layered Architecture

```
┌────────────────────────────────┐
│      Route Layer               │
│  (Express Routes)              │
└────────────────────────────────┘
            ↓
┌────────────────────────────────┐
│    Middleware Layer            │
│  (Auth, Validation, Logging)   │
└────────────────────────────────┘
            ↓
┌────────────────────────────────┐
│   Controller Layer             │
│  (Request Handlers)            │
└────────────────────────────────┘
            ↓
┌────────────────────────────────┐
│    Service Layer               │
│  (Business Logic)              │
└────────────────────────────────┘
            ↓
┌────────────────────────────────┐
│  Repository/Data Layer         │
│  (Prisma ORM, Database Queries)│
└────────────────────────────────┘
```

### 2. Directory Structure

```
backend/
├── src/
│   ├── index.ts                 # Application entry point
│   ├── controllers/             # Request handlers for each domain
│   │   ├── auth.controller.ts
│   │   ├── problems.controller.ts
│   │   ├── submission.controller.ts
│   │   ├── playlist.controller.ts
│   │   └── executeCode.controller.ts
│   ├── routes/                  # API route definitions
│   │   ├── auth.route.ts
│   │   ├── problems.route.ts
│   │   ├── submission.route.ts
│   │   ├── playlist.route.ts
│   │   └── execution.route.ts
│   ├── middleware/              # Custom Express middleware
│   │   ├── auth.middleware.ts   # JWT authentication
│   │   └── errorHandler.ts
│   ├── libs/                    # Utility libraries and services
│   │   ├── db.ts                # Database utilities
│   │   ├── judge0.lib.ts        # Judge0 API integration
│   │   └── cache.ts             # Redis caching logic
│   ├── types/                   # TypeScript type definitions
│   │   ├── express.d.ts         # Express augmentation
│   │   └── index.ts
│   └── generated/               # Auto-generated files
│       └── prisma/              # Prisma Client
├── prisma/
│   ├── schema.prisma            # Data models
│   └── migrations/              # DB migration history
├── package.json
├── tsconfig.json
└── .env.example
```

### 3. Core Modules

#### Auth Module

- **Responsibility**: User authentication and authorization
- **Key Components**:
    - JWT token generation and validation
    - Password hashing with bcrypt
    - Role-based access control (RBAC)
- **Endpoints**: Login, Signup, Logout, Token Refresh

#### Problem Module

- **Responsibility**: Problem management and retrieval
- **Key Components**:
    - Problem CRUD operations
    - Problem categorization and filtering
    - Test case management
    - Difficulty levels (Easy, Medium, Hard)
- **Endpoints**: Get Problems, Get Problem by ID, Create Problem (Admin)

#### Submission Module

- **Responsibility**: Code submission tracking and results
- **Key Components**:
    - Submission creation and storage
    - Test case result tracking
    - Submission history queries
- **Endpoints**: Submit Code, Get Submissions, Get Problem Submissions

#### Contest Module

- **Responsibility**: Contest management and leaderboards
- **Key Components**:
    - Contest scheduling
    - Real-time leaderboard updates
    - Contest problem assignment
    - Rating calculation
- **Endpoints**: Create Contest, Join Contest, Get Leaderboard

#### Playlist Module

- **Responsibility**: Problem collection organization
- **Key Components**:
    - Playlist CRUD operations
    - Problem-to-playlist associations
    - Playlist progress tracking
- **Endpoints**: Create Playlist, Add Problem, Get Playlist

#### Code Execution Module

- **Responsibility**: Code compilation and execution
- **Key Components**:
    - Judge0 API integration
    - Language support management
    - Execution timeout handling
    - Test case validation
- **Endpoints**: Execute Code / Submit Code

## Database Schema

### Entity Relationship Diagram

```
User
├── id (UUID, PK)
├── email (String, UNIQUE)
├── password (String, hashed)
├── name (String)
├── college (String)
├── role (Enum: ADMIN, USER)
├── createdAt (DateTime)
└── updatedAt (DateTime)
    ↓
    ├→ Submission (One-to-Many)
    ├→ Playlist (One-to-Many)
    └→ ProblemSolved (One-to-Many)

Problem
├── id (UUID, PK)
├── title (String, UNIQUE)
├── description (Text)
├── difficulty (Enum: EASY, MEDIUM, HARD)
├── category (String)
├── timeLimit (Int)
├── memoryLimit (Int)
├── createdAt (DateTime)
└── updatedAt (DateTime)
    ↓
    ├→ TestCase (One-to-Many)
    ├→ Submission (One-to-Many)
    ├→ ProblemSolved (One-to-Many)
    └→ ProblemPlaylist (One-to-Many)

Submission
├── id (UUID, PK)
├── userId (UUID, FK)
├── problemId (UUID, FK)
├── code (Text)
├── language (String)
├── status (Enum: PENDING, ACCEPTED, RUNTIME_ERROR, etc.)
├── executionTime (Float)
├── memoryUsed (Float)
├── createdAt (DateTime)
└── updatedAt (DateTime)
    ↓
    └→ TestCaseResult (One-to-Many)

TestCase
├── id (UUID, PK)
├── problemId (UUID, FK)
├── input (Text)
├── expectedOutput (Text)
└── isHidden (Boolean)

TestCaseResult
├── id (UUID, PK)
├── submissionId (UUID, FK)
├── testCaseId (UUID, FK)
├── passed (Boolean)
├── actualOutput (Text)
└── errorMessage (Text)

Playlist
├── id (UUID, PK)
├── userId (UUID, FK)
├── title (String)
├── description (Text)
├── createdAt (DateTime)
└── updatedAt (DateTime)
    ↓
    └→ ProblemPlaylist (One-to-Many)

ProblemPlaylist
├── id (UUID, PK)
├── playlistId (UUID, FK)
├── problemId (UUID, FK)
└── order (Int)

ProblemSolved
├── id (UUID, PK)
├── userId (UUID, FK)
├── problemId (UUID, FK)
├── solvedAt (DateTime)
└── attempts (Int)
```

## API Architecture

### RESTful Design

- **Resource-Oriented**: URLs represent resources (problems, submissions, contests)
- **HTTP Methods**: GET (retrieve), POST (create), PUT (update), DELETE (remove)
- **Status Codes**: Standard HTTP status codes for responses
- **JSON Format**: Request and response payloads in JSON

### Request/Response Flow

```
Client Request
      ↓
Express Route Handler
      ↓
Authentication Middleware
      ↓
Authorization Middleware
      ↓
Input Validation
      ↓
Controller Logic
      ↓
Service Layer (Business Logic)
      ↓
Prisma ORM (Database Query)
      ↓
Database
      ↓
Response
      ↓
Client
```

## External Integrations

### Judge0 API Integration

**Purpose**: Execute user code safely in isolated environments

**Flow**:

1. User submits code through `/code-execution` endpoint
2. Controller sends code to Judge0 API
3. Judge0 compiles and executes code with test cases
4. Results returned and stored in database
5. Response sent to user

**Supported Languages**: Java, Python, C++, JavaScript, C#, Go, Rust, etc.

**Configuration**:

- Judge0 API Base URL
- Auth Token for API requests
- Time limits per submission
- Memory limits per submission

### Redis Cache

**Purpose**: Improve performance for frequently accessed data

**Use Cases**:

- Leaderboard caching and real-time updates
- Session management
- Rate limiting
- Problem popularity data

## Security Architecture

### Authentication Flow

```
User Input (Email/Password)
      ↓
API Endpoint /auth/login
      ↓
Password Validation (bcrypt compare)
      ↓
JWT Token Generation
      ↓
Token Stored Client-side
      ↓
Subsequent Requests Include Token
      ↓
Auth Middleware Validates Token
      ↓
Request Proceeds / Rejected
```

### Authorization Strategy

- **Role-Based Access Control (RBAC)**:
    - ADMIN: Full platform access, content management
    - USER: Problem solving, contest participation, profile management

- **Resource-Level Authorization**:
    - Users can only view/edit their own submissions
    - Only admins can create/edit problems
    - Contest creators manage contest settings

### Security Measures

- Password Hashing: bcrypt with salt rounds
- JWT Tokens: Signed with secret, includes expiration
- Input Validation: Server-side validation of all inputs
- SQL Injection Prevention: Prisma ORM parameterized queries
- CORS: Restricted to trusted domains
- Rate Limiting: API endpoint throttling

## Deployment Architecture

### Environment Structure

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Development  │  │   Staging    │  │  Production  │
├──────────────┤  ├──────────────┤  ├──────────────┤
│ Local DB     │  │ Staging DB   │  │ Primary DB   │
│ Judge0 Test  │  │ Judge0 Live  │  │ Judge0 Live  │
│ Debug Logs   │  │ Test Logs    │  │ Prod Logs    │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Scalability Considerations

1. **Database Scaling**:
    - Read replicas for query distribution
    - Connection pooling
    - Query optimization and indexing

2. **Application Scaling**:
    - Horizontal scaling with load balancer
    - Stateless server design
    - Session management via Redis

3. **Judge0 Scaling**:
    - Multiple Judge0 instances
    - Request queue management
    - Fallback mechanisms for failures

## Performance Optimization

### Caching Strategy

- **Database Query Caching**: Frequently accessed problems
- **Leaderboard Caching**: Updated periodically
- **Session Caching**: Redis for quick auth validation

### Database Optimization

- **Indexing**: Key columns (userId, problemId, problemDifficulty)
- **Pagination**: Large result sets returned in pages
- **Query Optimization**: Efficient joins and filtering

### Frontend Optimization

- **Code Splitting**: Lazy loading of components
- **CDN**: Static assets served from edge servers
- **Compression**: Gzip compression for API responses

## Monitoring & Logging

### Metrics Tracked

- API response times
- Database query performance
- Judge0 execution times
- Error rates and types
- User engagement metrics

### Logging Strategy

- **Request Logging**: All API requests and responses
- **Error Logging**: Stack traces and error context
- **Audit Logging**: User authentication events
- **Performance Logging**: Slow queries, timeouts

### Tools

- Log Aggregation: ELK Stack or Datadog
- APM: New Relic or Sentry
- Analytics: Mixpanel or Google Analytics
