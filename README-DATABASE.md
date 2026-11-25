# 🏋️ FITGUIDE — Database Setup Guide

## What's Inside

| File | Purpose |
|------|---------|
| `backend/database/schema.sql` | Full MySQL schema — tables + seed data |
| `backend/database/init-db.js` | Auto-setup script (run once) |
| `backend/config/db.js` | MySQL connection pool |
| `backend/.env` | DB credentials config |
| `backend/routes/admin.js` | All admin API routes |
| `frontend/src/services/api.js` | Frontend API calls |

---

## 📦 Database Tables

| Table | Description |
|-------|-------------|
| `users` | Members + Admin accounts |
| `plans` | Membership packages (Monthly / Quarterly / Annual) |
| `memberships` | Which plan each member is enrolled in |
| `payments` | Payment transactions & receipts |
| `fitness_profiles` | Member fitness goal & diet preference |
| `workout_categories` | Fat Loss, Strength Training, Muscle Building, Weight Loss |
| `workouts` | Exercise list per category & day |
| `diet_plans` | Meal plan entries per category, diet type & day |
| `contact_inquiries` | Contact form submissions |

---

## ⚙️ Setup Steps

### Step 1 — Install MySQL
Download and install **XAMPP** (easiest) or **MySQL Community Server**.

> XAMPP Download: https://www.apachefriends.org/download.html

After install, start **Apache + MySQL** from the XAMPP Control Panel.

---

### Step 2 — Configure `.env`

Open `gym/backend/.env` and set your MySQL password:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=        ← leave blank if XAMPP default (no password)
DB_NAME=gym_db
```

---

### Step 3 — Initialize the Database

Open terminal in `gym/backend/` and run:

```bash
npm run db:setup
```

This will:
- Create the `gym_db` database
- Create all 9 tables
- Seed default admin, plans, workouts & diet plans

✅ Expected output:
```
Database `gym_db` and all tables created successfully!
   - users
   - plans
   - memberships
   - payments
   - fitness_profiles
   - workout_categories
   - workouts
   - diet_plans
   - contact_inquiries
```

---

### Step 4 — Start the Backend

```bash
cd gym/backend
npm run dev
```

Backend runs at: **http://localhost:5001**

---

### Step 5 — Start the Frontend

```bash
cd gym/frontend
npm run dev        # User portal  → http://localhost:5173
npm run admin      # Admin portal → http://localhost:5174
```

---

## 🔐 Default Admin Login

| Field | Value |
|-------|-------|
| Email | `admin@fitguide.club` |
| Password | `FitGuide@2026` |

---

## 🌐 API Endpoints

### Admin Routes (`/api/admin/...`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/login` | Admin sign in |
| GET | `/admin/stats` | Dashboard statistics |
| GET | `/admin/members` | List all members |
| GET | `/admin/members/:id` | Single member details |
| PUT | `/admin/members/:id` | Update member |
| DELETE | `/admin/members/:id` | Delete member |
| GET | `/admin/plans` | List membership plans |
| POST | `/admin/plans` | Create plan |
| PUT | `/admin/plans/:id` | Update plan |
| DELETE | `/admin/plans/:id` | Delete plan |
| GET | `/admin/payments` | List all payments |
| PUT | `/admin/payments/:id` | Update payment status |
| GET | `/admin/workouts` | List workouts (filter: ?category=&day=) |
| POST | `/admin/workouts` | Add workout |
| PUT | `/admin/workouts/:id` | Edit workout |
| DELETE | `/admin/workouts/:id` | Delete workout |
| GET | `/admin/workout-categories` | Workout category list |
| GET | `/admin/diet-plans` | List diet plans (filter: ?category=&diet_type=&day=) |
| POST | `/admin/diet-plans` | Add diet plan entry |
| PUT | `/admin/diet-plans/:id` | Edit diet plan entry |
| DELETE | `/admin/diet-plans/:id` | Delete diet plan entry |
| GET | `/admin/inquiries` | Contact form submissions |
| DELETE | `/admin/inquiries/:id` | Delete inquiry |

### Auth Routes (`/api/auth/...`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Member registration |
| POST | `/auth/login` | Member login |
| GET | `/auth/user/:id` | Get user profile |

---

## 🛠 Troubleshooting

**❌ ECONNREFUSED** → MySQL not running. Start it in XAMPP.

**❌ ER_ACCESS_DENIED** → Wrong password in `.env`.

**❌ Table already exists** → Safe to ignore (uses `CREATE TABLE IF NOT EXISTS`).

**❌ Duplicate entry** → Safe to ignore (uses `INSERT IGNORE`).
