## Frontend - Task Management App

Project Overview

- This is the frontend for the Task Management web application built with React, Next.js, and TypeScript. It provides user authentication and a task management interface using Material-UI for the UI components and Redux Toolkit for state management.

Prerequisites: Before you begin, ensure you have the following installed

- Node.js (v16 or later)

- npm or yarn (latest version)

- Auth0 credentials for authentication

Setup Instructions

- Clone the Repository

```bash
git clone <frontend-repo-url>
cd <frontend-repo-folder>
```

- Install Dependencies

```bash
npm install
# or
yarn install

```

- Configure Environment Variables

Create a .env.local file in the root directory and add the following variables:

```bash
AUTH0_SECRET =
AUTH0_BASE_URL= 
AUTH0_CLIENT_ID = 
AUTH0_ISSUER_BASE_URL= 
AUTH0_CLIENT_SECRET = 
NEXT_PUBLIC_API_BACKEND 

```
- Run the Application

Start the development server:

```bash
npm run dev
# or
yarn dev

```
The app will be accessible at http://localhost:3000.

Features

- User authentication with Auth0

- Task creation, editing, deletion, and viewing

- Responsive design using Material-UI

- State management with Redux Toolkit

Deployment: Deploy to Vercel

- Configure the same environment variables in your hosting platform as listed in the .env.local file.

- Test the live application to ensure functionality.

Testing

- Run unit tests:

```bash
npm run test
or
yarn test

```
- Ensure the task creation form renders correctly and all required fields are validated.

