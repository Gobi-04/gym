-- ======================================================
-- FITGUIDE Gym Management System - Full Database Schema
-- File: backend/database/schema.sql
-- Run via: npm run db:setup  (from gym/backend folder)
-- ======================================================

-- 1. Create database
CREATE DATABASE IF NOT EXISTS `gym_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gym_db`;

-- ======================================================
-- 2. USERS TABLE (Members + Admin)
-- ======================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `name`        VARCHAR(100)  NOT NULL,
  `email`       VARCHAR(150)  NOT NULL UNIQUE,
  `phone`       VARCHAR(15)   NOT NULL UNIQUE,
  `password`    VARCHAR(255)  NOT NULL,
  `role`        ENUM('member','trainer','admin') DEFAULT 'member',
  `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ======================================================
-- 3. MEMBERSHIP PLANS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS `plans` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `name`             VARCHAR(100)    NOT NULL UNIQUE,
  `price`            DECIMAL(10,2)   NOT NULL,
  `duration_months`  INT             DEFAULT 1,
  `description`      TEXT,
  `features`         TEXT,
  `created_at`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ======================================================
-- 4. MEMBERSHIPS TABLE (which plan each member is on)
-- ======================================================
CREATE TABLE IF NOT EXISTS `memberships` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `user_id`    INT          NOT NULL,
  `plan_id`    INT          DEFAULT NULL,
  `plan_name`  VARCHAR(100) NOT NULL,
  `start_date` DATE         DEFAULT NULL,
  `end_date`   DATE         DEFAULT NULL,
  `status`     ENUM('active','expired','cancelled') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ======================================================
-- 5. PAYMENTS TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS `payments` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `user_id`        INT           NOT NULL,
  `plan_name`      VARCHAR(100)  NOT NULL,
  `amount`         DECIMAL(10,2) NOT NULL,
  `gst_amount`     DECIMAL(10,2) DEFAULT 0,
  `total_amount`   DECIMAL(10,2) DEFAULT 0,
  `payment_method` VARCHAR(50)   DEFAULT 'UPI',
  `transaction_id` VARCHAR(100),
  `receipt_number` VARCHAR(100),
  `status`         ENUM('success','pending','failed') DEFAULT 'pending',
  `paid_at`        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ======================================================
-- 6. FITNESS PROFILES (goal, diet preference)
-- ======================================================
CREATE TABLE IF NOT EXISTS `fitness_profiles` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `user_id`    INT          NOT NULL UNIQUE,
  `goal`       VARCHAR(100) DEFAULT 'muscle-building',
  `diet`       VARCHAR(100) DEFAULT 'non-vegetarian',
  `weight`     DECIMAL(5,2) DEFAULT NULL,
  `height`     DECIMAL(5,2) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ======================================================
-- 7. WORKOUT CATEGORIES (Fat Loss, Strength Training, etc.)
-- ======================================================
CREATE TABLE IF NOT EXISTS `workout_categories` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ======================================================
-- 8. WORKOUTS TABLE (exercises per category & day)
-- ======================================================
CREATE TABLE IF NOT EXISTS `workouts` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `category_id`  INT          DEFAULT NULL,
  `category`     VARCHAR(100) NOT NULL DEFAULT 'Fat Loss',
  `day`          VARCHAR(10)  NOT NULL DEFAULT 'Mon',
  `name`         VARCHAR(150) NOT NULL,
  `sets`         INT          DEFAULT 3,
  `reps`         VARCHAR(50)  DEFAULT '10-12 Reps',
  `duration`     VARCHAR(50)  DEFAULT '10 Minutes',
  `muscle`       VARCHAR(100) DEFAULT '',
  `description`  TEXT,
  `steps`        TEXT,
  `video_url`    VARCHAR(500) DEFAULT '',
  `image_url`    VARCHAR(500) DEFAULT '',
  `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `workout_categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ======================================================
-- 9. DIET PLAN TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS `diet_plans` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `category`     VARCHAR(100) NOT NULL DEFAULT 'Fat Loss',
  `diet_type`    ENUM('vegetarian','non-vegetarian') DEFAULT 'non-vegetarian',
  `day`          VARCHAR(10)  NOT NULL DEFAULT 'Mon',
  `meal_type`    ENUM('Breakfast','Lunch','Dinner','Snack') DEFAULT 'Breakfast',
  `title`        VARCHAR(150) NOT NULL,
  `time_slot`    VARCHAR(50)  DEFAULT '',
  `calories`     VARCHAR(50)  DEFAULT '',
  `nutrients`    TEXT,
  `portion_note` TEXT,
  `image_url`    VARCHAR(500) DEFAULT '',
  `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ======================================================
-- 10. CONTACT INQUIRIES TABLE
-- ======================================================
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(100) NOT NULL,
  `email`      VARCHAR(150) NOT NULL,
  `phone`      VARCHAR(20)  NOT NULL,
  `message`    TEXT         NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ======================================================
-- SEED DATA
-- ======================================================

-- Default Admin Account
INSERT IGNORE INTO `users` (`name`, `email`, `phone`, `password`, `role`) VALUES
('Chief Admin', 'admin@fitguide.club', '9999999999', 'FitGuide@2026', 'admin');

-- Default Membership Plans
INSERT IGNORE INTO `plans` (`name`, `price`, `duration_months`, `description`, `features`) VALUES
('Monthly - 1 Month',   2499.00,  1,  'Full gym access with personalized diet schedule for 30 days.',    'Full Gym Access, Locker, General Trainer, Diet Plan'),
('Quarterly - 3 Months',6499.00,  3,  '90-day structured transformation cycle with workout & meal plan.', 'Full Gym Access, Diet Plan, Personal Trainer (2 sessions), Steam Bath'),
('Annual - 12 Months',  19999.00, 12, 'Complete 12-month performance membership with full portal access.', 'VIP Access, Custom Diet & Workout Plan, Unlimited Trainer, Steam Bath');

-- Default Workout Categories
INSERT IGNORE INTO `workout_categories` (`name`) VALUES
('Fat Loss'), ('Strength Training'), ('Muscle Building'), ('Weight Loss');

-- Sample Workouts - Fat Loss / Monday
INSERT IGNORE INTO `workouts` (`category`, `day`, `name`, `sets`, `reps`, `duration`, `muscle`, `description`, `steps`, `video_url`, `image_url`) VALUES
('Fat Loss','Mon','Metabolic Full-Body Ignition - Burpees',3,'12-15 Reps','10 Minutes','Full Body',
 'High-intensity burpees to spike your heart rate and burn calories fast.',
 'Stand feet shoulder-width|Drop into squat and place hands on floor|Jump feet back to plank|Do a push-up|Jump feet to hands|Explode upward with arms raised',
 '/videos/burpees.mp4','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900'),

('Fat Loss','Mon','Jump Rope Circuit',3,'3 Minutes','10 Minutes','Cardio',
 'Jump rope intervals to maximize caloric burn.',
 'Hold handles at hip height|Jump with both feet together|Land softly on balls of feet|Maintain rhythm for full duration',
 '/videos/jump-rope.mp4','https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900'),

('Fat Loss','Mon','Mountain Climbers',3,'20 Reps each leg','8 Minutes','Core & Cardio',
 'Dynamic core exercise that also elevates heart rate.',
 'Start in a high plank position|Drive right knee to chest|Switch quickly to left knee|Keep hips level throughout',
 '/videos/mountain-climbers.mp4','https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900'),

-- Strength Training / Monday
('Strength Training','Mon','Flat Barbell Bench Press',4,'6-8 Reps','12 Minutes','Chest',
 'Compound push movement to build maximal chest strength.',
 'Lie flat on bench|Grip bar slightly wider than shoulders|Lower to chest under control|Drive bar up explosively',
 '/videos/bench-press.mp4','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900'),

('Strength Training','Mon','Barbell Squat',4,'5-6 Reps','15 Minutes','Legs',
 'King of all strength exercises for total lower body power.',
 'Bar across upper traps|Feet shoulder-width, toes slightly out|Descend until thighs are parallel|Drive through heels to stand',
 '/videos/squat.mp4','https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900'),

-- Muscle Building / Monday
('Muscle Building','Mon','Flat Barbell Bench Press',3,'10-12 Reps','10 Minutes','Chest',
 'The flat barbell bench press helps build chest strength and upper body muscles.',
 'Lie flat on the bench|Hold the barbell slightly wider than shoulder width|Lower the bar slowly towards your chest|Push the bar upward until your arms are extended',
 '/videos/bench-press.mp4','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900'),

('Muscle Building','Mon','Incline Dumbbell Press',3,'10-12 Reps','12 Minutes','Upper Chest',
 'Incline dumbbell press focuses on developing the upper chest and shoulder muscles.',
 'Set the bench at an incline angle|Hold one dumbbell in each hand|Lower the dumbbells towards your upper chest|Push both dumbbells upward with control',
 '/videos/incline-press.mp4','https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900'),

('Muscle Building','Mon','Triceps Rope Pushdown',3,'12-15 Reps','8 Minutes','Triceps',
 'Rope pushdowns isolate the lateral and long heads of the triceps.',
 'Attach rope to high cable pulley|Keep elbows tucked to your sides|Push downward and spread the rope at bottom|Return slowly to 90-degree elbow flexion',
 '/videos/triceps-pushdown.mp4','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900');

-- Sample Diet Plans - Muscle Building / Non-Vegetarian / Monday
INSERT IGNORE INTO `diet_plans` (`category`, `diet_type`, `day`, `meal_type`, `title`, `time_slot`, `calories`, `nutrients`, `portion_note`, `image_url`) VALUES
('Muscle Building','non-vegetarian','Mon','Breakfast','Chicken & Egg Power Breakfast','08:00 AM - 8:30 AM','480 kcal',
 '3 Whole Eggs + 4 Egg Whites + 2 Whole Wheat Toast','Portion Recommendation',
 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80'),

('Muscle Building','non-vegetarian','Mon','Lunch','Chicken Rice Bowl','12:30 PM - 1:00 PM','620 kcal',
 '150g Grilled Chicken + 1 Cup Steamed Rice + Dal','Portion Recommendation',
 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'),

('Muscle Building','non-vegetarian','Mon','Dinner','Salmon & Quinoa Plate','05:00 PM - 5:30 PM','590 kcal',
 '150g Salmon + Quinoa + Roasted Veggies','Portion Recommendation',
 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80'),

-- Muscle Building / Vegetarian / Monday
('Muscle Building','vegetarian','Mon','Breakfast','Paneer Oats Bowl','08:00 AM - 8:30 AM','450 kcal',
 'Oats + Paneer + Chia Seeds + Banana','Portion Recommendation',
 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'),

('Muscle Building','vegetarian','Mon','Lunch','Soya Chunks Rice Bowl','12:30 PM - 1:00 PM','560 kcal',
 '1 Cup Soya Chunks + Brown Rice + Lentils','Portion Recommendation',
 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'),

('Muscle Building','vegetarian','Mon','Dinner','Tofu & Veggie Stir-Fry','05:00 PM - 5:30 PM','540 kcal',
 'Tofu + Mixed Veggies + Quinoa + Olive Oil','Portion Recommendation',
 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80');
