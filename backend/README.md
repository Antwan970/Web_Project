# Job Portal Backend

A Node.js backend for a job portal application built with Express, MongoDB, and JWT authentication.

## Features

- User authentication (register/login)
- User roles (jobseeker, employer)
- Job posting and management
- Job applications
- User profiles

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure MongoDB in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_secret_key
PORT=5000
```

3. Run the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (employer only)
- `POST /api/jobs/:id/apply` - Apply to job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Authentication

Include token in request header:
```
x-auth-token: <your_token>
```