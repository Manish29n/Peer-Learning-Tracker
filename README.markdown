Peer Learning Tracker Lite

A minimal full-stack web app for users to join learning groups and track their learning goals.

Tech Stack





Frontend: React (Vite), Tailwind CSS, React Context, react-toastify



Backend: Node.js, Express, MongoDB



Auth: JWT



Deployment: Vercel (frontend), Render (backend) [Yet to be completed]

Setup Instructions





Clone the repository:

git clone <repo-url>



Backend Setup:





Navigate to server:

cd server
npm install



Create a .env file (see .env.example):

MONGO_URI=mongodb://localhost:27017/peer-learning-tracker
JWT_SECRET=your-secret-key-123
PORT=5000



Start the backend:

npm run dev



Frontend Setup:





Navigate to client:

cd client
npm install



Create a .env file (see .env.example):

VITE_API_URL=http://localhost:5000



Start the frontend:

npm run dev



MongoDB:





Ensure MongoDB is running locally or use MongoDB Atlas.



Update MONGO_URI in server/.env.

API Endpoints





POST /api/auth/register: Register a user.



POST /api/auth/login: Login and get JWT.



GET /api/users/me: Get authenticated user’s data (including groups).



GET /api/groups: List all groups (protected).



POST /api/groups: Create a new group.



POST /api/groups/join/:groupId: Join a group.



POST /api/groups/leave/:groupId: Leave a group.



POST /api/goals: Create a goal.



GET /api/goals: List user’s goals.



PUT /api/goals/:id: Update a goal.



DELETE /api/goals/:id: Delete a goal.



PUT /api/goals/:id/complete: Mark a goal as completed.

Screenshots





Located in /screenshots folder.