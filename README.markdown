# Peer Learning Tracker Lite

A minimal full-stack web app for users to join learning groups and track their learning goals.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React Context
- **Backend**: Node.js, Express, MongoDB
- **Auth**: JWT
- **Deployment**: Vercel (frontend), Render (backend) [Optional]

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   ```
2. **Backend Setup**:
   - Navigate to `server`:
     ```bash
     cd server
     npm install
     ```
   - Create a `.env` file (see `.env.example`).
   - Start the backend:
     ```bash
     npm run dev
     ```
3. **Frontend Setup**:
   - Navigate to `client`:
     ```bash
     cd client
     npm install
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```
4. **MongoDB**:
   - Ensure MongoDB is running locally or use MongoDB Atlas.
   - Update `MONGO_URI` in `server/.env`.

## API Endpoints
- `POST /api/auth/register`: Register a user.
- `POST /api/auth/login`: Login and get JWT.
- `GET /api/groups`: List groups (protected).
- `POST /api/groups/join/:groupId`: Join a group.
- `POST /api/goals`: Create a goal.
- `GET /api/goals`: List user’s goals.

## Screenshots
- Located in `/screenshots` folder.