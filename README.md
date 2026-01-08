# Scalable Web Application

A full-stack web application featuring authentication, dashboard, and task management built with React.js, Node.js, Express, and MongoDB.

## Features

### Frontend (React.js)
- ✅ Responsive design using TailwindCSS
- ✅ Forms with client-side validation
- ✅ Protected routes (login required for dashboard)
- ✅ User authentication (Login/Signup)
- ✅ Dashboard with user profile
- ✅ Task CRUD operations
- ✅ Search and filter functionality
- ✅ Modern, clean UI

### Backend (Node.js/Express)
- ✅ JWT-based authentication
- ✅ User signup/login APIs
- ✅ Profile fetching/updating APIs
- ✅ Task CRUD operations APIs
- ✅ MongoDB database integration
- ✅ Password hashing with bcrypt
- ✅ JWT authentication middleware
- ✅ Server-side validation
- ✅ Error handling

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- TailwindCSS
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Bcryptjs
- Express Validator
- CORS

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB:**
   - If using local MongoDB, ensure the service is running
   - Or update `MONGODB_URI` in `.env` to your MongoDB Atlas connection string

2. **Start the Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`

3. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

4. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`
   - Sign up for a new account or login with existing credentials

## Project Structure

```
scalable-web-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormInput.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── ProfileModal.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Profile
- `GET /api/profile/me` - Get current user profile (protected)
- `PUT /api/profile/me` - Update user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks for user (protected, supports query params: status, priority, search)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected API routes with authentication middleware
- Input validation on both client and server side
- Error handling and sanitization
- CORS configuration

## Scalability Features

- Modular code structure
- Separation of concerns (routes, models, middleware)
- Reusable components
- Efficient database queries with indexing
- RESTful API design
- Environment-based configuration

## Development

- Backend uses nodemon for auto-reload during development
- Frontend uses Vite for fast development builds
- Both frontend and backend have proxy configuration for seamless API calls

## License

ISC
