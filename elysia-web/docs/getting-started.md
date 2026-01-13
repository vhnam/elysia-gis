# Getting Started

## Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm/yarn

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure API endpoint (see [Configuration](./configuration.md))

4. Start development server:

   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth.tsx        # Auth layout wrapper
│   └── ui/             # shadcn/ui components
├── modules/            # Feature modules
│   └── auth/           # Authentication module
│       ├── login/
│       ├── forgot-password/
│       └── reset-password/
├── providers/          # React context providers
│   └── query-provider.tsx  # TanStack Query provider
├── queries/            # API query/mutation hooks
│   └── auth/           # Auth-related queries
├── routes/             # TanStack Router routes
│   ├── __root.tsx      # Root route
│   ├── index.tsx       # Home page
│   └── auth/           # Auth routes
├── schemas/            # Zod validation schemas
├── utils/              # Utility functions
│   ├── api.ts          # Axios API client
│   └── ui.ts           # UI utility functions
└── styles.css          # Global styles
```

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

## Next Steps

- [Configure API endpoint](./configuration.md)
- [Learn about routing](./routing.md)
- [Understand authentication](./authentication.md)
- [Explore UI components](./ui-components.md)
