# 📦 UIMock - Project Structure & Docker Architecture

## 🏗️ Project Architecture Overview

### Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: Node.js 20 (Alpine Linux)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (Neon Cloud)
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth v5 (GitHub OAuth + Credentials)
- **AI Integration**: OpenAI GPT & Google Gemini
- **State Management**: Zustand
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion

---

## 📁 Project Folder Structure

```
uimock/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📂 (auth-pages)/       # Auth route group
│   │   ├── 📂 (dashboard)/        # Dashboard route group
│   │   ├── 📂 api/                # API routes
│   │   │   ├── auth/              # Authentication endpoints
│   │   │   ├── projects/          # Project CRUD endpoints
│   │   │   ├── screen/            # Screen management endpoints
│   │   │   ├── ai-generations/    # AI generation endpoints
│   │   │   └── health/            # Health check endpoint (for Docker)
│   │   ├── project/               # Project pages
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   │
│   ├── 📂 components/             # React components (64 files)
│   │   ├── CanvasPreview.tsx      # UI preview component
│   │   ├── CodePanel.tsx          # Code editor panel
│   │   ├── CreateProjectForm.tsx  # Project creation form
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   └── ui/                    # Reusable UI components
│   │
│   ├── 📂 db/                     # Database layer
│   │   ├── schema.ts              # Drizzle ORM schema
│   │   └── index.ts               # Database connection
│   │
│   ├── 📂 lib/                    # Utility libraries
│   │   ├── utils.ts               # Helper functions
│   │   └── ...
│   │
│   ├── 📂 actions/                # Server actions
│   ├── 📂 schemas/                # Zod validation schemas
│   ├── 📂 store/                  # Zustand state management
│   ├── 📂 types/                  # TypeScript types
│   ├── 📂 prompt/                 # AI prompt templates
│   ├── 📂 hooks/                  # Custom React hooks
│   ├── auth.ts                    # NextAuth configuration
│   └── middleware.ts              # Authentication middleware
│
├── 📂 public/                     # Static assets
│   ├── images/
│   └── ...
│
├── 📂 drizzle/                    # Database migrations
│   └── migrations/
│
├── 📂 .next/                      # Next.js build output (generated)
│   ├── standalone/                # Standalone production server
│   └── static/                    # Optimized static assets
│
├── 📂 node_modules/               # Dependencies (not in Docker)
│
├── 📄 Dockerfile                  # Docker configuration
├── 📄 .dockerignore               # Docker build exclusions
├── 📄 docker-compose.yml          # Docker Compose orchestration
├── 📄 next.config.ts              # Next.js configuration
├── 📄 drizzle.config.ts           # Drizzle ORM configuration
├── 📄 package.json                # Dependencies & scripts
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tailwind.config.ts          # Tailwind CSS configuration
├── 📄 .env                        # Environment variables
└── 📄 DOCKER.md                   # Docker documentation
```

---

## 🐳 Docker Architecture

### Multi-Stage Build Process

```
┌─────────────────────────────────────────────────────┐
│  STAGE 1: Dependencies (deps)                       │
│  ├─ Base: node:20-alpine                           │
│  ├─ Install libc6-compat                           │
│  └─ Install ALL node_modules (dev + prod)          │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 2: Builder                                   │
│  ├─ Copy node_modules from deps                    │
│  ├─ Copy application source code                   │
│  ├─ Set NODE_ENV=production                        │
│  ├─ Run: npm run build                             │
│  └─ Output: .next/standalone + .next/static        │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 3: Runner (Final Production Image)          │
│  ├─ Base: node:20-alpine (minimal)                 │
│  ├─ Create non-root user (nextjs)                  │
│  ├─ Copy .next/standalone (minimal server)         │
│  ├─ Copy .next/static (optimized assets)           │
│  ├─ Copy public/ (static files)                    │
│  ├─ Expose port 3000                               │
│  ├─ Set environment variables                      │
│  └─ CMD: node server.js                            │
└─────────────────────────────────────────────────────┘
```

### Why Multi-Stage Builds?

1. **Smaller Image Size**: Final image only contains runtime dependencies
   - No build tools, no TypeScript compiler, no dev dependencies
   - Typical size reduction: ~500MB → ~150MB

2. **Improved Security**: Reduced attack surface
   - No source code in final image
   - No build tools that could be exploited

3. **Faster Deployments**: Smaller images transfer faster
   - Quicker pulls from registry
   - Faster deployment times

---

## 🔄 Application Flow

### How the Application Works

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │
       ↓ HTTP Request (Port 3000)
┌──────────────────────────────────┐
│   Next.js Server (Docker)        │
│   ┌──────────────────────────┐   │
│   │  Middleware              │   │ ← Auth check
│   │  (src/middleware.ts)     │   │
│   └──────────────────────────┘   │
│              ↓                    │
│   ┌──────────────────────────┐   │
│   │  App Router              │   │
│   │  ┌────────────────────┐  │   │
│   │  │ Pages & Layouts    │  │   │
│   │  └────────────────────┘  │   │
│   │  ┌────────────────────┐  │   │
│   │  │ API Routes         │  │   │ ← REST endpoints
│   │  └────────────────────┘  │   │
│   │  ┌────────────────────┐  │   │
│   │  │ Server Components  │  │   │
│   │  └────────────────────┘  │   │
│   └──────────────────────────┘   │
└──────────────────────────────────┘
       │          │          │
       ↓          ↓          ↓
  ┌────────┐ ┌────────┐ ┌────────┐
  │ Neon   │ │OpenAI  │ │Gemini  │
  │  DB    │ │  API   │ │  API   │
  └────────┘ └────────┘ └────────┘
```

### Key Features

1. **Authentication**
   - NextAuth v5 with GitHub OAuth
   - Credential-based auth with bcrypt hashing
   - Protected routes via middleware

2. **Project Management**
   - Create UI mockup projects
   - Manage multiple screens per project
   - Save project configurations

3. **AI-Powered UI Generation**
   - Generate HTML/CSS code from text prompts
   - Support for OpenAI and Gemini models
   - Real-time code preview

4. **Screen Editor**
   - Manual code editing
   - Live preview canvas
   - Export functionality

---

## 🚀 Docker Deployment Workflow

### Development to Production Flow

```
1. Development
   ├─ Edit code locally
   ├─ Test with: npm run dev
   └─ Commit changes

2. Build Docker Image
   ├─ Run: docker build -t uimock:latest .
   └─ Multi-stage build process executes

3. Run Container
   ├─ Set environment variables
   ├─ Run: docker run -p 3000:3000 uimock:latest
   └─ Health checks begin

4. Monitor
   ├─ Check logs: docker logs uimock-app
   ├─ Health: docker inspect --format='{{.State.Health}}' uimock-app
   └─ Metrics: docker stats uimock-app

5. Deploy to Production
   ├─ Push image to registry (Docker Hub, AWS ECR, etc.)
   ├─ Pull and run on production server
   └─ Set up reverse proxy (nginx, Traefik, etc.)
```

---

## 🔐 Environment Variables Required

| Variable               | Description                  | Example                               |
| ---------------------- | ---------------------------- | ------------------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `AUTH_SECRET`          | NextAuth secret key          | Random 32+ char string                |
| `GITHUB_CLIENT_ID`     | GitHub OAuth App ID          | From GitHub Developer Settings        |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Secret      | From GitHub Developer Settings        |
| `OPENAI_API_KEY`       | OpenAI API key               | `sk-proj-...`                         |
| `GEMINI_API_KEY`       | Google Gemini API key        | `AIza...`                             |
| `NEXT_PUBLIC_API_URL`  | Public API URL               | `http://localhost:3000`               |

---

## 📊 Database Schema

### Tables

1. **users** - User accounts
   - Authentication (credentials + OAuth)
   - User profiles

2. **projects** - UI mockup projects
   - Project metadata
   - User association

3. **screens** - Individual screens/pages
   - HTML/CSS code storage
   - Project association

4. **ai_generations** - AI generation history
   - Prompts and responses
   - Model tracking

5. **exports** - Export history
   - Download tracking
   - User association

### Relationships

- User → Projects (one-to-many)
- Project → Screens (one-to-many)
- Screen → AI Generations (one-to-many)

---

## 🛠️ Build Process Explained

### What Happens During `npm run build`

1. **TypeScript Compilation**
   - Converts .ts/.tsx → .js
   - Type checking

2. **Code Bundling**
   - Webpack/Turbopack bundles client code
   - Tree-shaking removes unused code
   - Minification reduces file size

3. **Static Optimization**
   - Pre-renders static pages
   - Generates static HTML files

4. **Asset Optimization**
   - Image optimization
   - CSS extraction and minification
   - Font optimization

5. **Standalone Output**
   - Creates `.next/standalone` directory
   - Includes minimal Node.js server
   - Self-contained with all dependencies

---

## 🏃 Running the Application

### Local Development (Without Docker)

```bash
npm install
npm run dev
# App runs on http://localhost:3000
```

### Production with Docker

```bash
# Using Dockerfile
docker build -t uimock:latest .
docker run -p 3000:3000 --env-file .env uimock:latest

# Using Docker Compose
docker-compose up -d
```

---

## 📈 Performance Optimizations in Dockerfile

1. **Layer Caching**
   - `package.json` copied separately
   - Dependencies installed before source code
   - If package.json unchanged, cache is reused

2. **Alpine Linux**
   - Minimal base image (~5MB)
   - Faster builds and smaller images

3. **Multi-Stage Builds**
   - Build artifacts not in final image
   - Only production dependencies included

4. **Non-Root User**
   - Security best practice
   - Runs as UID 1001 (nextjs user)

5. **Health Checks**
   - Automatic monitoring
   - Restart unhealthy containers

---

## 🔍 Troubleshooting Guide

### Common Issues

| Issue              | Cause                | Solution                            |
| ------------------ | -------------------- | ----------------------------------- |
| Build fails        | Missing dependencies | Check `package.json`, rebuild image |
| Connection refused | Port not exposed     | Ensure `-p 3000:3000` in docker run |
| Database error     | Wrong DATABASE_URL   | Verify connection string            |
| Auth not working   | Missing AUTH_SECRET  | Set environment variable            |
| 404 errors         | Routes not found     | Check Next.js routes in src/app     |

---

## 📚 Additional Resources

- [Next.js Standalone Mode](https://nextjs.org/docs/app/api-reference/next-config-js/output)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [NextAuth.js v5](https://authjs.dev/)

---

**Last Updated**: 2026-02-17  
**Maintainer**: DevOps Team  
**Version**: 1.0.0
