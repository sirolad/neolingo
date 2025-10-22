# Neolingo App

[![CI](https://github.com/sirolad/neolingo-app/actions/workflows/ci.yml/badge.svg)](https://github.com/sirolad/neolingo-app/actions/workflows/ci.yml)
[![Deploy](https://github.com/sirolad/neolingo-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/sirolad/neolingo-app/actions/workflows/deploy.yml)
[![Dependency Update](https://github.com/sirolad/neolingo-app/actions/workflows/dependency-update.yml/badge.svg)](https://github.com/sirolad/neolingo-app/actions/workflows/dependency-update.yml)

A modern language learning application built with Next.js 15, TypeScript, and Tailwind CSS. This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- 🚀 **Next.js 15** with App Router and Turbopack
- 🎨 **Modern UI** with shadcn/ui components and Tailwind CSS
- 🔐 **Authentication** with Supabase (planned migration from mock auth)
- 📱 **PWA Support** with offline capabilities
- 🌍 **Multi-language** support for language learning
- 📚 **Dictionary** and word suggestion system
- 🗳️ **Voting system** for community-driven content
- 🎯 **TypeScript** for type safety
- 🧪 **Automated CI/CD** with GitHub Actions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI
- **Authentication**: Supabase (planned)
- **Database**: Supabase (planned)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sirolad/neolingo-app.git
cd neolingo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production app with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── auth/              # Authentication components
│   └── layout/            # Layout components
├── contexts/              # React contexts
├── lib/                   # Utilities and configurations
│   ├── schemas/           # Zod validation schemas
│   └── supabase/          # Supabase client configuration
└── types/                 # TypeScript type definitions
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- **CI Workflow**: Runs on every push and PR, includes linting, type checking, building, and security audits
- **Deploy Workflow**: Automatically deploys to Vercel on main branch pushes
- **Dependency Update**: Weekly automated dependency updates with PR creation

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
