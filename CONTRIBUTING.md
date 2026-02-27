# Contributing to Campus Lab

Thank you for considering contributing to Campus Lab! We welcome contributions from college students, developers, and educators who want to help build an exceptional DSA learning platform for the academic community.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We're building a platform for students, so let's maintain an educational and supportive environment.

## Ways to Contribute

### 1. Report Bugs

- Use GitHub Issues to report bugs
- Include a clear description and steps to reproduce
- Provide environment information (OS, browser, Node version)
- Include error messages and screenshots if applicable

### 2. Suggest Features

- Open a GitHub Issue with the `enhancement` label
- Describe the feature and its benefit to the platform
- Discuss implementation approaches if you have ideas
- Reference related features or competitor implementations

### 3. Improve Documentation

- Fix typos and unclear sections
- Add code examples
- Create tutorials or guides
- Improve API documentation

### 4. Submit Code Changes

- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request with clear description

### 5. Add Problems or Test Cases

- Contribute DSA problems with solutions
- Improve existing problem descriptions
- Add comprehensive test cases
- Write editorials and explanations

## Development Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- PostgreSQL 13+
- Git
- VS Code or preferred code editor

### Step 1: Clone Repository

```bash
git clone https://github.com/phasehumans/campuslab.git
cd campuslab
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
# or
yarn install
```

### Step 3: Configure Environment

Create `.env` file in `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/campuslab"

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRY="7d"

# Judge0 Setup (see Judge0 Setup section below)
JUDGE0_API_URL="http://localhost:2358"
JUDGE0_AUTH_TOKEN="your-auth-token"

# Node
NODE_ENV="development"
PORT=3000
```

### Step 4: Setup Database

```bash
# Create database
createdb campuslab

# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# (Optional) Seed database with sample data
npx prisma db seed
```

### Step 5: Run Development Server

```bash
# From backend directory
npm run dev
```

The server will start at `http://localhost:3000`

## Judge0 Setup Guide

Judge0 is used for safe, isolated code execution. Follow these steps to set it up locally for development.

### Option 1: Using Docker (Recommended)

#### Prerequisites

- Docker and Docker Compose installed
- At least 4GB free disk space
- Port 2358 available

#### Steps

1. **Create `docker-compose.yml` in project root:**

```yaml
version: '3.8'

services:
    judge0:
        image: judge0/judge0:latest
        container_name: judge0_dev
        ports:
            - '2358:8080'
        environment:
            POSTGRES_DB: judge0
            POSTGRES_USER: judge0
            POSTGRES_PASSWORD: judge0_password
            REDIS_HOST: redis
            JUDGE0_MAX_CONCURRENT_SUBMISSIONS: 10
        depends_on:
            - redis
        volumes:
            - judge0_data:/var/tmp

    redis:
        image: redis:7-alpine
        container_name: judge0_redis
        ports:
            - '6379:6379'
        volumes:
            - redis_data:/data

volumes:
    judge0_data:
    redis_data:
```

2. **Start Judge0:**

```bash
docker-compose up -d
```

3. **Verify Installation:**

```bash
# Check if Judge0 is running
curl http://localhost:2358/ping

# Should return: {"success":true}
```

4. **Get Auth Token:**

```bash
curl -X POST http://localhost:2358/
```

### Option 2: Local Installation

#### Prerequisites

- PostgreSQL installed
- Redis installed
- Python 3.8+

#### Steps

1. **Clone Judge0 repository:**

```bash
git clone https://github.com/judge0/judge0.git
cd judge0
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Configure database:**

```bash
# Create database
createdb judge0

# Run migrations
python manage.py migrate
```

4. **Start Redis:**

```bash
redis-server
```

5. **Run Judge0 server:**

```bash
python manage.py runserver 0.0.0.0:2358
```

### Judge0 Environment Variables

Add to `.env`:

```env
# Judge0 Configuration
JUDGE0_API_URL="http://localhost:2358"
JUDGE0_AUTH_TOKEN="your-auth-token-if-needed"

# Submission Limits
JUDGE0_TIME_LIMIT=5000      # milliseconds
JUDGE0_MEMORY_LIMIT=262144  # kilobytes (256MB)

# Languages
JUDGE0_SUPPORTED_LANGUAGES="java,python,cpp,javascript"
```

### Testing Judge0 Integration

Create a test file `backend/test-judge0.ts`:

```typescript
import axios from 'axios'

const JUDGE0_URL = process.env.JUDGE0_API_URL || 'http://localhost:2358'

async function testJudge0() {
    try {
        // Simple Python code
        const submission = {
            source_code: 'print("Hello, World!")',
            language_id: 5, // Python 3
            stdin: '',
            expected_output: 'Hello, World!\n',
        }

        // Create submission
        const response = await axios.post(`${JUDGE0_URL}/submissions`, submission)
        console.log('Submission created:', response.data)

        const token = response.data.token

        // Poll for result
        let result
        let attempts = 0
        while (attempts < 10) {
            const resultResponse = await axios.get(`${JUDGE0_URL}/submissions/${token}`)
            result = resultResponse.data

            if (result.status_id > 2) {
                // Not "In Queue" or "Processing"
                break
            }

            await new Promise((resolve) => setTimeout(resolve, 500)) // Wait 500ms
            attempts++
        }

        console.log('Final result:', result)
    } catch (error) {
        console.error('Judge0 test failed:', error)
    }
}

testJudge0()
```

Run test:

```bash
npx ts-node test-judge0.ts
```

### Common Judge0 Issues

**Issue**: Port 2358 already in use

```bash
# Find process using port 2358
lsof -i :2358

# Kill the process
kill -9 <PID>
```

**Issue**: Judge0 container won't start

```bash
# Check logs
docker-compose logs judge0

# Rebuild container
docker-compose down
docker-compose up --build
```

**Issue**: Database connection error

- Verify PostgreSQL is running
- Check DATABASE_URL environment variable
- Ensure judge0 database exists

**Issue**: Redis connection refused

- Start Redis: `redis-server`
- Check Redis is accessible: `redis-cli ping`

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
# or for bugfixes:
git checkout -b fix/bug-name
```

Branch naming convention:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### 2. Make Changes

- Write clean, readable code
- Follow TypeScript best practices
- Add comments for complex logic
- Keep commits atomic and descriptive

### 3. Write/Update Tests

```bash
# Run existing tests
npm test

# Run tests in watch mode
npm test --watch

# Generate coverage report
npm test --coverage
```

### 4. Follow Code Style

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix lint issues automatically
npm run lint:fix
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add problem filtering by difficulty"
```

Commit message format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Build, dependencies

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:

- Clear title describing the change
- Description of what changed and why
- Reference to related issues (#123)
- Screenshots for UI changes

## Pull Request Guidelines

- **Small PRs**: Easier to review, faster to merge
- **Clear Description**: Explain the problem and solution
- **Tests**: Include tests for new functionality
- **Documentation**: Update docs if behavior changes
- **No Breaking Changes**: Maintain backwards compatibility (discuss first)

### PR Review Process

1. One minimum approval required
2. All checks must pass (tests, linting)
3. Address review feedback
4. Rebase on main before merge

## Testing

### Backend Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test controllers/problem.controller.test.ts

# Run with coverage
npm test --coverage
```

### Manual Testing

1. Start development server
2. Use Postman or insomnia to test API endpoints
3. Test with different languages and code samples
4. Test edge cases and error scenarios

## Documentation

- Update README for user-facing changes
- Update API documentation for endpoint changes
- Add JSDoc comments to functions
- Update this CONTRIBUTING.md for setup changes

## Database Migrations

When modifying the database schema:

```bash
# Make changes to prisma/schema.prisma

# Create and run migration
npx prisma migrate dev --name descriptive_name

# Review generated SQL in migrations/ folder

# Commit migration files
git add prisma/migrations/
git commit -m "feat: add new field to user model"
```

## Troubleshooting

### Common Issues

**Installation fails**

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Database connection fails**

```bash
# Check PostgreSQL is running
psql postgres

# Verify DATABASE_URL in .env
# Format: postgresql://user:password@localhost:5432/campuslab
```

**Port conflicts**

```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

**Judge0 connection errors**

- Ensure Judge0 is running (Docker or local)
- Check JUDGE0_API_URL is correct
- Verify network connectivity

## Getting Help

- **Documentation**: Check README.md, ARCHITECTURE.md, or docs/
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Community**: Join our Discord/Slack server

## License

By contributing to Campus Lab, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Campus Lab! Together, we're building a better learning platform for college students.**
