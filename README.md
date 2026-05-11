# Co_Code — Real-Time Collaborative Code Editor

Co_Code is a full-stack, real-time collaborative coding platform where developers can create or join rooms, write and execute code together, chat live, and share room access via email.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Server Setup](#2-backend-server-setup)
  - [3. WebSocket Server Setup](#3-websocket-server-setup)
  - [4. Email Server Setup](#4-email-server-setup)
  - [5. Frontend Setup](#5-frontend-setup)
  - [6. Code Executor Setup](#6-code-executor-setup)
- [Running the Project](#running-the-project)
- [API Reference](#api-reference)
- [WebSocket Events](#websocket-events)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-Time Code Collaboration** — Multiple users can write and edit code simultaneously in a shared room.
- **Code Execution** — Run JavaScript, Python, C++, and Java code directly in the browser with custom input support.
- **Group Chat** — Live in-room group messaging using WebSockets.
- **Room Management** — Create rooms, join via room code, manage participants.
- **File Upload** — Upload a local file and sync its content across all room participants.
- **Email Invitations** — Send room access codes to collaborators via email.
- **User Authentication** — Register and login with JWT-based authentication.
- **Online Status** — See who is currently active inside a room.
- **Language Selection** — Switch between multiple programming languages in the editor.
- **Persistent Storage** — Room data (messages, code contents, participants) is stored in MongoDB.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, CodeMirror, Socket.IO Client, Axios |
| Backend API | Node.js, Express, Mongoose, JWT, dotenv |
| WebSocket Server | Node.js, Express, Socket.IO, Multer |
| Code Executor | Node.js, Express, child_process (node, python, g++, javac) |
| Email Server | Node.js, Express, Nodemailer (Gmail) |
| Database | MongoDB (via Mongoose) |

---

## Project Structure

```
Major-Project-2-Co_Code-main/
│
├── backend_server/              # REST API server
│   ├── controllers/
│   │   ├── handleFlushRoom.js   # Flush room data to DB
│   │   ├── room-controller.js   # CRUD for rooms
│   │   └── user-controller.js   # Register / Login
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── errorHandler.js      # Global error handler
│   ├── model/
│   │   ├── room.js              # Room Mongoose schema
│   │   └── user.js              # User Mongoose schema
│   ├── routers/
│   │   ├── executor-server.js   # Code execution endpoint (port 2000)
│   │   ├── room-router.js       # Room API routes
│   │   ├── user-router.js       # User API routes
│   │   └── webSocketRouter.js   # WebSocket helper route
│   └── server.js                # Express entry point
│
├── webSocket_server/            # Real-time WebSocket server
│   ├── temp_db/
│   │   └── roomMap.js           # In-memory room state manager
│   └── server.js                # Socket.IO server entry point
│
├── email/                       # Email notification server
│   └── index.js                 # Nodemailer email sender
│
└── frontend/                    # React application
    ├── public/
    │   └── ScreenShots/         # App screenshots
    └── src/
        ├── components/          # Navbar, Footer, Card, Contact, LanguageSelector
        ├── context/             # React contexts (chat, file, room)
        ├── pages/               # Home, Login, SignUp, JoinRoom, Features, Chat, Editor
        ├── services/            # Axios API calls
        ├── socketUtils/         # Socket.IO client setup
        ├── store/               # Auth state (JWT token)
        └── App.jsx              # Root component with routing
```

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Python** 3.x — required for running Python code in the executor
- **g++ / GCC** — required for running C++ code in the executor
- **Java JDK** (javac + java) — required for running Java code in the executor
- **Gmail account** with an [App Password](https://support.google.com/accounts/answer/185833) — required for the email server

---

## Environment Variables

Each service needs its own `.env` file. Create these files before starting.

### `backend_server/.env`

```env
PORT=5000
MONGO=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET_KEY=your_jwt_secret_key
WEBSOCKET_SERVER_URL=http://localhost:8000
```

### `webSocket_server/.env`

```env
PORT=8000
BACKEND_URL=http://localhost:5000
JWT_SECRET_KEY=your_jwt_secret_key
```

### `email/.env`

```env
PORT=4000
EMAIL=your_gmail_address@gmail.com
PASSWORD=your_gmail_app_password
```

### `frontend/.env`

```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_WEBSOCKET_URL=http://localhost:8000
REACT_APP_EMAIL_URL=http://localhost:4000
REACT_APP_EXECUTOR_URL=http://localhost:2000
```

> **Note:** Never commit `.env` files to version control. Add them to `.gitignore`.

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Major-Project-2-Co_Code.git
cd Major-Project-2-Co_Code
```

---

### 2. Backend Server Setup

The backend handles user authentication and room management via REST API.

```bash
cd backend_server
npm install
```

Create the `.env` file as described in the [Environment Variables](#environment-variables) section, then start the server:

```bash
npm start
```

The backend runs on **http://localhost:5000** by default.

---

### 3. WebSocket Server Setup

The WebSocket server handles real-time code sync, chat messages, and online status.

```bash
cd ../webSocket_server
npm install
```

Create the `.env` file, then start the server:

```bash
npm start
```

The WebSocket server runs on **http://localhost:8000** by default.

---

### 4. Email Server Setup

The email server sends room invitation codes to collaborators.

```bash
cd ../email
npm install
```

Create the `.env` file with your Gmail credentials, then start the server:

```bash
npm start
```

The email server runs on **http://localhost:4000** by default.

> **Gmail App Password:** In your Google account, go to **Security → 2-Step Verification → App passwords** and generate a password for "Mail". Use that as the `PASSWORD` value in your `.env`.

---

### 5. Frontend Setup

The React frontend provides the full user interface.

```bash
cd ../frontend
npm install
```

Create the `.env` file, then start the development server:

```bash
npm start
```

The frontend runs on **http://localhost:3000** by default.

---

### 6. Code Executor Setup

The code executor is a separate Express server that runs user-submitted code. It is located inside `backend_server/routers/executor-server.js` and runs on **port 2000**.

Open a separate terminal:

```bash
cd backend_server/routers
node executor-server.js
```

> **Important:** The executor uses your system's local runtimes. Ensure `node`, `python`, `g++`, and `java` / `javac` are available in your system PATH.

---

## Running the Project

You need **five terminals** running simultaneously:

| Terminal | Command | Port |
|---|---|---|
| 1 — Backend API | `cd backend_server && npm start` | 5000 |
| 2 — WebSocket Server | `cd webSocket_server && npm start` | 8000 |
| 3 — Email Server | `cd email && npm start` | 4000 |
| 4 — Code Executor | `cd backend_server/routers && node executor-server.js` | 2000 |
| 5 — Frontend | `cd frontend && npm start` | 3000 |

Once all services are running, open your browser and navigate to:

```
http://localhost:3000
```

---

## API Reference

All API routes are prefixed with `/api`.

### User Routes — `/api/user`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/user/register` | Register a new user | No |
| POST | `/api/user/login` | Login and receive JWT token | No |

### Room Routes — `/api/room` *(JWT required)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/room/create` | Create a new room |
| GET | `/api/room/:roomId` | Get room details |
| PUT | `/api/room/:roomId` | Update room (code/messages) |
| DELETE | `/api/room/:roomId` | Delete a room (creator only) |
| POST | `/api/room/join/:roomId` | Join an existing room |

### Code Executor — runs on port 2000

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/run` | `{ code, language, input }` | Execute code and return output |

Supported languages: `javascript`, `python`, `cpp`, `java`

### Email Server — runs on port 4000

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/send-room-code` | `{ email, roomCode, creator }` | Send room invite email |

---

## WebSocket Events

The WebSocket server (Socket.IO) handles the following events:

### Client → Server (emit)

| Event | Payload | Description |
|---|---|---|
| `join-room` | `(roomObj, username)` | Join a collaboration room |
| `leave-room` | `(roomId, username)` | Leave a room |
| `code-change` | `(roomId, code)` | Broadcast code update |
| `send-message` | `{ roomId, username, text }` | Send a chat message |
| `room-sync` | `roomObj` | Sync full room context |
| `status-change` | `onlineMap` | Update online status |

### Server → Client (on)

| Event | Payload | Description |
|---|---|---|
| `code-sync` | `code` | Receive live code updates |
| `receive-message` | `messageObj` | Receive a chat message |
| `roomContext-sync` | `roomObj` | Receive full room state |
| `status-sync` | `onlineList` | Receive online users list |
| `leave-notification` | `username` | A user has left the room |

### File Upload (HTTP POST to WebSocket server)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/upload` | Upload a file and sync content to all room participants via `code-sync` |

---

## Screenshots

| Screen | Preview |
|---|---|
| Home | `frontend/public/ScreenShots/Home.png` |
| Register | `frontend/public/ScreenShots/register.png` |
| Login | `frontend/public/ScreenShots/login.png` |
| Create Room | `frontend/public/ScreenShots/CreateRoom.png` |
| Join Room | `frontend/public/ScreenShots/JoinRoom.png` |
| Joined via Code | `frontend/public/ScreenShots/JoinedUsingCode.png` |
| Code Editor | `frontend/public/ScreenShots/CodeSync1.png` |
| Code Sync | `frontend/public/ScreenShots/CodeSync2.png` |
| Code Runner | `frontend/public/ScreenShots/CodeRunner.png` |
| Group Chat | `frontend/public/ScreenShots/Chat1.png` |
| Collaborators | `frontend/public/ScreenShots/Collaborators.png` |
| Language Selection | `frontend/public/ScreenShots/LanguageSelection.png` |
| File Open | `frontend/public/ScreenShots/FileOpen.png` |
| Settings | `frontend/public/ScreenShots/Setting.png` |

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

---

## License

This project is licensed under the **ISC License**.