## Prerequisites

Before you begin, ensure the following tools are installed on your system:

1. **[Node.js](https://nodejs.org)** (Version 14 or higher recommended)
2. **[npm](https://www.npmjs.com/)** or **[Yarn](https://yarnpkg.com/)** for managing dependencies
3. A web browser (e.g., Chrome, Firefox) to access the application.

### Step 2: Set-up Database-SQL

1. Download and install MySQL from the official website: https://dev.mysql.com/downloads/
2. Follow the installation steps and set a root password during setup.
3. Follow this commands
```bash
   mysql -u root -p
```bash
   CREATE DATABASE todo_list;
```bash
   CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
```bash
   GRANT ALL PRIVILEGES ON todo_list.* TO 'root'@'localhost';
```bash
   FLUSH PRIVILEGES;
```bash
   USE todo_list;
```bash
   CREATE TABLE user (
      uuid CHAR(36) NOT NULL PRIMARY KEY,
      username VARCHAR(255) NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
   );
```bash
   CREATE TABLE todo (
      uuid CHAR(36) NOT NULL PRIMARY KEY,
      userId CHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      status BOOLEAN DEFAULT FALSE,
      dueDate DATE DEFAULT '2023-01-01',
      FOREIGN KEY (userId) REFERENCES user(uuid)
   );



### Step 1: Backend Setup
The backend handles the server-side logic and APIs.

1. Navigate to the `backend` directory & Install dependencies:
   ```bash
   yarn install

3. Start the backend server:
   ```bash
   yarn dev
   ```
4. By default, the backend runs on:
   ```
   http://localhost:8000
   ```

---

### Step 2: Frontend Setup
The frontend handles the user interface.

1. Navigate to the `frontend` directory & Install dependencies:
   ```bash
   npm install

2. Start the frontend development server:
   ```bash
   npm run dev

3. By default, the frontend runs on:
   ```
   http://localhost:5173
   ```

---

## Running the Application

To access the application:

1. Make sure both the **backend** and **frontend** servers are running.
2. Open your web browser and go to:
   - **Frontend**: `http://localhost:5173`
   - **Backend**: `http://localhost:8000`

---

## Troubleshooting

Here are some common issues and their fixes:

1. **Backend not starting**:
   - Ensure all dependencies are installed by running:
     ```bash
     yarn install
     ```
   - Check that you have the correct Node.js version installed.

2. **Frontend not starting**:
   - Ensure the backend server is running at `http://localhost:8000`.
   - Reinstall frontend dependencies by running:
     ```bash
     npm install
     ```

3. **Missing `wmic` error on Windows**:
   - If you encounter this error, ensure `wmic` is installed on your system or modify the dependencies causing the issue.

---


