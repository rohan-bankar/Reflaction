### Project Name - Reflectify
The application aims to provide a simple and efficient platform for collecting anonymous feedback. The primary user is an organizer who wants to gather feedback from participants without requiring them to create accounts or log in. The key features of the system are as follows:

### Features
1) User Registration and Authentication
Users can register and log in to the application using only their email and password.
This ensures a quick and hassle-free onboarding process.

2) Feedback Link Generation
After logging in, users can create unique links to collect feedback from participants.
These links can be shared externally (e.g., via WhatsApp, email, or other channels) outside the scope of the application.

3) Anonymous Feedback Submission
Participants clicking the feedback link are directed to a feedback submission page without requiring a login.
The feedback form will enforce the selection of at least one option before submission.
Upon successful submission, participants are greeted with a "Thank You" message.

4) Feedback Dashboard
Registered users can access a dashboard that displays all feedback received via the unique links.
Feedback is displayed anonymously to maintain participant privacy.
This project ensures a seamless feedback collection process while prioritizing user simplicity and participant anonymity.

### Built With
# frontend
- React.js: A JavaScript library for building user interfaces.
- JavaScript: For adding interactivity and logic to the frontend.
- Tailwind CSS: A utility-first CSS framework for styling.
# backend
- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A lightweight web application framework for building APIs.
- MongoDB: A NoSQL database for storing user and feedback data.
# testing tool
- Postman: For testing APIs and ensuring proper backend functionality.

### node Packages used
- Nodemon: For automatically restarting the server during development.
- Prettier: For code formatting to ensure consistency.
- Bcrypt: For hashing user passwords securely.
- Cors: For enabling Cross-Origin Resource Sharing.
- Dotenv: For managing environment variables.
- Express: A backend framework for building APIs.
- Jsonwebtoken: For implementing authentication via JWT tokens.
- Mongoose: For interacting with the MongoDB database.
- Uuid: For generating unique IDs (e.g., for feedback links).
- Axios: For making HTTP requests from the frontend to the backend.
- Jwt-decode: For decoding JWT tokens on the frontend.
- React-router-dom: For managing routing in the React application.

### Installation Guide
# npm install
- Install Dependencies
- Install the required Node.js dependencies for both the backend and frontend
  
# npm create vite@latest
- Set Up Frontend with Vite
- Create a Vite-powered frontend application

### Run the Application
# Backend:
- Start the backend server and the frontend development server:
- npm run dev

# Frontend:
- Navigate to the frontend directory (if separate) and start the Vite server:
- npm run dev



