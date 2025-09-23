# API Directory

This folder contains the API route handlers for the Hackathon Event Manager web app.

## Purpose

- Organize all API endpoints for the application.
- Handle requests related to events, users, and registrations.

## Environment Setup

Create a `.env` file in the `app/api` directory with the following content:

```env
DATABASE_URL
DIRECT_URL
PORT
```

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. In the `app/api` directory, run:

   ```bash
   npm install
   ```

   This will install all required dependencies for the API.

- **Development:**  
  Start the API server in development mode with hot-reloading:

  ```bash
  npm run dev
  ```

  This uses `tsx` to watch for changes in `src/server.ts` and automatically restarts the server.

- **Prisma Setup:**  
   Ensure your Prisma schema exists at:

  ```bash
  app/api/prisma/schema.prisma
  ```

  Generate the Prisma client

  ```bash
  npx prisma generate
  ```

- **Production Build:**  
  Build the API for production:

  ```bash
  npm run build
  ```

  This runs lint checks and compiles TypeScript files to the `dist` directory.

- **Start (Production):**  
  Start the built API server:

  ```bash
  npm start
  ```

  This runs the build and then starts the server from the compiled output.

- **Lint:**  
  Check code for linting errors:
  ```bash
  npm run lint
  ```
  To automatically fix linting issues:
  ```bash
  npm run lint:fix
  ```
  To run lint and fail on any warnings:
  ```bash
  npm run lint:check
  ```

## Usage

- Place your route handler files (e.g., `events/route.ts`) in this directory.
- Access endpoints via `/api/` in your deployed application.
