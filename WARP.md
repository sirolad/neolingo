# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production app with Turbopack  
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Icon Generation
- `node scripts/generate-icons.js` - Generate SVG placeholder icons for PWA
- `node scripts/create-png-icons.js` - Create PNG icons (if script exists)

## Architecture Overview

### App Structure
This is a Next.js 15 app using the App Router pattern with TypeScript and Tailwind CSS. Key architectural decisions:

**PWA Configuration**: The app is configured as a Progressive Web App using `next-pwa` with offline caching strategies. PWA config is in `next.config.ts` with NetworkFirst caching for HTTP requests.

**Authentication System**: Uses a mock authentication system (`mockAuth.ts`) with localStorage persistence. The `AuthContext` provides authentication state management across the app with login/signup/logout functionality.

**UI Framework**: Built with shadcn/ui components (configured in `components.json`) using Radix UI primitives and Tailwind CSS for styling. Components follow the "new-york" style variant.

**Routing Structure**: App uses Next.js App Router with the following key routes:
- `/splash` - Entry point (redirects from root)
- `/signin`, `/signup` - Authentication flows
- `/language-setup`, `/neo-language-setup` - Onboarding flows
- `/home`, `/dictionary`, `/suggest`, `/vote` - Main app features

### Key Technical Details

**Styling System**: Custom Tailwind configuration with brand colors, custom animations, and design tokens specifically for the Yoruba language learning theme. All colors should reference CSS custom properties from `globals.css` instead of hardcoded values.

**Icon System**: All icons in this project should use `lucide-react` for consistency. Import icons from `lucide-react` and avoid using custom SVGs or other icon libraries unless absolutely necessary.

**Form Handling**: Uses React Hook Form with Zod validation schemas defined in `src/lib/schemas/auth.ts` for type-safe form validation.

**State Management**: React Context API for authentication state, with potential for additional contexts as the app grows.

**Development Features**:
- TypeScript strict mode enabled
- ESLint for code quality
- Turbopack for fast development builds
- Path aliases configured (`@/*` maps to `src/*`)

### Component Organization
- `/src/components/ui/` - Reusable shadcn/ui components
- `/src/components/` - Feature-specific components (EmailVerification, Onboarding, etc.)
- `/src/contexts/` - React contexts for global state
- `/src/lib/` - Utilities, schemas, and mock data
- `/src/app/` - Next.js App Router pages and layouts

### Mock Data System
The app uses a mock authentication system that simulates real backend behavior with:
- Predefined test users in `mockAuth.ts`
- Async simulation with delays
- localStorage persistence for development
- Social login simulation for Google/Apple

## Development Notes
- Do not implement a ui framework yourself, install it from shadcn/ui only custom implementation is allowed
- 

### Testing
No test framework is currently configured. When adding tests, check package.json for any test scripts that may be added later.

### Linting
The project uses ESLint with Next.js configuration. Always run `npm run lint` before committing changes.

### PWA Development
Icons are generated via scripts in the `/scripts` folder. The app includes comprehensive PWA metadata and offline support.