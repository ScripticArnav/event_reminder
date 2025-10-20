# Event Reminder App

Simple event reminder app with a React (Vite) frontend and a Node.js + Express backend using MongoDB.

---

## Tech stack
- Frontend: React, Vite, React Router, Framer Motion  
- Backend: Node.js, Express, Mongoose, cors, dotenv  
- Database: MongoDB Atlas  
- Deployment: Frontend on Vercel, Backend on Render

---

## Live deployments
- Frontend: https://event-reminder-ten.vercel.app/  
- Backend API base: https://event-reminder1.onrender.com/api

---

## Setup (run locally)

Prerequisites:
- Node.js >= 18, npm
- MongoDB Atlas connection string (or local MongoDB)

1. Clone repo and open workspace root:
   - cd c:\Users\Arnav\Downloads\event-reminder-app

2. Backend
   - cd event_reminder\backend
   - copy `.env` from `.env.example` (create if missing) and fill values:
     ```
     MONGO_URI=<your-mongo-uri>
     JWT_SECRET=<your_jwt_secret>
     FRONTEND_ORIGIN=https://localhost:5173   # or your frontend origin (no trailing slash)
     PORT=4000
     ```
   - install & run:
     - npm install
     - npm run dev    (or `node server.js` / `npm start` depending on scripts)

   - Health check:
     - curl -i http://localhost:4000/health  (or https://<deployed>/health)

3. Frontend
   - cd event_reminder\frontend
   - install & run:
     - npm install
     - npm run dev
   - Open http://localhost:5173

---

## Important notes / troubleshooting
- Ensure FRONTEND_ORIGIN in backend .env uses the exact origin (no trailing slash) used by the frontend; mismatched origin causes CORS failures.
- If Mongo URI password contains special chars (e.g. `@`, `:`), URL-encode them (%40, %3A, etc.) or wrap correctly in the Atlas connection string.
- If frontend shows "Cannot connect to server":
  - Check browser DevTools Network / Console for CORS or mixed-content errors.
  - Test backend directly:
    - curl -i https://event-reminder1.onrender.com/health
  - Check Render service logs for startup / Mongo errors.
- Server should bind to 0.0.0.0 on deployment. Local dev binds to localhost by default.

---

## Project structure (key files)
- backend/
  - server.js — Express app, routes registration, MongoDB connection
  - routes/
    - auth.js — auth endpoints
    - eventRoutes.js — event CRUD endpoints
  - .env — env vars (MONGO_URI, JWT_SECRET, FRONTEND_ORIGIN, PORT)
- frontend/
  - src/
    - main.jsx — app entry
    - utils/api.js — API client (base URL: https://event-reminder1.onrender.com/api)
    - components/ — React components and layout
  - package.json — Vite + React config

---

## Design choices
- Modular backend: routes and controllers separated for clarity and testability.
- REST API (JSON) to keep frontend/backend decoupled; auth via JWT in Authorization header.
- CORS configured to whitelist the frontend origin and allow non-browser clients (Postman, curl).
- Global CSS resets and container width used on frontend to prevent horizontal scroll and keep responsive layout.

---

If you want, I can add a `.env.example`, a health route (if missing), or a small troubleshooting script to verify connectivity quickly.
