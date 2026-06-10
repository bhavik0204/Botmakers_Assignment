# AuthRBAC Backend

This is the Spring Boot backend for the AuthRBAC project.

## Requirements

- Java 17
- Maven (or use the included `mvnw` wrapper)
- MySQL or another JDBC-compatible database if configured

## Setup

1. Open a terminal in `authrbac`.
2. Build the project:

   ```powershell
   .\mvnw clean package
   ```

3. Run the backend:

   ```powershell
   .\mvnw spring-boot:run
   ```

The backend starts on port `8081` by default.

## Common commands

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

## Notes

- The backend exposes authentication routes under `/api/auth`.
- Protected routes include `/api/user` and `/api/admin`.
- The JWT filter expects a Bearer token in the `Authorization` header.
