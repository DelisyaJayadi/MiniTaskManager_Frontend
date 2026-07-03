# Mini Task Manager - Frontend
This is the frontend user interface for the Mini Task Manager application. It interacts with the backend API to provide a seamless way to manage tasks and view audit histories.
## Features
- **Task Dashboard**: A clean interface to create, view, and delete tasks.
- **Status Updates**: Change task statuses via a simple dropdown menu.
- **Audit Log Viewer**: Click the "Logs" button on any task to view a chronological history of who changed what status and when.
- **Actor Simulation**: Use the dropdown in the header to switch between simulated users (e.g., `john.doe`, `jane.smith`, `admin`) to test how the audit log tracks different actors.
## Tech Stack
- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS
## Prerequisites
- Node.js (v18+ recommended)
- npm
- **Important:** The backend server must be running on `http://localhost:3000` for this frontend to function properly.
## How to Run
1. Install dependencies:
```
npm install
```
2. Start the development server:
```
npm run dev
```
The application will typically start on http://localhost:5173. Open this URL in your web browser to use the Mini Task Manager.
