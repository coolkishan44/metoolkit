# Search System — Part 1

Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.
Assumption made: chose this stack over WordPress because Tool Pages / AI Tools /
Admin Panel need real filtering and dynamic routing — WordPress + plugins would
fight you here. If you want it WordPress-based instead, say so before we go further.

## What's in this part
- Project scaffold + config (`package.json`, `tailwind.config.ts`, `tsconfig.json`)
- Root layout with fonts, header, footer (`app/layout.tsx`)
- Homepage (`app/page.tsx`) — search hero, category chips, featured tools,
  AI tools spotlight, blog strip
- Reusable components: `Header`, `Footer`, `SearchBar`, `ToolCard`, `CategoryChip`, `SectionHeading`
- Mock data layer (`lib/data.ts`) — swap for a real DB/CMS later

## Design system
- Colors: paper `#FAFAF7`, ink `#1A1B23`, indigo `#2D5BFF` (primary), amber `#E8A33D` (secondary), muted `#6B6E7C`
- Type: Fraunces (display/headings), Inter (body/UI), JetBrains Mono (counts, tags, metadata)
- Signature element: the search bar as literal hero, with a live mono counter — reinforces "this is a search system," not a landing page template

## Run it locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Not built yet (comes in next parts)
- `/tools` listing + `/tools/[slug]` detail page
- `/ai-tools` listing
- `/blog` listing + `/blog/[slug]` post page
- `/admin` panel (auth, tool CRUD, blog CRUD)
- `/tools/submit` form (linked from header, not built yet)
