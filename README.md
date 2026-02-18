# 🎨 UIMock — AI-Powered UI Mockup Generator

> **UIMock** is a full-stack web application that lets you create, manage, and export beautiful UI mockups using the power of AI. Describe your UI in plain English, and watch it come to life — instantly.

---

## ✨ Features

- 🤖 **AI-Powered UI Generation** — Generate HTML/CSS mockup screens from natural language prompts using **OpenAI GPT** or **Google Gemini**
- 🗂️ **Project Management** — Organize your mockups into projects with multiple screens
- 🖥️ **Live Canvas Preview** — See your generated UI rendered in real-time inside an interactive preview canvas
- 💻 **Code Editor Panel** — View and manually edit the generated HTML/CSS code
- 🔐 **Authentication** — Secure login via **GitHub OAuth** or **Email/Password** credentials (powered by NextAuth v5)
- 🌙 **Theme Support** — Light/Dark mode toggle via `next-themes`
- 📦 **Docker Ready** — Multi-stage Dockerfile for lean, production-grade containerized deployments
- 🗄️ **PostgreSQL + Drizzle ORM** — Type-safe database access with schema migrations via Drizzle Kit

---

## 🛠️ Tech Stack

| Category             | Technology                                        |
| -------------------- | ------------------------------------------------- |
| **Framework**        | [Next.js 16.1.6](https://nextjs.org) (App Router) |
| **Language**         | TypeScript 5                                      |
| **Styling**          | Tailwind CSS v4                                   |
| **UI Components**    | Radix UI, shadcn/ui, Lucide React                 |
| **Animations**       | Framer Motion                                     |
| **Database**         | PostgreSQL (Neon Cloud)                           |
| **ORM**              | Drizzle ORM + Drizzle Kit                         |
| **Authentication**   | NextAuth v5 (GitHub OAuth + Credentials)          |
| **AI Integration**   | OpenAI GPT, Google Gemini (`@google/genai`)       |
| **State Management** | Zustand                                           |
| **Forms**            | React Hook Form + Zod                             |
| **Runtime**          | Node.js 20 (Alpine Linux in Docker)               |

---

## 📁 Project Structure

```
uimock/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth-pages)/           # Auth route group (login, register)
│   │   ├── (dashboard)/            # Dashboard route group (protected)
│   │   ├── api/
│   │   │   ├── auth/               # NextAuth endpoints
│   │   │   ├── projects/           # Project CRUD API
│   │   │   ├── screen/             # Screen management API
│   │   │   ├── ai-generations/     # AI generation API
│   │   │   └── health/             # Health check (Docker)
│   │   ├── project/                # Project detail pages
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing / Home page
│   │   └── globals.css             # Global styles
│   │
│   ├── components/                 # React components (64 files)
│   │   ├── CanvasPreview.tsx        # Live UI preview renderer
│   │   ├── CodePanel.tsx           # HTML/CSS code editor panel
│   │   ├── CreateProjectForm.tsx   # New project creation form
│   │   ├── GenerateUIAfterCreate.tsx # AI generation trigger
│   │   ├── LoadingOverlay.tsx      # Loading state overlay
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   ├── auth/                   # Auth-specific components
│   │   └── ui/                     # Reusable shadcn/ui components (56 files)
│   │
│   ├── db/
│   │   ├── schema.ts               # Drizzle ORM schema definitions
│   │   └── index.ts                # Database connection (Neon serverless)
│   │
│   ├── lib/                        # Utility libraries & helpers
│   ├── actions/                    # Next.js Server Actions
│   ├── schemas/                    # Zod validation schemas
│   ├── store/                      # Zustand global state stores
│   ├── types/                      # Shared TypeScript types
│   ├── prompt/                     # AI prompt templates
│   ├── hooks/                      # Custom React hooks
│   ├── auth.ts                     # NextAuth configuration
│   └── middleware.ts               # Auth middleware (route protection)
│
├── public/                         # Static assets (images, icons)
├── drizzle/                        # Database migration files
├── Dockerfile                      # Multi-stage Docker build
├── .dockerignore                   # Docker build exclusions
├── next.config.ts                  # Next.js configuration (standalone output)
├── drizzle.config.ts               # Drizzle Kit configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── components.json                 # shadcn/ui component config
└── package.json                    # Dependencies & scripts
```

---

## 🗄️ Database Schema

| Table            | Description                                        |
| ---------------- | -------------------------------------------------- |
| `users`          | User accounts (credentials + OAuth)                |
| `projects`       | UI mockup projects with metadata                   |
| `screens`        | Individual screens/pages with stored HTML/CSS code |
| `ai_generations` | AI generation history (prompts, responses, model)  |
| `exports`        | Export history and download tracking               |

**Relationships:**

- `User` → `Projects` (one-to-many)
- `Project` → `Screens` (one-to-many)
- `Screen` → `AI Generations` (one-to-many)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20+
- **npm** v10+
- A **PostgreSQL** database (e.g., [Neon](https://neon.tech) — free tier works great)
- **GitHub OAuth App** credentials (for social login)
- **OpenAI** and/or **Google Gemini** API keys

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/uimock.git
cd uimock
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database (PostgreSQL / Neon)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# NextAuth
AUTH_SECRET=your-random-32-char-secret-here

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI APIs
OPENAI_API_KEY=sk-proj-...
GEMINI_API_KEY=AIza...

# Public API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run Database Migrations

```bash
npx drizzle-kit push
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint for code quality checks   |

---

## 🐳 Docker Deployment

UIMock uses a **multi-stage Docker build** for a lean, secure production image.

### Build & Run with Docker

```bash
# Build the Docker image
docker build -t uimock:latest .

# Run the container (pass your .env file)
docker run -p 3000:3000 --env-file .env uimock:latest
```

### Docker Build Stages

| Stage     | Base Image       | Purpose                                             |
| --------- | ---------------- | --------------------------------------------------- |
| `builder` | `node:20-alpine` | Install deps, compile TypeScript, build Next.js app |
| `runner`  | `node:20-alpine` | Minimal production image — runs the compiled server |

**Why multi-stage?**

- 🪶 **Smaller image** — No source code, dev tools, or TypeScript compiler in the final image
- 🔒 **More secure** — Runs as a non-root `nextjs` user
- ⚡ **Faster deploys** — Smaller images pull faster from registries

### Environment Variables for Docker

All environment variables from the `.env` section above are required at container runtime. Pass them via `--env-file .env` or set them individually with `-e KEY=VALUE`.

---

## 🔐 Authentication Flow

UIMock uses **NextAuth v5** with two providers:

1. **GitHub OAuth** — One-click social login
2. **Credentials** — Email + password with `bcryptjs` hashing

Route protection is handled by `src/middleware.ts`, which intercepts all requests and redirects unauthenticated users away from protected dashboard routes.

---

## 🤖 AI Generation Flow

```
User types a prompt
        ↓
POST /api/ai-generations
        ↓
Server selects model (OpenAI GPT or Google Gemini)
        ↓
AI returns HTML/CSS code
        ↓
Code saved to `screens` table
        ↓
CanvasPreview renders the UI live
```

---

## 🔍 API Endpoints

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| `GET`  | `/api/health`             | Health check (used by Docker)      |
| `GET`  | `/api/projects`           | List all projects for current user |
| `POST` | `/api/projects`           | Create a new project               |
| `GET`  | `/api/screen`             | Get screens for a project          |
| `POST` | `/api/screen`             | Create or update a screen          |
| `POST` | `/api/ai-generations`     | Trigger AI UI generation           |
| `GET`  | `/api/ai-generations`     | Fetch AI generation history        |
| `POST` | `/api/auth/[...nextauth]` | NextAuth authentication handler    |

---

## 🔧 Troubleshooting

| Issue                     | Likely Cause             | Fix                                                  |
| ------------------------- | ------------------------ | ---------------------------------------------------- |
| Build fails               | Missing dependencies     | Run `npm install`, then `npm run build`              |
| Database connection error | Wrong `DATABASE_URL`     | Double-check your Neon connection string             |
| Auth not working          | Missing `AUTH_SECRET`    | Set the `AUTH_SECRET` environment variable           |
| GitHub login fails        | Wrong OAuth credentials  | Verify `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` |
| AI generation fails       | Invalid API key          | Check `OPENAI_API_KEY` or `GEMINI_API_KEY`           |
| Docker port conflict      | Port 3000 already in use | Use `-p 3001:3000` to remap the port                 |

---

## 📚 Resources & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth v5 (Auth.js)](https://authjs.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon Serverless PostgreSQL](https://neon.tech/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 📄 License

This project is private and not licensed for public distribution.

---

**Version:** 0.1.0 &nbsp;|&nbsp; **Last Updated:** February 2026 &nbsp;|&nbsp; **Maintainer:** Tanmmay R Joseph
