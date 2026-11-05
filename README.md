# CampusLoop (prototype)
Student-to-student campus marketplace: Buy / Rent / Donate. One React app: Homepage, role-based Login, Buyer side, Seller side, shared listings store.

## Run locally
npm install && npm run dev

## Deploy on Render
1. Push this folder to GitHub.
2. Render -> New -> **Static Site** -> pick the repo.
3. Build command: `npm install && npm run build`  |  Publish directory: `dist`
(Uses HashRouter, so no rewrite rules are needed.)

## Prototype notes
- Data (users, listings, requests, wishlist) lives in each browser's localStorage via `src/store.js`. It is NOT shared between devices.
- Passwords are stored unhashed in localStorage: DEMO ONLY. College email / student ID verification is NOT implemented.
- To go live, replace the functions in `src/store.js` with Supabase/Firebase calls; pages don't need to change.
- Sample listings are marked "Sample".
