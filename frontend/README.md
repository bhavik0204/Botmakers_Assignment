# AuthRBAC Frontend

This is the React frontend for the AuthRBAC project.

## Requirements

- Node.js
- npm

## Setup

1. Open a terminal in `frontend`.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Start the development server:

   ```powershell
   npm run dev
   ```

The frontend runs on port `5173` by default.

## Build

Build the production assets:

```powershell
npm run build
```

## Notes

- The frontend proxies `/api` requests to the backend port.
- Make sure the backend is running on `http://localhost:8081` when using the dev server.
- Login first before calling protected endpoints such as `/api/user` or `/api/admin`.
