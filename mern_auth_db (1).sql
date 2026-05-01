-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2026 at 05:59 PM
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
(2, 2, 'Java', 'Project', 'completed', '2026-04-26 16:38:46.482959', '2026-04-27 14:22:38.504947'),
(3, 2, 'Internship project', 'Registration page', 'pending', '2026-04-26 16:54:21.602241', '2026-04-27 14:22:27.726527');

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
(1, 'Janavi H Gowda', 'janavihgowda.brigade@gmail.com', NULL, '$2b$10$t/FiVnFWLToOxinuBkYth./GNVHhNuseQAtRN.GsTWmq5Srec5L7G', NULL, NULL, '2026-04-13 12:07:37', '2026-04-26 16:15:32.859100'),
(2, 'Janavi', 'janavi@gmail.com', '9876543210', '$2b$10$716KxawAYiYLKZe/ZZjLhekbbae6IZ7YPJCiGWhK0suFAm65CRSa6', NULL, NULL, '2026-04-26 13:24:49', '2026-04-27 14:00:55.287683'),
(3, 'Lohith', 'lohith@gmail.com', '7586256961', '$2b$10$17wdeJl4h64Y8k9DymI9mefYAJxir61vWL0bdu311cAOcHi7KFLZS', NULL, NULL, '2026-04-26 15:40:11', '2026-04-26 15:43:08.483136'),
(4, 'Lavanya', 'lavanya@gmail.com', '8428155555', '$2b$10$bql4hbN88usIsE9DHIKumOv.hUAsDvHSY7xB2j6j9uPb4tfAPD95m', NULL, NULL, '2026-04-27 14:43:25', '2026-04-27 14:43:25.719035');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
