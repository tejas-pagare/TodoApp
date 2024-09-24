# myTodo

myTodo is a task management web application designed to help users manage their daily tasks efficiently. The app includes an AI feature that generates task descriptions based on titles using the Gemini API. It also implements secure user authentication and provides an intuitive, real-time interface for task management.

## Features
- **AI-Generated Task Descriptions**: Automatically generate a task description from a given title using the Gemini API.
- **User Authentication**: Secure authentication system using JSON Web Tokens (JWT).
- **Task Management**: Add, update, and delete tasks easily.
- **Global State Management**: Redux is used to manage the global application state.
- **Frontend Routing**: Seamless page navigation with React Router DOM.
- **Backend API**: Node.js and Express.js for routing and handling API requests.

## Tech Stack
- **Frontend**: 
  - React.js
  - Redux for state management
  - React Router DOM for client-side routing
- **Backend**: 
  - Node.js
  - Express.js for routing
- **Authentication**: JWT (JSON Web Token)
- **AI Feature**: Gemini API for generating task descriptions from titles
- **Database**: (Specify database, e.g., MongoDB)

## Installation

### Prerequisites
Ensure that you have the following installed on your system:
- Node.js
- npm (or yarn)
- MongoDB (or your preferred database)

# command to run frontend folder
- cd backend 
- npm init
- npm run dev

# command to run backend folder
- cd frontend
- npm init
- npx nodemon index.js

