# 🏋️ Gym Management System - Database Setup Guide

This project includes a complete automated MySQL database setup and a Node.js + Express backend API. Any system cloning or running this project can initialize the database with a single command.

---

## 📁 Database Files Structure
* **`gym/server/database/schema.sql`** : Complete MySQL Database Schema (Tables: `users`, `plans`, `memberships`, `payments`, `fitness_profiles`, `contact_inquiries`, plus default membership plans seed data).
* **`gym/server/database/init-db.js`** : Automated migration runner. Connects to MySQL, creates the database if it doesn't exist, and executes `schema.sql` automatically.
* **`setup-database.bat`** : One-click Windows batch script to install dependencies and initialize the database.
* **`gym/server/.env`** : Database configuration file (Host, User, Password, Port).

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
3. Seeds initial membership plan packages.

---

## 🖥️ Starting the Application

### 1. Start the Backend API Server:
```bash
npm run server
```
* Backend runs on: `http://localhost:5000`

### 2. Start the React Frontend:
```bash
npm run client
# Or
cd gym/react && npm run dev
```
* Frontend runs on: `http://localhost:5173`

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
