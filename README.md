<h1 align="center">🚀 CodeX - Backend API (Express.js + MongoDB) 🚀</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-%23000000.svg?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
</p>

## 🌟 Introduction

The **CodeX Backend API** is the powerhouse of the **CodeX Learning Platform**, providing a secure, scalable, and efficient backend to manage users, authentication, courses, and progress tracking. Built with **Node.js, Express.js, MongoDB, and JWT authentication**, it ensures **high performance and security**.

> **Why CodeX Backend?**  
> ✅ **JWT Authentication** – Secure & seamless login system  
> ✅ **MongoDB Database** – Efficient data storage & retrieval  
> ✅ **RESTful APIs** – Well-structured, scalable API endpoints  
> ✅ **Admin Panel Support** – Content & user management  
> ✅ **Optimized Performance** – Fast response times & scalable  

---

## 🏗️ Tech Stack

| **Technology**  | **Purpose**  |
|----------------|-------------|
| **Node.js**    | JavaScript runtime for backend  |
| **Express.js** | Lightweight web framework for building APIs  |
| **MongoDB**    | NoSQL database for storing user data & content  |
| **JWT (JSON Web Token)** | Secure authentication & user sessions  |
| **Bcrypt.js**  | Password hashing for added security  |
| **Mongoose**   | Elegant MongoDB object modeling  |

---

## 🎯 Features

✅ **User Authentication** – JWT-based secure login & registration  
✅ **Admin Panel Integration** – Manage programming languages & topics  
✅ **RESTful API Design** – Well-structured endpoints for frontend integration  
✅ **User Progress Tracking** – Save and retrieve learning progress  
✅ **Data Security** – Encrypted passwords & protected routes  
✅ **Scalability** – Designed to handle high traffic efficiently  

---

## 🔌 API Endpoints

| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Authenticate user & generate JWT |
| GET    | `/api/languages` | Fetch all programming courses |
| POST   | `/api/topics` | Add a new course (Admin only) |
| GET    | `/api/progress/:userId` | Get user progress |
| PATCH  | `/api/progress/:userId` | Update user progress |


---

## 🚀 Installation & Setup

1️⃣ **Clone the repository:**
```bash
git clone https://github.com/inshah-id/codeX-backend.git
cd codex-backend
