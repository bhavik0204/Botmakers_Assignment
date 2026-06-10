# Botmakers Project

This repository contains two main applications:

- `authrbac`: Spring Boot backend for authentication and role-based access control.
- `frontend`: React frontend for the AuthRBAC demo.

## Repository structure

- `authrbac/` - Java backend with Spring Boot, JWT auth, Spring Security, and JPA.
- `frontend/` - React application built with Vite.

## Setup

### Backend

1. Open a terminal in `authrbac/`.
2. Build and run:

   ```powershell
   .\mvnw clean package
   .\mvnw spring-boot:run
   ```

3. The backend runs on port `8081` by default.

### Frontend

1. Open a terminal in `frontend/`.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Start the frontend:

   ```powershell
   npm run dev
   ```

4. The frontend runs on port `5173` by default.

## Notes

- The frontend is configured to proxy `/api` requests to `http://localhost:8081`.
- Use the login page to authenticate before calling protected endpoints.
- Backend API endpoints:
  - `/api/auth/register`
  - `/api/auth/login`
  - `/api/user`
  - `/api/admin`

## Useful commands

### Backend

- Compile only:
  ```powershell
  .\mvnw -q compile
  ```
- Run tests:
  ```powershell
  .\mvnw test
  ```
- Package JAR:
  ```powershell
  .\mvnw package
  ```

### Frontend

- Start development server:
  ```powershell
  npm run dev
  ```
- Build production assets:
  ```powershell
  npm run build
  ```
