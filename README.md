Complete Backend System with REST APIs

Overview

This project is a robust, production-ready backend system designed to manage Users and Blog Content. It implements a secure Content Management System (CMS) architecture featuring state-of-the-art authentication flows, role-based logic, and full CRUD capabilities.

Built with Node.js and Express, it connects to a MongoDB database to persist data and utilizes Nodemailer for transactional emails (account verification and password resets).



Key Features

Authentication & Security

JWT Authentication: Stateless user sessions using JSON Web Tokens.

Secure Hashing: Passwords hashed using bcryptjs.

HMAC Protection: Verification codes secured via HMAC SHA256.

Input Validation: Strict request validation using Joi schemas.

Security Headers: Implemented via Helmet.

User Management Flow

Signup/Signin: Secure registration and login.

Email Verification: OTP-based account activation via Email.

Password Recovery: Secure "Forgot Password" flow with OTPs.

Content Management (CRUD)

Create Posts: Authenticated users can create blog posts.

Read Posts: Pagination (?page=1) and Sorting support.

Update/Delete: Ownership checks ensure users can only modify their own posts.

Tech Stack

Component

Technology

Description

Runtime

Node.js

JavaScript runtime built on Chrome's V8 engine.

Framework

Express.js

Fast, unopinionated, minimalist web framework.

Database

MongoDB

NoSQL database for flexible data modeling.

ORM

Mongoose

ODM library for MongoDB and Node.js.

Validation

Joi

Data validation library for JavaScript.

Email

Nodemailer

Module for sending emails.

Getting Started

Follow these steps to run the project locally.

Prerequisites

Node.js (v14 or higher)

MongoDB Atlas Account (or local MongoDB)

Installation

Clone the repository

git clone [https://github.com/Abhi5063/backend-system-with-rest-api.git](https://github.com/Abhi5063/backend-system-with-rest-api.git)
cd backend-system-with-rest-api


Install dependencies

npm install


Configure Environment Variables
Create a .env file in the root directory and add the following:

PORT=8000
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
HMAC_VERIFICATION_CODE_SECRET=your_hmac_secret
NODE_CODE_SENDING_EMAIL_ADDRESS=your_email@gmail.com
NODE_CODE_SENDING_EMAIL_PASSWORD=your_app_specific_password
NODE_ENV=development


Start the Server

npm start


The server will run on http://localhost:8000.

📡 API Endpoints

Authentication (/api/auth)

Method

Endpoint

Description

Auth Required

POST

/signup

Register a new user account

❌

POST

/signin

Login and receive JWT token

❌

PATCH

/send-verification-code

Send OTP to email

❌

PATCH

/verify-verification-code

Verify account with OTP

❌

PATCH

/sent-forgot-password-code

Request password reset OTP

❌

PATCH

/verify-forgot-password-code

Reset password with OTP

❌

Posts (/api/posts)

Method

Endpoint

Description

Auth Required

GET

/all-posts

Get paginated list of posts

❌

GET

/single-post

Get specific post by ID

❌

POST

/create-post

Create a new blog post

✅

PUT

/update-post

Update an existing post

✅

DELETE

/delete-post

Delete a post

✅

📸 Screenshots & Testing Evidence

1. Database Schema (MongoDB Atlas)

![Database](screenshots/Screenshot 2025-11-30 192918.png)

2. User Authentication (Signup & Login)

![Signup](screenshots/Screenshot 2025-11-30 184423.png)
![Login](screenshots/Screenshot 2025-11-30 175648.png)

3. Email Verification Flow

![Email Received](screenshots/Screenshot 2025-11-30 192649.png)
![Verification Success](screenshots/Screenshot 2025-11-30 192705.png)

4. Post Management (Create & Get)

![Create Post](screenshots/Screenshot 2025-11-30 233347.png)
![Get All Posts](screenshots/Screenshot 2025-12-01 074854.png)

📂 Folder Structure

/src
 ├── /controllers     # Business logic (Auth, Posts)
 ├── /middlewares     # Validation, Auth Checks, Email
 ├── /models          # Mongoose Schemas (User, Post)
 ├── /routers         # API Route definitions
 ├── /utils           # Hashing helpers
 ├── index.js         # App entry point
