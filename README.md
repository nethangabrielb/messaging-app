# Messaging App

> A fullstack real-time messaging platform with authentication, profile management, and live chat powered by Socket.IO.

![GitHub last commit](https://img.shields.io/github/last-commit/nethangabrielb/messaging-app)
![GitHub repo size](https://img.shields.io/github/repo-size/nethangabrielb/messaging-app)

## 📖 About the Project

Messaging App is a fullstack chat platform built with a React + TypeScript frontend and a Node.js + Express backend. It supports account registration, login, email verification, password reset flows, protected routes, and profile updates. The backend exposes REST endpoints for user, chat, and message data, while Socket.IO handles real-time room messaging, presence updates, and notification events.

The project is organized as a multi-folder repository:

- `messaging-app-frontend/` hosts the Vite-powered web client.
- `messaging-app-backend/` provides the API server, Socket.IO events, Prisma models, and migration history.

File uploads for profile avatars are sent from the frontend and stored using an S3-compatible client (configured for Supabase Storage). The data layer uses PostgreSQL through Prisma.

### Why I Built This

I wanted to learn how real-time communication works in web applications, and how to create end-to-end project that combines classic REST patterns with real-time communication. The goal was to apply the concepts I have learned from The Odin Project and my own research on how real-time messaging works to build a messaging product of my own with realistic account flows (verification/reset), status updates, room-based conversations, and production-leaning concerns like keep-alive health checks and object storage integration.

> 📚 Built in partial fulfillment of [The Odin Project – Messaging App](https://www.theodinproject.com/lessons/nodejs-messaging-app) project assignment.

### What I Learned

- Designing a hybrid architecture where REST handles CRUD while Socket.IO handles event-driven updates.
- Modeling chat relationships in Prisma (users, rooms, messages, notifications) and evolving the schema through migrations.
- Implementing profile updates with multipart form handling (`multer`) and S3-compatible object storage uploads.
- Coordinating frontend route protection, auth token usage, and real-time socket lifecycle in a TypeScript React app.

## Features

- [x] Authentication — Register/login with JWT-based authorization.
- [x] Email verification — Verification email flow using Nodemailer + EJS templates.
- [x] Password recovery — Forgot password, reset code verification, and password reset.
- [x] Protected app routes — Route guards for authenticated user pages.
- [x] Real-time chat — Room-based messaging with Socket.IO events.
- [x] Presence/status updates — ONLINE, OFFLINE, BUSY status model.
- [x] Chat room initialization — Creates room on demand or reuses existing room.
- [x] Notifications — Per-user room notification counts with clear notifications event.
- [x] Profile management — Username/bio update and avatar upload.
- [x] Search and filter users — Backend user listing supports filtering/search query patterns.

## Tech Stack

### Frontend

- **React 19** — UI framework.
- **TypeScript** — Type-safe UI development.
- **Vite** — Development server and build tooling.
- **Tailwind CSS v4** — Utility-first styling.
- **React Router** — Client-side routing and protected page loaders.
- **TanStack Query** — Data fetching and caching.
- **React Hook Form + Zod** — Form handling and validation.
- **Zustand** — Lightweight client state.
- **Socket.IO Client** — Real-time communication.

### Backend

- **Node.js + Express 5** — API server.
- **Socket.IO** — Real-time events and rooms.
- **Prisma ORM** — Data modeling and DB access.
- **jsonwebtoken** — JWT auth/verification.
- **bcryptjs** — Password hashing.
- **express-validator** — Request validation.
- **Nodemailer + EJS** — Email workflows and templates.
- **multer** — Multipart/form-data processing.

### Database

- **PostgreSQL** — Primary relational database.

### DevOps & Tooling

- **Supabase Storage (S3-compatible)** — Avatar/object storage via AWS SDK S3 client.
- **Node-cron** — Keep-alive job scheduling.
- **Nodemon** — Backend dev autoreload.
- **ESLint + TypeScript tooling** — Frontend static analysis and build checks.

## Architecture

```text
Browser (React + Vite)
        |
        | REST (fetch)
        v
Express API (Node.js)
  |   |   |
  |   |   +--> SMTP (email verification/reset)
  |   |
  |   +------> S3-compatible Storage (Supabase bucket for avatars)
  |
  +---------> PostgreSQL (via Prisma)

Browser <==== Socket.IO (real-time events) ====> Express + Socket.IO Server
             - set status
             - create room / join room
             - message
             - notification / clear notifications
```

REST endpoints are used for authentication, user profile updates, chat list retrieval, and room message history. Socket.IO is used for low-latency chat interactions and notification signaling.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- PostgreSQL >= 14
- SMTP credentials (for email verification and password reset)
- Supabase project or another S3-compatible storage endpoint (for avatar upload)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nethangabrielb/messaging-app.git
cd messaging-app

# 2. Install backend dependencies
cd messaging-app-backend
npm install

# 3. Install frontend dependencies
cd ../messaging-app-frontend
npm install

# 4. Set up environment variables
cd ../messaging-app-backend
cp .env.example .env
# Create frontend env file manually
cd ../messaging-app-frontend
# then create .env and add the variables from this README

# 5. Run database migrations (backend)
cd ../messaging-app-backend
npx prisma migrate dev

# 6. Start development servers (use two terminals)
# Terminal A (backend)
cd messaging-app-backend
npm run dev

# Terminal B (frontend)
cd messaging-app-frontend
npm run dev
```

### Environment Variables

Create and update these files:

- `messaging-app-backend/.env`
- `messaging-app-frontend/.env` (create this file manually)

```env
# ==========================
# messaging-app-backend/.env
# ==========================
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your_jwt_secret"
PORT=3000
SERVER_URL="http://localhost:3000"
CLIENT_URL="http://localhost:5173"

SMTP_HOST="smtp.your-provider.com"
SMTP_PORT=587
SMTP_USER="your_smtp_user"
SMTP_PASS="your_smtp_password"

SUPABASE_ENDPOINT="https://<project-ref>.supabase.co/storage/v1/s3"
SUPABASE_ACCESS_KEY_ID="your_access_key"
SUPABASE_SECRET_ACCESS_KEY="your_secret_key"
SUPABASE_BUCKET="your_bucket_name"

KEEPALIVE_ENABLED=false
KEEPALIVE_CRON="*/10 * * * *"
KEEPALIVE_URLS="https://your-backend-domain/api/ping"
KEEPALIVE_DB_PING=false
KEEPALIVE_STORAGE_PING=false

# ===========================
# messaging-app-frontend/.env
# ===========================
VITE_SERVER_URL="http://localhost:3000"
VITE_SUPABASE_PUBLIC_URL="https://<project-ref>.supabase.co/storage/v1/object/public/<bucket>"
```

## 📡 API Reference

No Swagger/Postman collection is currently committed. The routes below are based on the current backend router configuration.

### Sample Endpoints

| Method | Endpoint                               | Description                                   | Auth Required |
| ------ | -------------------------------------- | --------------------------------------------- | :-----------: |
| GET    | `/api/ping`                            | Health check endpoint                         |      ❌       |
| POST   | `/api/register`                        | Register new user                             |      ❌       |
| POST   | `/api/login`                           | Login user                                    |      ❌       |
| POST   | `/api/forgot-password`                 | Request password reset code                   |      ❌       |
| POST   | `/api/verify-code`                     | Verify reset code and issue reset token       |      ❌       |
| PUT    | `/api/reset-password`                  | Reset password with token                     |      ❌       |
| POST   | `/api/verify-email`                    | Send email verification link                  |      ❌       |
| GET    | `/api/verify-email/:verificationToken` | Verify account email                          |      ❌       |
| GET    | `/api/users`                           | Get users / current user / filtered user list |      ✅       |
| PUT    | `/api/users/:userId`                   | Update profile or password                    |      ✅       |
| GET    | `/api/chats`                           | Get user chat list                            |      ✅       |
| GET    | `/api/messages/:roomId`                | Get room message history                      |      ✅       |

## 📁 Folder Structure

```text
.
├── messaging-app-backend/
│   ├── app.js                         # Express + Socket.IO entry point
│   ├── controllers/
│   │   ├── authenticated/             # chats, messages, users handlers
│   │   └── guest/                     # auth, verification, reset handlers
│   ├── events/                        # Socket.IO event handlers
│   ├── middlewares/                   # JWT auth middleware
│   ├── prisma/                        # schema + migrations
│   ├── routes/                        # guest and authenticated routers
│   ├── scripts/                       # utility scripts
│   ├── utils/                         # helpers + keepalive service
│   └── views/emails/                  # email templates
├── messaging-app-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/                # reusable UI and forms
│   │   ├── hooks/                     # custom data hooks
│   │   ├── layouts/                   # app shell/navigation
│   │   ├── pages/                     # route-level pages
│   │   ├── routes/                    # router config
│   │   ├── stores/                    # Zustand stores
│   │   └── socket.ts                  # shared Socket.IO client
│   └── vite.config.ts
└── README.md
```

## Roadmap

- [x] Core authentication and account recovery
- [x] Real-time room messaging
- [x] Profile settings and avatar upload
- [x] Notification count persistence per room

## Contributing

This is a personal project, but feedback and suggestions are welcome.

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

- [Prisma](https://www.prisma.io/) — ORM and migration workflow.
- [Socket.IO](https://socket.io/) — Real-time communication layer.
- [Supabase](https://supabase.com/) — S3-compatible object storage backend.
- [shadcn/ui](https://ui.shadcn.com/) + Radix UI — Frontend primitives.
