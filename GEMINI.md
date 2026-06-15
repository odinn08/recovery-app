# GEMINI.md — Alcohol Tracker Design System

This file defines the visual design language for this project. Always follow these guidelines when creating or editing UI components.

## Stack
- Next.js 15 (App Router)
- Tailwind CSS 4
- TypeScript
- Lucide React (icons)
- Recharts (charts)
- Supabase (data, realtime)

## Theme: Dark, Vibrant, Mobile-First

### Layout
- Constrain main content to `max-w-[480px] mx-auto` so it feels like a mobile app even on desktop.
- Background: `bg-[#0E0E16]` (deep navy-charcoal, never pure black).
- Use `min-h-screen` with vertical padding `py-6 px-4`.
- Cards use generous spacing: `p-4 rounded-2xl mb-3`.

### Colors
- Background base: `#0E0E16`
- Card background: `#1A1A28` with `border border-white/5`
- Beer accent: amber/gold — `#F5A623` (use for beer icons, progress segments, gradients)
- Rosé accent: pink — `#F472B6` (use for rosé icons, progress segments)
- Primary text: `#FFFFFF`
- Secondary/muted text: `#9CA3AF` (gray-400)
- Gradient accents: use `bg-gradient-to-r from-[#F5A623] to-[#F472B6]` for highlights, buttons, progress fills

### Typography
- Use `font-sans` with a rounded modern feel — import `Outfit` or `Plus Jakarta Sans` from `next/font/google` and apply globally.
- Headings: bold, `text-2xl` to `text-3xl`, tight letter spacing (`tracking-tight`).
- Stats/numbers: `font-bold tabular-nums` so digits align.
- Subtext: `text-sm text-gray-400`.

## Components

### Leaderboard Card
- Rounded card (`rounded-2xl`), dark background, subtle border glow on hover/update (`ring-1 ring-white/10`, transition to `ring-amber-400/40` briefly when count updates).
- Rank badge (left side, `w-10 h-10 rounded-full flex items-center justify-center`):
  - #1: gradient gold background + 👑 emoji
  - #2: silver gradient (`from-gray-300 to-gray-400`) with "2"
  - #3: bronze gradient (`from-orange-700 to-orange-500`) with "3"
  - Others: `bg-white/5` with rank number
- Player name: `text-lg font-bold text-white`
- Drink counter bar below name:
  - Horizontal row of small rounded segments (`w-2 h-2 rounded-full` or thin pill segments), one per drink
  - Beer drinks render amber segments, rosé drinks render pink segments
  - Wrap segments in a flex-wrap container with `gap-1`
  - On new drink logged, animate the new segment with `animate-in scale-in` (or a custom keyframe pop/pulse)
- Subtext: `"{total} total • {today} today"` in `text-xs text-gray-400`

### Log Drink Button
- Pill-shaped: `rounded-full px-5 py-2.5`
- Gradient background: `bg-gradient-to-r from-[#F5A623] to-[#F472B6]`, white bold text
- Icon: 🍺 or 🥂 (lucide `Beer` / `Wine` icons work too) — `flex items-center gap-2`
- Press animation: `active:scale-95 transition-transform duration-150`
- Subtle glow shadow: `shadow-lg shadow-amber-500/20`

### Drink Logging Modal
- Dark card: `bg-[#1A1A28] rounded-3xl p-6 border border-white/10`
- Backdrop: `bg-black/60 backdrop-blur-sm`
- Drink type toggle (Beer / Rosé): two large pill buttons side by side, selected one filled with its accent gradient + glow, unselected is `bg-white/5 text-gray-400`
- Brand selection: grid of rounded pill buttons (`rounded-xl px-3 py-2 text-sm`), selected brand gets accent border + slight background tint matching drink type color
- Confirm button: full-width gradient pill matching Log Drink button style

### Bottom Stats Bar
- Fixed to bottom: `fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[448px]`
- Glassmorphism: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3`
- Two stats side by side with icons: Lucide `Beer` icon (amber) + count, `Wine` icon (pink) + count
- `flex justify-between items-center`

## Animation
- Use Tailwind's `transition-all duration-300 ease-out` as default for state changes.
- For "new drink logged" feedback: brief scale pulse (`scale-110` then back to `scale-100`) on the affected card and counter bar segment.
- Confetti or celebratory animation at milestones (5, 10, 15 drinks) — keep existing logic, just restyle the confetti colors to match the amber/pink palette.

## General Rules
- Never use pure black (`#000`) or pure white (`#FFF`) as flat backgrounds — always use the defined dark/light tones above for depth.
- Maintain consistent border radius across all components (`rounded-2xl` for cards, `rounded-full` for buttons/badges).
- Keep all existing Supabase data logic, realtime subscriptions, and routing untouched — this file governs visuals/UX only.
