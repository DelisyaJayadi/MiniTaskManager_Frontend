### 1. How do you ensure audit logs are not modified?
So the way I approached this was through the backend architecture itself. In `server.ts`, I intentionally did not create any API endpoint — no `PUT /logs/:id`, no `DELETE /logs/:id` — nothing that would allow anyone to modify or remove log data from outside, whether intentionally or by accident. There's simply no door to walk through.

On the code level, inside the `updateTaskStatus` function in `store.ts`, the logging only ever does an append — it pushes a new entry into the logs array. There's no update, no overwrite. So once a log is written, it stays there permanently. That makes the audit logs effectively immutable from the application side.

### 2. Which part of this solution is the most risky if used by many users?
The most risky part is the **JSON file-based storage system (`data.json`)**.
If this application is used by many users simultaneously (high concurrency), at the same time, a *Race Condition* problem will occur. When two users perform a status update at the same millisecond, one `fs.writeFileSync` process could overwrite the data from the other process, causing data or logs to be lost. A static file system is not designed to handle *locking* and *transactions* like a real database provides.

### 3. If this task grows into a large system, which part would you refactor first and why?
There are two main parts I would refactor first:
1. **Migration to a Relational Database (PostgreSQL etc.):** The JSON file must be immediately replaced with a real database. The reasons are to guarantee data integrity, handle concurrency between many users (avoiding the risk mentioned in answer #2), and to make querying large amounts of data far more efficient.
2. **Implementation of Authentication & Authorization (Auth):** Currently the actor still uses a simple *dropdown* system (*hardcoded*). In a large system, this must be replaced with a real login system (e.g., using JWT) so we can truly validate who is performing an action, and ensure that users cannot fake their identity in the audit log.

### 4. If you used AI, explain which parts were assisted by AI and how you validated them.
AI greatly helped me in speeding up the writing of **boilerplate code** (such as Express setup, initial Vite + React configuration, and writing basic UI component structures) as well as organizing the file structure.
To validate the output, I performed:
- **Compilation Checks (Type Safety):** Ensured there were no TypeScript (`tsc`) errors on both the backend and frontend, and fixed compiler compatibility issues (such as *verbatimModuleSyntax*) by running `npm run build`.
- **Manual UI/UX Testing:** Ran the application locally (`npm run dev`), tried creating tasks, tried changing statuses in sequence, tested failure scenarios (forcing a transition from `to_do` directly to `done`), and verified that changes were accurately recorded in the Audit Log UI.
- **Persistence Checks:** Verified that data was actually saved to `data.json` by stopping and restarting the backend server.
