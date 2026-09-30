# Digital Wedding Invitation

A public, sanitized source version of an interactive wedding invitation built with Next.js, React, TypeScript, and an RSVP data model designed for Cloudflare D1.

## What It Demonstrates

- Animated envelope-opening interaction
- Live countdown
- Responsive invitation UI
- RSVP form state and submission flow
- Server-side validation structure
- Drizzle ORM schema for RSVP persistence
- Cloudflare D1-oriented database design
- Mobile and reduced-motion support

## Tech Stack

- Next.js
- React
- TypeScript
- Drizzle ORM
- SQLite / Cloudflare D1 model
- CSS

## Project Structure

```text
app/
├── api/rsvp/route.ts
├── globals.css
├── layout.tsx
└── page.tsx

db/
└── schema.ts

drizzle/
└── 0000_create_rsvps.sql
```

## Privacy Note

This public portfolio repository intentionally removes private venue details and deployment-specific configuration from the original invitation project.

## Run Locally

```bash
git clone https://github.com/khubaibrazi/Digital-invitation-t.git
cd Digital-invitation-t
npm install
npm run dev
```

## Author

**Khubaib Razi**

- GitHub: https://github.com/khubaibrazi
