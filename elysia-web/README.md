# Elysia GIS Web

A modern, type-safe Geographic Information System (GIS) web application built with [TanStack Start](https://tanstack.com/start), React, TypeScript, and shadcn/ui. Features an interactive map interface for rescue operations and geographic data visualization.

## Features

### Core Functionality

- 🗺️ **Interactive Map** - MapLibre GL-powered map with zoom, pan, and navigation controls
- 🔍 **Map Search** - Search locations by area with integrated search bar
- 🎛️ **Map Filters** - Filter map data using drawer-based filter interface
- 📍 **User Location** - Display and track user's current geolocation
- 🎨 **Responsive Sidebar** - Collapsible sidebar navigation with mobile support

### Technical Features

- ✅ Server-Side Rendering (SSR) with TanStack Start
- ✅ File-based routing with TanStack Router
- ✅ Type-safe data fetching with TanStack Query
- ✅ Beautiful UI components with shadcn/ui
- ✅ Tailwind CSS v4 for styling
- ✅ JWT Authentication with secure session management
- ✅ Password reset flow (forgot & reset password)
- ✅ Form validation with Zod
- ✅ Type-safe forms with TanStack Form
- ✅ State management with Zustand (persisted map state)
- ✅ Geolocation API integration

## Tech Stack

- **Framework**: TanStack Start (React SSR)
- **Routing**: TanStack Router
- **Data Fetching**: TanStack Query
- **UI Components**: shadcn/ui + Base UI
- **Styling**: Tailwind CSS v4
- **Forms**: TanStack Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Icons**: Tabler Icons React
- **Notifications**: Sonner
- **Map Library**: MapLibre GL
- **State Management**: Zustand (with persistence)
- **Build Tool**: Vite

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure API endpoint:

   The API endpoint is configured in `src/utils/api.ts`. By default, it points to:

   ```
   http://localhost:4000/api/v1
   ```

   You can modify this or use environment variables to configure your API endpoint.

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
pnpm dev              # Start development server with hot reload (http://localhost:3000)
pnpm preview          # Preview production build locally

# Build
pnpm build            # Build for production

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm check            # Format and lint code (prettier + eslint --fix)

# Testing
pnpm test             # Run tests with Vitest
```

## Development

The development server runs on `http://localhost:3000` by default. The server is configured to accept connections from any host (`0.0.0.0`), making it accessible from other devices on your network.

### Hot Module Replacement (HMR)

TanStack Start provides fast HMR for a smooth development experience. Changes to your code will be reflected immediately in the browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── app/            # App-specific components (sidebar, logo)
│   ├── auth/           # Authentication layout wrapper
│   ├── map/            # Map-related components (container, controls)
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
│   ├── use-geolocation/ # Geolocation hook
│   ├── use-is-mobile/   # Mobile detection hook
│   └── use-map/         # Map instance hook
├── models/             # TypeScript type definitions
├── modules/            # Feature modules
│   ├── auth/           # Authentication module (sign-in, password reset)
│   ├── map/            # Map module (search, filters, user location)
│   └── profile/        # User profile module
├── providers/          # React context providers
├── queries/            # API query/mutation hooks
├── routes/             # TanStack Router routes (file-based routing)
├── schemas/            # Zod validation schemas
├── stores/             # Zustand state stores
│   ├── auth.ts         # Authentication state
│   └── map.ts           # Map state (zoom, instance)
├── utils/              # Utility functions
│   ├── api.ts          # Axios API client configuration
│   └── ui.ts            # UI utility functions
└── styles.css          # Global styles
```

## Routes

### Public Routes

- `/` - Home page (Interactive map with search and filters)
- `/auth/sign-in` - Sign in page
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password` - Reset password page

### Protected Routes (Requires Authentication)

- `/profile` - User profile page

## API Integration

The application connects to the Elysia GIS API backend. The API client is configured in `src/utils/api.ts` using Axios.

**Default API URL**: `http://localhost:4000/api/v1`

The API client is configured with:

- Base URL for all API requests
- Credentials included in requests (cookies for authentication)

To change the API endpoint, modify the `baseURL` in `src/utils/api.ts`:

```typescript
export const api = axios.create({
  baseURL: 'YOUR_API_URL_HERE',
  withCredentials: true,
});
```

See [Configuration](./docs/configuration.md) for more details.

## Map Features

The application includes a full-featured interactive map powered by MapLibre GL:

- **Map Navigation**: Zoom, pan, and rotate controls
- **Search**: Search for locations by area name
- **Filters**: Filter map data using the filter drawer
- **User Location**: Display and track the user's current geolocation
- **Persistent State**: Map zoom level is persisted in localStorage
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar

## License

MIT

## References

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
