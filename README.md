# FightReady

Premium recovery and readiness tracking for combat sports athletes.

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Charts:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Validation:** [Zod](https://zod.dev/)
- **AI:** [OpenAI API](https://openai.com/)

## Getting Started

### 1. Clone the repository and install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Supabase and OpenAI credentials.

### 3. Initialize the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the development server

```bash
npm run dev
```

## Core Features

- **Recovery Score:** Deterministic score (0-100) based on Sleep, HRV, Resting HR, Training Load, and Subjective Energy.
- **Fight Readiness:** Holistic readiness indicator incorporating long-term training trends.
- **Training Log:** Specialized logger for combat sports (Boxing, BJJ, MMA, etc.).
- **AI Coach:** Weekly insights and performance analysis using OpenAI.
- **Sleep Detective:** Deep pattern analysis to optimize recovery through better sleep.
- **Data Import:** Sync Apple Health data via XML export.

## Scalable Folder Structure

- `src/app`: Routes and pages.
- `src/components`: UI components (atomic, layout, feature-specific).
- `src/lib`: Core logic (recovery engine, database clients, utilities).
- `src/hooks`: Custom React hooks.
- `src/services`: API and database services.
- `src/types`: TypeScript definitions.
