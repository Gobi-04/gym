# 🏋️ Gym Management System - Database Setup Guide

Indha project-la database and backend complete-ah setup panniyaachu. Vera entha system-la indha project-ah download panni run pannaalum, database easily create aagidum!

---

## 📁 Database Files Structure
* **`gym/server/database/schema.sql`** : Complete MySQL Database Structure (Tables: `users`, `plans`, `memberships`, `payments`, `fitness_profiles`, `contact_inquiries`, plus initial plans seed data).
* **`gym/server/database/init-db.js`** : Automated script. Idhu `schema.sql`-ah read panni MySQL-la database & tables automatic-ah create pannidum.
* **`setup-database.bat`** : Windows One-Click batch file! Double click pannale database setup aagidum.
* **`gym/server/.env`** : Database configuration (Host, User, Password, Port).

---

## 🚀 Vera System-la Database Create Panna Steps (How to Setup in Any System)

### Step 1: Start MySQL (XAMPP)
* Unga system-la **XAMPP Control Panel** open panni, **MySQL**-ah **Start** pannunga.
* (Default MySQL user: `root`, password: empty `""`).

### Step 2: Database Setup (Single Command)
Project root folder-la terminal open panni indha command run pannunga:
```bash
npm run db:setup
```
*(Or unga root folder-la irukura **`setup-database.bat`** file-ah double-click panni open pannalaam).*

Idhu automatic-ah:
1. `gym_db` database create pannum.
2. Ellaa tables (`users`, `memberships`, `payments`, `fitness_profiles`, etc.) create pannum.
3. Default membership plans data-vai insert pannidum!

---

## 🖥️ Server & Frontend Run Panradhu Eppadi?

### 1. Backend Server Start Panna:
```bash
npm run server
```
* Backend URL: `http://localhost:5000`

### 2. React Frontend Start Panna:
```bash
npm run client
# Or
cd gym/react && npm run dev
```
* Frontend URL: `http://localhost:5173`

---

## ⚙️ MySQL Config Maatha Venduma?
Oru vela vera system-la MySQL password set pannirundhaa:
`gym/server/.env` file open panni password change pannikkalaam:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=gym_db
```
