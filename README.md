🚀 Backend System with REST APIs

📖 Overview

This project is a complete backend system built with Node.js and Express.js. It features robust user authentication, secure password management, and a full set of CRUD APIs for managing blog posts. The system uses MongoDB for data storage and integrates with Nodemailer for email verification and password reset functionalities.



✨ Key Features

🔐 Secure Authentication: JWT-based stateless authentication with secure password hashing (Bcrypt).

📧 Email Verification: OTP-based account verification using Nodemailer.

🔑 Password Recovery: Secure "Forgot Password" flow with OTP validation.

📝 CRUD Operations: Create, Read, Update, and Delete blog posts.

📄 Pagination: Efficiently handle large datasets with paginated API responses.

🛡️ Security: Implementation of security headers with Helmet and input validation with Joi.

🛠️ Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB (with Mongoose ORM)

Authentication: JSON Web Tokens (JWT)

Validation: Joi

Email Service: Nodemailer

🚀 Getting Started

Clone the repository:

git clone [https://github.com/Abhi5063/backend-system-with-rest-api.git](https://github.com/Abhi5063/backend-system-with-rest-api.git)
cd backend-system-with-rest-api


Install dependencies:

npm install


Set up Environment Variables:
Create a .env file in the root directory with the following:

PORT=8000
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
HMAC_VERIFICATION_CODE_SECRET=your_hmac_secret
NODE_CODE_SENDING_EMAIL_ADDRESS=your_email@gmail.com
NODE_CODE_SENDING_EMAIL_PASSWORD=your_email_password
NODE_ENV=development


Run the server:

npm start
