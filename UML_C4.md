# UML C4 Documentation for the Project

## UML Diagram
<img width="776" alt="image" src="https://github.com/user-attachments/assets/260e9ec5-a588-4c92-8232-f6ba719bd90d" />


## Context Diagram (Level 1)

The system is a modular application that allows users to manage authentication, profiles, and messages in a distributed environment based on micro-frontends. Here are the key entities:

- **End User**: Interacts with the frontend to sign up, log in, search for users, and exchange messages.
- **Database**: Stores user data, messages, and other critical information.
- **Backend (NestJS)**: Provides APIs for managing users, authentication, and messages.
- **Frontend (Angular with Module Federation)**: Includes a primary shell and several independent micro-frontends (auth, users, messages).

---

## Container Diagram (Level 2)

### Key Containers

1. **Frontend Shell (microfrontend-shell)**:
    - The main application orchestrating the micro-frontends.
    - Includes navigation and primary routing.
    - Connects to Auth, Users, and Messages containers.

2. **Micro-frontends (Auth, Users, Messages)**:
    - **Auth**: Handles login and registration functionalities.
    - **Users**: Manages user profiles and search features.
    - **Messages**: Handles conversations and messaging.

3. **Backend (NestJS)**:
    - Manages the following services:
        - **AuthService**: JWT validation and session management.
        - **UserService**: User data management.
        - **MessageService**: Conversations and messages handling.
    - Exposes REST endpoints.

4. **Database**:
    - Unified database used by the backend for data persistence.

5. **Docker**:
    - Containerizes the backend and each frontend component for simplified deployment, while also running Kafka and NGINX for orchestration.

---

## Component Diagram (Level 3)

### Backend Components

1. **AuthService** (`auth/` module):
    - Provides endpoints for authentication (login, signup, refresh token).
    - Uses JWT for secure sessions.

2. **UserService** (`users/` module):
    - Provides endpoints for user profile management (CRUD).
    - Integrated with the database via an ORM (e.g., TypeORM).
    - Includes user search functionality.

3. **MessageService** (`messages/` module):
    - Provides endpoints for sending and receiving messages.
    - Includes business logic for managing conversations.

4. **AppModule**:
    - Root module importing and configuring other modules.

### Frontend Components

1. **Shell (microfrontend-shell)**:
    - Manages global routing and communication between micro-frontends.
    - Integrates micro-frontends exposed via Module Federation.

2. **Micro-frontends**:
    - **Auth**:
        - Components: `AuthComponent`, `LoginForm`, `RegisterForm`.
    - **Users**:
        - Components: `UsersComponent`, `ProfileForm`, `SearchBar`, `UserList`, `ContactPopup`.
    - **Messages**:
        - Components: `MessagesComponent`, `ConversationView`, `ChatComponent`, `MessagesList`.
        - Routes: `/messages`, `/messages/:username`, `?conversationId`.

---

## Technologies Used

### Backend:
- **Framework**: NestJS
- **Language**: TypeScript
- **Security**: JWT for authentication
- **Database**: MongoDB
- **Event streaming**: Kafka

### Frontend:
- **Framework**: Angular
- **Architecture**: Module Federation with micro-frontends
- **Monorepo Tool**: NX

### Deployment:
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Load balancing**: NGINX

---

## Example User Flow

1. A user accesses the application through the **Shell**.
2. The Shell redirects the user to the **Auth** micro-frontend for login.
3. Upon successful login, the JWT is stored locally and used for all subsequent backend requests.
4. The user navigates to the **Users** section to search for users in a specific city or to the **Messages** section to view conversations.
5. The micro-frontends communicate with the backend to fetch or send data.
