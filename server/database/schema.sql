-- ======================================================
-- Gym Management System - Database Schema
-- File: schema.sql
-- ======================================================

-- 1. Create database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS `gym_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gym_db`;

-- 2. Users Table (Members / Admin)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(15) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('member', 'trainer', 'admin') DEFAULT 'member',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Membership Plans Table
CREATE TABLE IF NOT EXISTS `plans` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `price` DECIMAL(10, 2) NOT NULL,
  `duration_months` INT DEFAULT 1,
  `features` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Memberships Table
CREATE TABLE IF NOT EXISTS `memberships` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `plan_name` VARCHAR(100) NOT NULL,
  `start_date` DATE DEFAULT NULL,
  `end_date` DATE DEFAULT NULL,
  `status` ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Payments Table
CREATE TABLE IF NOT EXISTS `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `plan_name` VARCHAR(100) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `payment_method` VARCHAR(50) DEFAULT 'UPI',
  `transaction_id` VARCHAR(100),
  `status` ENUM('success', 'pending', 'failed') DEFAULT 'success',
  `paid_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Fitness Profiles (Onboarding data)
CREATE TABLE IF NOT EXISTS `fitness_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `goal` VARCHAR(100) DEFAULT 'muscle-building',
  `diet` VARCHAR(100) DEFAULT '',
  `weight` DECIMAL(5, 2) DEFAULT NULL,
  `height` DECIMAL(5, 2) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 8. Seed Default Plans if not exists
INSERT IGNORE INTO `plans` (`name`, `price`, `duration_months`, `features`) VALUES
('Monthly Starter', 1499.00, 1, 'Full Gym Access, Free Locker, General Trainer Guidance'),
('Quarterly Pro', 3999.00, 3, 'Full Gym Access, Diet Plan, Personal Trainer Support (2 sessions)'),
('Annual Elite', 11999.00, 12, 'VIP Access, Customized Diet & Workout Plan, Unlimited Trainer Support, Free Steam Bath');
