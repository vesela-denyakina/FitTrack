-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2026 at 01:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fittrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `meal_id` int(11) NOT NULL,
  `meal_name` varchar(100) NOT NULL,
  `meal_type` enum('Закуска','Обяд','Вечеря','Снак') NOT NULL,
  `calories_per_portion` int(11) DEFAULT NULL,
  `portion_size` decimal(4,2) DEFAULT 1.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meals`
--

INSERT INTO `meals` (`meal_id`, `meal_name`, `meal_type`, `calories_per_portion`, `portion_size`) VALUES
(1, 'Овесени ядки', 'Закуска', 350, 1.00),
(2, 'Омлет', 'Закуска', 400, 1.00),
(3, 'Пилешка салата', 'Обяд', 450, 1.00),
(4, 'Ориз със зеленчуци', 'Обяд', 500, 1.00),
(5, 'Паста', 'Вечеря', 650, 1.00),
(6, 'Риба със салата', 'Вечеря', 480, 1.00),
(7, 'Протеинов шейк', 'Снак', 250, 1.00),
(8, 'Ябълка', 'Снак', 95, 0.50),
(9, 'Банан', 'Снак', 110, 2.00),
(10, 'Сандвич', 'Обяд', 420, 1.00),
(11, 'Телешко със картофи', 'Вечеря', 700, 1.00),
(12, 'Кисело мляко', 'Снак', 180, 1.20),
(13, 'Палачинки', 'Закуска', 520, 1.00),
(14, 'Смути', 'Закуска', 300, 1.00),
(15, 'Супа', 'Обяд', 350, 1.00),
(16, 'Пица', 'Вечеря', 800, 0.50),
(17, 'Яйца на очи', 'Закуска', 380, 1.00),
(18, 'Салата Цезар', 'Обяд', 460, 1.00),
(19, 'Ризото', 'Вечеря', 600, 1.00),
(20, 'Шоколад', 'Снак', 220, 0.25);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL CHECK (`age` between 10 and 100),
  `weight` decimal(5,2) NOT NULL,
  `height` decimal(4,2) NOT NULL,
  `gender` enum('Мъж','Жена') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `age`, `weight`, `height`, `gender`) VALUES
(1, 'Иван Петров', 18, 75.50, 1.78, 'Мъж'),
(2, 'Мария Иванова', 17, 58.20, 1.65, 'Жена'),
(3, 'Георги Георгиев', 20, 82.00, 1.82, 'Мъж'),
(4, 'Елена Димитрова', 19, 60.00, 1.68, 'Жена'),
(5, 'Николай Стоянов', 22, 90.30, 1.85, 'Мъж'),
(6, 'Петя Николова', 21, 55.00, 1.62, 'Жена'),
(7, 'Даниел Тодоров', 23, 88.70, 1.80, 'Мъж'),
(8, 'Силвия Илиева', 18, 59.40, 1.66, 'Жена'),
(9, 'Христо Василев', 24, 92.00, 1.88, 'Мъж'),
(10, 'Александра Костова', 20, 57.80, 1.64, 'Жена'),
(11, 'Мартин Петров', 26, 85.00, 1.83, 'Мъж'),
(12, 'Виктория Димова', 25, 62.00, 1.70, 'Жена'),
(13, 'Стефан Марков', 28, 95.50, 1.90, 'Мъж'),
(14, 'Ралица Стоянова', 19, 54.30, 1.61, 'Жена'),
(15, 'Калоян Иванов', 21, 80.00, 1.79, 'Мъж'),
(16, 'Надежда Георгиева', 22, 59.00, 1.67, 'Жена'),
(17, 'Пламен Колев', 30, 98.00, 1.87, 'Мъж'),
(18, 'Десислава Христова', 27, 61.50, 1.69, 'Жена'),
(19, 'Борислав Ангелов', 24, 86.20, 1.81, 'Мъж'),
(20, 'Милена Тодорова', 23, 56.00, 1.63, 'Жена');

-- --------------------------------------------------------

--
-- Table structure for table `user_meals`
--

CREATE TABLE `user_meals` (
  `user_id` int(11) NOT NULL,
  `meal_id` int(11) NOT NULL,
  `meal_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_meals`
--

INSERT INTO `user_meals` (`user_id`, `meal_id`, `meal_date`) VALUES
(1, 1, '2025-01-01'),
(1, 7, '2025-01-01'),
(2, 3, '2025-01-02'),
(3, 6, '2025-01-03'),
(4, 9, '2025-01-04');

-- --------------------------------------------------------

--
-- Table structure for table `user_workouts`
--

CREATE TABLE `user_workouts` (
  `user_id` int(11) NOT NULL,
  `workout_id` int(11) NOT NULL,
  `workout_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_workouts`
--

INSERT INTO `user_workouts` (`user_id`, `workout_id`, `workout_date`) VALUES
(1, 1, '2025-01-01'),
(2, 2, '2025-01-02'),
(3, 3, '2025-01-03'),
(4, 4, '2025-01-04'),
(5, 5, '2025-01-05');

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `workout_id` int(11) NOT NULL,
  `workout_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `duration_minutes` int(11) NOT NULL CHECK (`duration_minutes` > 0),
  `calories_per_minute` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`workout_id`, `workout_name`, `description`, `duration_minutes`, `calories_per_minute`) VALUES
(1, 'Гръб и бицепс', 'Силова тренировка - горна част на тялото', 60, 8.50),
(2, 'Гърди и трицепс', 'Силова тренировка - горна част на тялото', 55, 8.50),
(3, 'Крака', 'Силова тренировка за крака', 70, 9.50),
(4, 'Кардио', 'Бягане и колело', 40, 10.00),
(5, 'Корем', 'Упражнения за корем', 30, 7.00),
(6, 'Функционална', 'Цяло тяло', 50, 9.00),
(7, 'HIIT', 'Интензивна тренировка', 35, 11.00),
(8, 'Йога', 'Разтягане и баланс', 45, 4.50),
(9, 'Пилатес', 'Стабилност и корем', 40, 5.00),
(10, 'Кросфит', 'Комбинирана тренировка', 60, 11.50),
(11, 'Рамо', 'Изолирана тренировка', 50, 8.00),
(12, 'Гръб', 'Изолирана тренировка', 55, 8.50),
(13, 'Бицепс', 'Изолирана тренировкае', 45, 7.50),
(14, 'Трицепс', 'Изолирана тренировка', 45, 7.50),
(15, 'Кардио интервали', 'Интервално кардио', 30, 10.50),
(16, 'Стречинг', 'Разтягане', 25, 4.00),
(17, 'Силова обща', 'Цяло тяло', 65, 9.00),
(18, 'Фитнес за начинаещи', 'Лека тренировка', 40, 6.50),
(19, 'Фитнес за напреднали', 'Тежка тренировка', 75, 10.00),
(20, 'Възстановяване', 'Лека активност', 30, 4.50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`meal_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_meals`
--
ALTER TABLE `user_meals`
  ADD PRIMARY KEY (`user_id`,`meal_id`,`meal_date`),
  ADD KEY `meal_id` (`meal_id`);

--
-- Indexes for table `user_workouts`
--
ALTER TABLE `user_workouts`
  ADD PRIMARY KEY (`user_id`,`workout_id`,`workout_date`),
  ADD KEY `workout_id` (`workout_id`);

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`workout_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `workout_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_meals`
--
ALTER TABLE `user_meals`
  ADD CONSTRAINT `user_meals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_meals_ibfk_2` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`meal_id`);

--
-- Constraints for table `user_workouts`
--
ALTER TABLE `user_workouts`
  ADD CONSTRAINT `user_workouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_workouts_ibfk_2` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`workout_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
