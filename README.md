TQuizlet: A Full-Stack TOEIC Quiz Application
TQuizlet is a serverless web application built to help users practice TOEIC vocabulary through interactive quizzes and flashcards. This project leverages React and Tailwind CSS for the front end and utilizes the full power of Firebase (Authentication and Firestore) for the backend.

Key Features
Full Authentication System: Users can sign up and log in using the traditional Email/Password method or conveniently via social providers like Google and GitHub (signInWithPopup).

Role-Based Access Control (Authorization):

User: Can take public quizzes, track their scores, and manage their own private collection of questions.

Advanced Firestore Database:

Features a dual-collection strategy: Public collections (for shared topic data) and Private collections (for user-specific data like user_questions and scores).

Secured using Firestore Security Rules to ensure users can only read/write their own data.

Modern State Management:

Uses Zustand (useAuthStore) to manage global user authentication status and profile data (including role) across the entire application.

Employs local useState/useRef for component-level state (e.g., forms, modals).

Rich User Experience (UX):

Fully responsive UI built from scratch using Tailwind CSS.

Seamless client-side routing (no page refresh) with React Router v6, including dynamic routes (/quiz/:topicPath) and shared layouts (<Outlet />).

Features advanced UI patterns such as Search, Pagination, modal forms, and animations.

Professional Deployment Workflow:

Code managed with Git/GitHub using feature branches.

Automated CI/CD pipeline via Vercel.

All sensitive keys (Firebase config) are secured using Environment Variables (.env) and Google Cloud API Key restrictions.

Tech Stack
Front-End: React (Vite), JavaScript (ES6+), React Router, Tailwind CSS

State Management: Zustand

Back-End (BaaS): Firebase Authentication, Cloud Firestore

Deployment: Vercel

Tools: Git/GitHub
