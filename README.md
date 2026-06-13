# Delphi MVP

> One platform for B2B institutions — connecting schools & colleges with premium workshops, training, and internships.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Styling | Tailwind CSS |
| Database + Auth | Supabase |
| Payments | Razorpay |
| Hosting | Vercel |

---

## Project Structure

```
delphi-mvp/
├── src/
│   ├── pages/
│   │   ├── index.tsx          # Landing page + lead form
│   │   ├── programs.tsx       # Browse all programs
│   │   ├── dashboard.tsx      # Institution dashboard
│   │   ├── login.tsx          # Auth (login + signup)
│   │   └── book/[id].tsx      # Book a program + Razorpay payment
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client
│   │   ├── types.ts           # TypeScript types
│   │   └── schema.sql         # DB schema (run in Supabase)
│   └── styles/
│       └── globals.css
├── .env.local.example         # Environment variables template
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## Setup Guide

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Set up Supabase
1. Go to https://supabase.com and create a new project
2. In the SQL Editor, paste and run the contents of `src/lib/schema.sql`
3. Copy your project URL and anon key from Project Settings → API

### Step 3: Set up environment variables
```bash
cp .env.local.example .env.local
```
Fill in your values in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY` — from Supabase project settings
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — from https://dashboard.razorpay.com
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — same as RAZORPAY_KEY_ID
- `RESEND_API_KEY` — from https://resend.com

### Step 4: Run locally
```bash
npm run dev
```
Visit http://localhost:3000

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with lead capture form |
| `/programs` | Browse all available programs |
| `/book/[id]` | Book a specific program + Razorpay payment |
| `/login` | Sign in / Sign up |
| `/dashboard` | Institution dashboard with bookings |

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all `.env.local` values to Vercel's environment variable settings.

---

## Supabase Auth Setup

In Supabase Dashboard → Authentication → URL Configuration:
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/dashboard`

---

## Domain + Email

1. Register `delphi.in` or `getdelphi.com` on Namecheap
2. Point DNS to Vercel (add Vercel's nameservers)
3. Set up Zoho Mail (free) for `hello@delphi.in`
4. Add MX records from Zoho to your domain DNS

---

## Next Steps (post-MVP)

- [ ] Admin panel to manage leads and bookings
- [ ] Email notifications via Resend when a booking is made
- [ ] Institution onboarding flow (multi-step form)
- [ ] Analytics dashboard with charts
- [ ] Multi-campus support
- [ ] Program review/rating system
