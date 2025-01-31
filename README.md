# Service_Oriented_Architecture_Projet_App

# Project Overview

This is a modular application that enables users to manage authentication, profiles, and messaging in a distributed environment based on micro-frontends. The application is built using modern frameworks and tools to ensure scalability, maintainability, and performance.

## Features
- User authentication (registration, login, token management)
- User profile management (search, view profiles)
- Messaging system for conversations between users
- Micro-frontend architecture for better modularity and team collaboration
- Backend API to handle business logic and data persistence

## Technologies Used

### Backend:
- **Framework**: NestJS
- **Language**: TypeScript
- **Security**: JWT for authentication
- **Database**: MongoDB

### Frontend:
- **Framework**: Angular
- **Architecture**: Module Federation with micro-frontends
- **Monorepo Tool**: NX

### Deployment:
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Load balancing**: NGINX

## Prerequisites
- **Docker** and **Docker Compose** installed on your system.
- A `.env` file for backend configuration (detailed below).

## Setting up the Environment

To run the application, you need to create a `.env` file in the `backend` directory with the following environment variables:

```env
JWT_SECRET=example_of_your_jwt_secret_key
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.bmdk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

> **Note:** Replace `<username>` and `<password>` and the cluster with your MongoDB credentials and customize the JWT secret as needed.

## How to Run the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-root>
   ```

2. Create the `.env` file in the `backend` directory as described above.

3. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
    - **Frontend**: Open `http://localhost:4200` in your browser.
    - **Backend API**: Open `http://localhost:3000` for API endpoints.

## Project Structure

```
project-root/
│
├── backend/                           # Backend Nest.js
│   ├── src/
│   │   ├── auth/                      # Authentication (JWT)
│   │   ├── users/                     # User and profile management
│   │   ├── messages/                  # Conversation/message management
│   │   ├── app.module.ts              # Main configuration
│   │   └── ...                        # Other backend files
│   ├── package.json                   # Backend dependencies
│   ├── nest-cli.json                  # NestJS config
│   └── tsconfig.json                  # TypeScript config
│
├── frontend/
│   ├── apps/                           # All Angular applications (host and remotes)
│   │   ├── microfrontend-shell/        # Main app (host)
│   │   ├── auth/                       # Auth micro frontend (remote)
│   │   ├── users/                      # Users micro frontend (remote)
│   │   └── messages/                   # Messages micro frontend (remote)
│   │
│   ├── nx.json                         # Main NX config (cache, dependency graphs, etc.)
│   ├── package.json                    # Global dependencies
│   ├── tsconfig.base.json              # Global TypeScript config
│   ├── webpack.config.js               # Webpack config if needed (optional at the root level)
│   ├── workspace.json                  # NX workspace config (targets apps/libs and their commands)
│
├── docker/                            # (Optional) Containerization files
│   ├── Dockerfile.backend             # Dockerfile for the backend
│   ├── Dockerfile.frontend-shell      # Dockerfile for the main shell
│   ├── Dockerfile.frontend-auth       # Dockerfile for the auth micro frontend
│   ├── Dockerfile.frontend-users      # Dockerfile for the users micro frontend
│   ├── Dockerfile.frontend-messages   # Dockerfile for the messages micro frontend
│   └── nginx.conf
│
├── UML_C4.md                          # UML diagrams for the project
├── docker-compose.yml                 # Docker Compose to orchestrate backend/frontend
└── README.md                          # Project documentation
```

## Example User Flow

1. A user accesses the application through the frontend shell.
2. The frontend redirects the user to the authentication micro-frontend for login or registration.
3. After authentication, the JWT is stored locally and used for backend communication.
4. The user navigates to the profile or messaging sections to perform actions like viewing profiles, searching, or chatting.

