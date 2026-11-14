# The Elegance Hotel website (theelegance.co.in)

Next.js 16 (App Router, React 19) front end. Content (rooms excepted) comes from an external backend; see `src/lib/config.js`.

## Run
```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Configuration
- `NEXT_PUBLIC_API_BASE` - backend API base URL (defaults to the current production backend in `src/lib/config.js`).

## Where things live
- `src/app` - routes. Room pages use `src/data/roomsData.js`; blog, places, gallery, facilities and banquets come from the API.
- `src/app/api/enquiry/route.js` - server route all three enquiry forms post to (honeypot, minimum fill time, validation, rate limit) before forwarding to the backend.
- `src/utils/metadata.js` - `buildMetadata()` for titles, canonical, Open Graph, Twitter. `src/lib/seo.js` - JSON-LD builders. `src/lib/siteInfo.js` - address/phone/email used by footer, contact page and schema.
- `public/assets` - template CSS/JS and images.

## Deploy
Pushing to `main` runs `.github/workflows/deploy.yml`: SSH to the MilesWeb server, `git pull`, `npm install`, `npm run build`, restart PM2 (`hotel-elegance`). The script stops on the first error.
