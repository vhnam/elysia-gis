# Elysia GIS Web

A modern, type-safe web application built with [TanStack Start](https://tanstack.com/start), React, TypeScript, and shadcn/ui.

## Features

- ✅ Server-Side Rendering (SSR) with TanStack Start
- ✅ File-based routing with TanStack Router
- ✅ Type-safe data fetching with TanStack Query
- ✅ Beautiful UI components with shadcn/ui
- ✅ Tailwind CSS for styling
- ✅ JWT Authentication
- ✅ Password reset flow
- ✅ Form validation with Zod
- ✅ Type-safe forms with TanStack Form

## Tech Stack

- **Framework**: TanStack Start (React SSR)
- **Routing**: TanStack Router
- **Data Fetching**: TanStack Query
- **UI Components**: shadcn/ui + Base UI
- **Styling**: Tailwind CSS v4
- **Forms**: TanStack Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure API endpoint (see [Configuration](./docs/configuration.md))

4. Start development server:

   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## Documentation

- [Getting Started](./docs/getting-started.md) - Installation and project structure
- [Configuration](./docs/configuration.md) - API endpoint and environment setup
- [Routing](./docs/routing.md) - File-based routing guide
- [Authentication](./docs/authentication.md) - Authentication flows
- [UI Components](./docs/ui-components.md) - shadcn/ui components guide
- [Data Fetching](./docs/data-fetching.md) - TanStack Query usage
- [Deployment](./docs/deployment.md) - Production deployment guide
- [Troubleshooting](./docs/troubleshooting.md) - Common issues and solutions

## Available Scripts

```bash
# Development
pnpm dev              # Start development server with hot reload
pnpm preview          # Preview production build locally

# Build
pnpm build            # Build for production

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm check            # Format and lint code

# Testing
pnpm test             # Run tests
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth.tsx        # Auth layout wrapper
│   └── ui/             # shadcn/ui components
├── modules/            # Feature modules
│   └── auth/           # Authentication module
├── providers/          # React context providers
├── queries/            # API query/mutation hooks
├── routes/             # TanStack Router routes
├── schemas/            # Zod validation schemas
├── utils/              # Utility functions
└── styles.css          # Global styles
```

## Routes

- `/` - Home page
- `/auth/login` - Login page
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password` - Reset password page

## API Integration

The application connects to the Elysia GIS API. Configure the API endpoint in `src/utils/api.ts` or via environment variables.

Default API URL: `http://localhost:4000/api/v1`

See [Configuration](./docs/configuration.md) for details.

## License

MIT

## References

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
