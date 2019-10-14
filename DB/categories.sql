-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 28 2019 г., 10:18
-- Версия сервера: 5.7.20
-- Версия PHP: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sexshop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent` int(11) NOT NULL DEFAULT '0',
  `title` text COLLATE utf8mb4_unicode_ci,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `popular` tinyint(1) DEFAULT '1',
  `url` text COLLATE utf8mb4_unicode_ci,
  `position` int(11) DEFAULT NULL,
  `enable` tinyint(4) NOT NULL DEFAULT '1',
  `sex` enum('all','man','woman') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `parent`, `title`, `desc`, `image`, `popular`, `url`, `position`, `enable`, `sex`, `created_at`, `updated_at`) VALUES
(1, 0, 'Вибраторы', NULL, 'pic156344138039cf27f937ec78de8273f49029b69265.jpg', 1, 'vibratori-1', 1, 1, 'woman', '2019-07-17 10:17:53', '2019-07-22 10:34:03'),
(2, 0, 'БДСМ / Фетиш', NULL, 'pic1563441380137d03359d0c0774cc3c7639962f8dc5.jpg', 1, 'bdsm-fetish-2', 2, 1, 'all', '2019-07-17 10:45:37', '2019-07-18 09:46:30'),
(3, 0, 'Клиторальные массажеры', NULL, 'pic15634413808f832e91575ee585bf091fdb895ffeaf.jpg', 1, 'klitoralnie-massazheri-3', 3, 1, 'woman', '2019-07-17 10:45:52', '2019-07-18 09:46:38'),
(4, 0, 'Анальные игрушки', NULL, 'pic15634413802e52a1d249c9d7e9501350fef66c3701.jpg', 1, 'analnie-igrushki-4', 4, 1, 'woman', '2019-07-17 10:46:27', '2019-07-18 09:46:47'),
(5, 0, 'Фалоимитаторы', NULL, 'pic15634413805847b5d7b6c62b40a7862e7db3a24919.jpg', 1, 'faloimitatori-5', 5, 1, 'woman', '2019-07-17 10:46:48', '2019-07-18 09:46:59'),
(6, 0, 'Мастурбаторы', NULL, 'pic15634413808674c4bbd0b661f599c78e7ecf64195c.jpg', 1, 'masturbatori-6', 6, 1, 'man', '2019-07-17 10:47:02', '2019-07-18 09:47:07'),
(7, 0, 'Эротическое белье', NULL, 'pic156344138002f9daa8a078d2e4ceeffe287d78f5f1.jpg', 1, 'eroticheskoe-bele-7', 7, 1, 'all', '2019-07-17 10:47:23', '2019-07-18 09:47:24'),
(8, 0, 'Лубриканты / БАДЫ', NULL, 'pic1563441380b2f35bfeb8f221788525eb02c93287fe.jpg', 1, 'lubrikanti-badi-8', 8, 1, 'all', '2019-07-17 10:47:38', '2019-07-18 09:47:37'),
(9, 0, 'Вагинальные шарики', NULL, NULL, 0, 'vaginalnie-shariki-9', 9, 1, 'woman', '2019-07-17 11:23:28', '2019-07-19 11:36:17'),
(10, 0, 'Помпы', NULL, NULL, 0, 'pompi-10', 10, 1, 'man', '2019-07-17 11:23:59', '2019-07-19 11:36:23'),
(11, 0, 'Куклы для секса', NULL, NULL, 0, 'kukli-dlya-seksa-11', 11, 1, 'man', '2019-07-17 11:24:18', '2019-07-19 11:36:37'),
(12, 0, 'Насадки на член, кольца', NULL, NULL, 0, 'nasadki-na-chlen-kolca-12', 12, 1, 'man', '2019-07-17 11:24:48', '2019-07-19 11:36:44'),
(13, 0, 'Клиторальные вибраторы', NULL, NULL, 0, 'klitoralnie-vibratori-13', 13, 1, 'woman', '2019-07-17 11:38:34', '2019-07-19 11:37:07'),
(14, 2, 'Набор БДСМ', NULL, NULL, 0, 'nabor-bdsm-14', 14, 1, 'all', '2019-07-19 05:26:22', '2019-07-19 06:02:21'),
(15, 2, 'Фиксация', NULL, NULL, 0, 'fiksaciya-15', 15, 1, 'all', '2019-07-19 06:25:12', '2019-07-19 06:25:12'),
(16, 1, 'Вибраторы с клиторальной стимуляцией', NULL, NULL, 0, 'vibratori-s-klitoralnoy-stimulyaciey-16', 16, 1, 'all', '2019-07-21 05:25:41', '2019-07-21 05:25:42'),
(17, 1, 'Вибраторы', NULL, NULL, 0, 'vibratori-17', 17, 1, 'all', '2019-07-21 05:26:33', '2019-07-21 05:26:33'),
(18, 1, 'Вибраторы с пультом', NULL, NULL, 0, 'vibratori-s-pultom-18', 18, 1, 'all', '2019-07-21 05:27:21', '2019-07-21 05:27:21'),
(19, 1, 'Вибраторы-массажеры', NULL, NULL, 0, 'vibratori-massazheri-19', 19, 1, 'all', '2019-07-21 05:28:28', '2019-07-21 05:28:28'),
(20, 1, 'Вибраторы двойные', NULL, NULL, 0, 'vibratori-dvoynie-20', 20, 1, 'all', '2019-07-21 05:29:07', '2019-07-21 05:29:07'),
(21, 12, 'Виброкольца', NULL, NULL, 0, 'vibrokolca-21', 21, 1, 'man', '2019-07-28 03:21:21', '2019-07-28 03:21:21'),
(22, 12, 'Кольца', NULL, NULL, 0, 'kolca-22', 22, 1, 'man', '2019-07-28 03:21:42', '2019-07-28 03:21:42'),
(23, 12, 'Насадка на член', NULL, NULL, 0, 'nasadka-na-chlen-23', 23, 1, 'man', '2019-07-28 03:22:20', '2019-07-28 03:22:20'),
(24, 7, 'Корсеты', NULL, NULL, 0, 'korseti-24', 24, 1, 'woman', '2019-07-28 06:15:55', '2019-07-28 06:16:41'),
(25, 7, 'Латексный костюм', NULL, NULL, 0, 'lateksniy-kostyum-25', 25, 1, 'all', '2019-07-28 06:16:33', '2019-07-28 06:16:33'),
(26, 7, 'Платье', NULL, NULL, 0, 'plate-26', 26, 1, 'woman', '2019-07-28 06:16:59', '2019-07-28 06:16:59'),
(27, 7, 'Халатик', NULL, NULL, 0, 'halatik-27', 27, 1, 'woman', '2019-07-28 06:17:22', '2019-07-28 06:17:22'),
(28, 7, 'Бантик', NULL, NULL, 0, 'bantik-28', 28, 1, 'woman', '2019-07-28 06:17:52', '2019-07-28 06:17:52'),
(29, 7, 'Чулки', NULL, NULL, 0, 'chulki-29', 29, 1, 'woman', '2019-07-28 06:18:12', '2019-07-28 06:18:12'),
(30, 7, 'Комплекты', NULL, NULL, 0, 'komplekti-30', 30, 1, 'woman', '2019-07-28 06:18:24', '2019-07-28 06:18:24'),
(31, 7, 'Комбинации', NULL, NULL, 0, 'kombinacii-31', 31, 1, 'woman', '2019-07-28 06:18:51', '2019-07-28 06:18:51'),
(32, 7, 'Пеньюар', NULL, NULL, 0, 'penyuar-32', 32, 1, 'woman', '2019-07-28 06:19:18', '2019-07-28 06:19:18');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
