# Freelance Platform

A web-based freelance marketplace project that connects clients with freelancers.  
The platform allows users to register, log in, view available jobs, create new jobs, and manage users through an admin page.

## Project Overview

This project is designed as a simple freelance website where clients can post jobs and freelancers can explore opportunities. The system includes authentication, job management, and basic admin functionality.

## Main Features

- User registration
- User login
- Authentication context for managing logged-in users
- Home page with project introduction
- Job creation page
- Admin dashboard
- Responsive frontend design
- Separate CSS files for clean styling

## Technologies Used

### Frontend

- React.js
- JavaScript JSX
- CSS
- React Router

### Tools

- VS Code
- Git
- GitHub
- npm

## Project Structure

```text
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── Admin.jsx
│   │   ├── CreateJob.jsx
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   └── Register.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── styles/
│   │   ├── Admin.css
│   │   ├── Auth.css
│   │   ├── global.css
│   │   ├── Home.css
│   │   ├── Jobs.css
│   │   └── Navbar.css
│   │
│   ├── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

## Pages Description

### Home Page

The home page introduces the freelance platform and provides navigation to the main features.

### Login Page

Allows registered users to log in to their accounts.

### Register Page

Allows new users to create an account.

### Create Job Page

Allows users or clients to create and publish a new freelance job.

### Jobs Page

Displays available jobs for freelancers.

### Admin Page

Allows the admin to manage users and view platform statistics.

## Team Work Division

### Member 1

Responsible for:

- Home page
- Main layout
- Home page styling

### Member 2

Responsible for:

- Login page
- Register page
- Authentication context
- Authentication styling

### Member 3

Responsible for:

- Admin page
- Create job page
- Job-related styling

## How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/USERNAME/REPOSITORY-NAME.git
```

2. Open the project folder:

```bash
cd REPOSITORY-NAME
```

3. Open the frontend folder:

```bash
cd frontend
```

4. Install dependencies:

```bash
npm install
```

5. Run the project:

```bash
npm run dev
```

6. Open the local server link shown in the terminal.

Usually it will be:

```text
http://localhost:5173
```

## GitHub Notes

To push selected files only, do not use:

```bash
git add .
```

Instead, add only the required files, for example:

```bash
git add frontend/src/components/Admin.jsx
git add frontend/src/components/CreateJob.jsx
git add frontend/src/components/Home.jsx
git add frontend/src/components/Login.jsx
git add frontend/src/context/AuthContext.jsx
git add frontend/src/styles/Admin.css
git add frontend/src/styles/Home.css
git add frontend/src/styles/Auth.css
```

Then commit and push:

```bash
git commit -m "Add frontend pages and auth context"
git push -u origin main
```

## Future Improvements

- Add freelancer profiles
- Add job applications
- Add search and filtering for jobs
- Add backend database connection
- Add admin controls for deleting or approving jobs
- Improve UI animations and responsiveness

## Project Goal

The goal of this project is to build a simple and organized freelance platform using React. It helps students practice frontend development, routing, authentication handling, component structure, and teamwork using GitHub.
