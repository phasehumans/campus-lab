# Campus Lab

> A comprehensive, college-exclusive DSA learning platform combining problem-solving practice, competitive contests and progress tracking.

## Overview

Campus Lab addresses critical challenges college students face when learning Data Structures and Algorithms:

- **Limited Access** to diverse, well-curated DSA problems
- **Lack of Structure** in learning paths by difficulty and topics
- **No Community** for competitive learning within the academic environment
- **Insufficient Progress Tracking** for individual learning journeys
- **Absence** of college-specific platforms

Campus Lab solves these problems with three core features:

### 1. Problem Sheet

A comprehensive repository of **100+ DSA problems** organized by:

- Difficulty levels (Easy, Medium, Hard)
- Data structure types and algorithms
- Real-time code editor with syntax highlighting
- Multi-language support (Java, Python, C++, JavaScript)

### 2. Contests

Time-bound competitive programming contests:

- **Weekly contests** with 3-5 problems each
- Real-time leaderboards with rankings
- Only college students can participate
- Post-contest editorials and discussions

### 3. Profile & Progress

Personalized progress dashboard:

- Track solved problems and attempts
- View contest history and ratings
- Achievement badges and milestones
- Topic-wise proficiency scores
- Learning velocity metrics

## Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- PostgreSQL 13+
- Judge0 API (local Docker or cloud instance)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/phasehumans/campuslab.git
cd campuslab
```

2. **Install dependencies**

```bash
cd backend
npm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Setup database**

```bash
# Create database
createdb campuslab

# Run migrations
npx prisma migrate dev

# Seed sample data (optional)
npx prisma db seed
```

5. **Start Judge0** (see [CONTRIBUTING.md](CONTRIBUTING.md#judge0-setup-guide))

```bash
docker-compose up -d
```

6. **Run development server**

```bash
npm run dev
```

Server starts at `http://localhost:3000` 

## Project Structure

```
campuslab/
├── server/                         # Node.js/Express API
│   ├── src/
│   │   ├── index.ts                # Application entry point
│   │   ├── controllers/            # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── problems.controller.ts
│   │   │   ├── submission.controller.ts
│   │   │   ├── playlist.controller.ts
│   │   │   └── executeCode.controller.ts
│   │   ├── routes/                 # API route definitions
│   │   ├── middleware/             # Auth, validation, error handling
│   │   ├── types/                  # TypeScript definitions
│   │   ├── libs/                   # Utility libraries
│   │   │   ├── db.ts              # Database utilities
│   │   │   ├── judge0.lib.ts      # Judge0 integration
│   │   │   └── cache.ts           # Redis caching
│   │   └── generated/              # Prisma auto-generated
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema
│   │   └── migrations/             # DB migration history
│   ├── package.json
│   └── .env.example
├── docs/                            # Documentation files
│   ├── 01_Abstract.md
│   ├── 02_Introduction.md
│   ├── 03_Literature_Review.md
│   ├── 04_EDA.md
│   ├── 05_Project_Planning.md
│   ├── 06_Result_Discussion.md
│   └── 07_References.md
├── ARCHITECTURE.md                  # System architecture
├── CONTRIBUTING.md                  # Contribution guidelines
├── LICENSE                          # MIT License
├── README.md                        # This file
└── .gitignore
```
