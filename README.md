# Backend Service

This is the backend service for the project, built with **Node.js** and **Express**.  
It provides authentication, API endpoints, and database connectivity for the frontend application.

---

## 🚀 Production URL
The backend is deployed and available at:  
**https://back-github.arturoverbel.com**

Swagger Documentation:
**https://back-github.arturoverbel.com/docs**

---

## 🖥️ Frontend URL
The frontend client that consumes this backend is available at:  
**https://68a69934c2778511a4eda598--rococo-profiterole-5ce870.netlify.app/login**

---

## ⚙️ Tech Stack
- **Node.js** + **Express** (REST API)  
- **PostgreSQL** (database)  
- **JWT** for session management (no cookies; session handled entirely on the frontend)  
- **ESLint** for code linting and formatting  

---

## 🔧 Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/arturoverbel/back-github-api
   cd back-github-api
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**
    Create a .env file at the root of the project with the following keys:

    ```
    PORT=3000
    DATABASE_NAME=<your_database>
    DATABASE_USERNAME=<your_user>
    DATABASE_PASSWORD=<your_password>
    DATABASE_HOST=<your_host>
    DATABASE_PORT=5432
    PRIVATE_KEY=secret
    ```

4. **Start the server**
    ```bash
    npm run dev
    ```

    By default the backend runs on http://localhost:3000
.

## 🚢 Deployment

Deployment is automated:

Any push to the main branch will trigger a new deployment to production.

## 🔐 Authentication

The backend uses JWT tokens for authentication.

Tokens are returned to the frontend after login/registration.

No cookies are used; session management is handled completely on the frontend by storing the JWT.


