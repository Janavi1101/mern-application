-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2026 at 05:32 PM
-- Server version: 9.1.0
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mern_auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `status` enum('active','pending','completed') DEFAULT 'active',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `user_id`, `title`, `description`, `status`, `created_at`, `updated_at`) VALUES
(3, 2, 'Internship project', 'Registration page', 'pending', '2026-04-26 16:54:21.602241', '2026-04-27 14:22:27.726527'),
(4, 5, NULL, NULL, NULL, '2026-04-27 16:19:24.416420', '2026-04-27 16:19:24.416420'),
(6, 2, 'Data Analysis', 'Assignment', 'active', '2026-04-28 16:02:14.581762', '2026-04-28 16:02:14.581762'),
(7, 8, 'Java', 'Assignment', 'active', '2026-04-29 17:09:54.016784', '2026-04-29 17:09:54.016784');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `reset_token`, `reset_token_expiry`, `created_at`, `updated_at`) VALUES
(1, 'Janavi H Gowda', 'janavihgowda.brigade@gmail.com', NULL, '$2b$10$/0WAViGcj5.UMnD4Wd1z5OQlpKABdf.ksB9w4IFe7WYu8d/hU938e', '2581f022c3af475e1a22a0c51e39a9b176855655512519e26a6755827cbcda84', '2026-05-01 21:03:12', '2026-04-13 12:07:37', '2026-05-01 15:23:11.965681'),
(2, 'Janavi', 'janavi@gmail.com', '9876543210', '$2b$10$vuXufgoH85quKZsUsfLuoOJiRljXvbQcwyFxRWWBhBfUZWQ3/84Lq', NULL, NULL, '2026-04-26 13:24:49', '2026-05-01 15:22:57.795199'),
(3, 'Lohith', 'lohith@gmail.com', '7586256961', '$2b$10$17wdeJl4h64Y8k9DymI9mefYAJxir61vWL0bdu311cAOcHi7KFLZS', NULL, NULL, '2026-04-26 15:40:11', '2026-04-26 15:43:08.483136'),
(4, 'Lavanya', 'lavanya@gmail.com', '8428155555', '$2b$10$bql4hbN88usIsE9DHIKumOv.hUAsDvHSY7xB2j6j9uPb4tfAPD95m', NULL, NULL, '2026-04-27 14:43:25', '2026-04-27 14:43:25.719035'),
(5, 'Khushi', 'khushi@example.com', '9876543210', '$2b$10$0mRp/3NRO9tiveiT5kk5beMEdJN86VMQ/H5yBXY/20Gw0YlB1H05i', NULL, NULL, '2026-04-27 16:04:36', '2026-04-27 16:15:56.746145'),
(6, 'Sneha', 'sneha@gmail.com', '7586941236', '$2b$10$V9QqXNVujDPm7pNa0f01hu3ojM1gZGsMcQEq886jmMWP7z6KLwFr.', NULL, NULL, '2026-04-28 15:59:09', '2026-04-28 15:59:09.003016'),
(7, 'Neha', 'neha@gmail.com', '8596321478', '$2b$10$5pGs7qlPpSFUSQkfszuTxu89G7jHtZkA9rl8R3jXqVmznyhSOL3gq', NULL, NULL, '2026-04-28 15:59:56', '2026-04-28 15:59:56.613836'),
(8, 'Lekhan', 'lekhan@gmail.com', '7485961235', '$2b$10$mhb3rR/Sd.aX.DIfv11LK.9Tqo9Vaw9Zq7nQP.bRdmtC8gsuIajiC', NULL, NULL, '2026-04-29 17:09:19', '2026-04-29 17:09:19.483485');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
