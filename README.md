🚀 Real time collborative coding plateform for learning and professinal productvity

📌 Overview

The Real-Time Collaborative Coding Platform is a full-stack web application designed to enable developers, students, educators, and professional teams to collaborate on code in real time.

A simple full-stack real-time collaborative coding platform where multiple users can join a room and code together in real time.

Features
Real-time code collaboration
Create and join coding rooms
Live code synchronization
Real-time chat system
Secure authentication
Responsive UI
Tech Stack
Frontend
React.js
Tailwind CSS
JavaScript
Backend
Node.js
Express.js
Socket.IO
Database
MongoDB
Project Structure
project-folder/
│
├── client/      # Frontend
├── server/      # Backend
├── README.md
└── .env
How It Works
User creates a room
Other users join using Room ID
Users write code together
Code updates appear instantly for everyone
Users can communicate through chat
Installation Guide
Step 1: Clone Repository
git clone https://github.com/your-username/project-name.git
Step 2: Open Project Folder
cd project-name
Install Frontend
cd client
npm install
Install Backend

Open another terminal:

cd server
npm install
Environment Variables

Create .env file inside server folder:

PORT=5000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key
Run Backend
cd server
npm start

Backend runs on:

http://localhost:5000
Run Frontend

Open another terminal:

cd client
npm run dev

Frontend runs on:

http://localhost:5173
How to Run on Another System
Requirements

Install these first:

Node.js
MongoDB
Git
Steps
1. Copy Project

You can:

Clone from GitHub
OR
Copy project folder using pendrive/zip
2. Install Dependencies

Inside both folders:

npm install

Run in:

client
server
3. Add .env File

Inside server folder:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
4. Start Backend
npm start
5. Start Frontend
npm run dev
Screenshots

Add screenshots inside:

screenshots/

Example:

screenshots/home.png
screenshots/editor.png
Future Improvements
Video calling
Online compiler
AI code suggestions
File sharing
Screen sharing
Team Members
Abhishek Kumar – Frontend
Vikas Kumar Roy – Frontend
Shubham Raj – Backend
Vikas Kumar Yadav – Backend & Database