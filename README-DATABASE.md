# 🏋️ Gym Management System - Database Setup Guide

This project includes a complete automated MySQL database setup and a Node.js + Express backend API. Any system cloning or running this project can initialize the database with a single command.

---

## 📁 Database Files Structure
* **`backend/database/schema.sql`** : Complete MySQL Database Schema (Tables: `users`, `plans`, `memberships`, `payments`, `fitness_profiles`, `contact_inquiries`, plus default membership plans and admin seed data).
* **`backend/database/init-db.js`** : Automated migration runner. Connects to MySQL, creates the database if it doesn't exist, and executes `schema.sql` automatically.
* **`setup-database.bat`** : One-click Windows batch script to install dependencies and initialize the database.
* **`backend/.env`** : Database configuration file (Host, User, Password, Port).

---

## 🚀 How to Set Up Database on Any System

### Step 1: Start MySQL
* Start your local MySQL service (e.g. open **XAMPP Control Panel** and click **Start** next to **MySQL**).
* Default MySQL credentials: user `root`, password empty `""`.

### Step 2: Run Database Setup
Open a terminal in the project directory and run:
```bash
npm run db:setup
```
*(Or double-click the **`setup-database.bat`** script on Windows).*

This automatically:
1. Creates the `gym_db` database if not present.
2. Creates all required relational tables.
3. Seeds initial membership plan packages and default admin account.

---

## 🖥️ Starting the Application

### 1. Start the Backend API Server:
```bash
npm run backend
```
* Backend runs on: `http://localhost:5000`

### 2. Start the Frontend App:
```bash
npm run dev
# Or
cd frontend && npm run dev
```
* Frontend User Portal: `http://localhost:5173`
* Frontend Admin Portal: `http://localhost:5173/admin`

---

## ⚙️ Customizing MySQL Credentials
If your MySQL instance has a custom password or port, edit `gym/server/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=gym_db
```
