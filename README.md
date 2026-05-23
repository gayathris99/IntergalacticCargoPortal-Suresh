# Intergalactic Cargo Portal

A full-stack cargo management portal with authentication and role-based access control (RBAC). Built with React, Node.js, and PostgreSQL.
---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

### 1. Install Node.js
Download and install Node.js from https://nodejs.org (v18 or above recommended)

Verify installation:
```bash
node -v
npm -v
```

### 2. Install PostgreSQL

**Mac (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 3. Install Git
Download from https://git-scm.com/downloads


---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gayathris99/IntergalacticCargoPortal-Suresh.git
cd IntergalacticCargoPortal-Suresh
```

---

### 2. Database Setup

**Mac:**
```bash
psql -U $(whoami) postgres
```

**Windows/Linux:**
```bash
psql -U postgres
```

Once inside psql, run the following commands:

```sql
CREATE DATABASE intergalactic_cargo;
\c intergalactic_cargo

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE cargo (
  id SERIAL PRIMARY KEY,
  cargo_id TEXT NOT NULL UNIQUE,
  weight FLOAT NOT NULL,
  destination TEXT NOT NULL,
  date TEXT NOT NULL
);
```

Type `\q` to exit psql.

---

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```
PORT=8000
DATABASE_URL=postgresql://<your_postgres_username>@localhost:5432/intergalactic_cargo
JWT_SECRET=your_jwt_secret_key
```

Replace:
- `<your_postgres_username>` with your PostgreSQL username
- `your_jwt_secret_key` with any random string


To generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the backend server:
```bash
npm run dev
```

You should see:
```
Server running on port 8000
Database connected successfully
```

---

### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE v5.x.x  ready in Xs
➜  Local:   http://localhost:5173/
```

---

### 5. Access the app

Open your browser and go to:
```
http://localhost:5173
```

---

## User Roles

| Role | Email Pattern | Access |
|---|---|---|
| Admin | Must end with `@nebula-corp.com` | Upload manifest + view cargo in KG |
| Standard | Any other email | View cargo in LBS only |


---

## Test Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@nebula-corp.com | password123 |
| Standard | user@gmail.com | password123 |

---

## Uploading a Manifest

1. Login as Admin
2. Click **UPLOAD MANIFEST** button
3. Select the `manifest.txt` file
4. The portal will parse and load the cargo records

### Manifest Format
```
[YYYY-MM-DD] || CARGO-ID :: WEIGHT >> DESTINATION
```

### Processing Rules
- If destination contains **Sector-7** → weight is multiplied by 1.45 and rounded
- If final weight is a **prime number** → record is skipped
- Cargo is sorted **heaviest to lightest**
- Earth destinations are always **pinned to the bottom**

---

## Project Structure

```
IntergalacticCargoPortal/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── cargo.js
│   │   ├── db.js
│   │   └── index.js
│   ├── schema.sql
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CargoTable.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicRoute.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   └── UploadManifest.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
└── README.md
```
