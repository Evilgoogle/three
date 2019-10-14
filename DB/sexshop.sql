-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 26 2019 г., 11:45
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
-- Структура таблицы `blocks`
--

CREATE TABLE `blocks` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `desc` longtext COLLATE utf8mb4_unicode_ci,
  `position` int(11) DEFAULT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `carts`
--

CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL,
  `session_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(20, 1, 'Вибраторы двойные', NULL, NULL, 0, 'vibratori-dvoynie-20', 20, 1, 'all', '2019-07-21 05:29:07', '2019-07-21 05:29:07');

-- --------------------------------------------------------

--
-- Структура таблицы `configs`
--

CREATE TABLE `configs` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` text COLLATE utf8mb4_unicode_ci,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `filemanagers`
--

CREATE TABLE `filemanagers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `big` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alt` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `filemanagers`
--

INSERT INTO `filemanagers` (`id`, `name`, `image`, `big`, `alt`, `created_at`, `updated_at`, `size`, `type`) VALUES
(13, '3e1d80b836161f5a1104b3a5d69457ed4fccc724', 'pic1563441379bf4a80a81f8b1c324bc8ccbb64bc2ec9.jpg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '31251', 'image/jpeg'),
(14, 'articles_2', 'pic1563441379fa4058e45417f17947a6550eb2580122.jpg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '25768', 'image/jpeg'),
(15, 'main_icon1', 'pic1563441379d67d82f68c852d7b4599d45a25daf737.svg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '2542', 'image/svg+xml'),
(16, 'delivery_image_m', 'pic1563441379a6e1e03f8b9b1178d1401bcd98a5bf82.jpg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '44186', 'image/jpeg'),
(17, 'goods_2', 'pic1563441379ad52c70b7285183331a5b2124825afe9.jpg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '55873', 'image/jpeg'),
(18, 'delivery_image', 'pic1563441379fc121f39f8b0eebfaf369d13f242a70f.jpg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '177880', 'image/jpeg'),
(19, 'main_icon2', 'pic1563441379b746fc7277df722f688bc5e660a3f5df.svg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '597', 'image/svg+xml'),
(20, 'main_icon3', 'pic156344137958e5e858d9265e5822d6296c5f12295e.svg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '1647', 'image/svg+xml'),
(21, 'main_icon4', 'pic15634413790af4b6a15c53d412d8e84f33f1726945.svg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '1104', 'image/svg+xml'),
(22, 'main_icon5', 'pic15634413799658d02f5aa4d816d7dc091e22016184.svg', NULL, NULL, '2019-07-18 09:16:19', '2019-07-18 09:16:19', '2016', 'image/svg+xml'),
(23, 'articles_1', 'pic15634413801ca621dd2b55ce1af04c3b3a01abba7e.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '83664', 'image/jpeg'),
(24, 'goods_1', 'pic156344138033abc914c66a6892eef282aa3da7f34f.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '69782', 'image/jpeg'),
(25, 'articles_4', 'pic15634413804f31337513709b113aa9563840b8eae7.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '84752', 'image/jpeg'),
(26, 'p_cat2', 'pic1563441380137d03359d0c0774cc3c7639962f8dc5.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '32108', 'image/jpeg'),
(27, 'p_cat1', 'pic156344138039cf27f937ec78de8273f49029b69265.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '27225', 'image/jpeg'),
(28, 'p_cat3', 'pic15634413808f832e91575ee585bf091fdb895ffeaf.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '17893', 'image/jpeg'),
(29, 'p_cat4', 'pic15634413802e52a1d249c9d7e9501350fef66c3701.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '15430', 'image/jpeg'),
(30, 'p_cat6', 'pic15634413808674c4bbd0b661f599c78e7ecf64195c.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '24113', 'image/jpeg'),
(31, 'p_cat7', 'pic156344138002f9daa8a078d2e4ceeffe287d78f5f1.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '27839', 'image/jpeg'),
(32, 'p_cat5', 'pic15634413805847b5d7b6c62b40a7862e7db3a24919.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '20686', 'image/jpeg'),
(33, 'p_cat8', 'pic1563441380b2f35bfeb8f221788525eb02c93287fe.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '19151', 'image/jpeg'),
(34, 'reviews1', 'pic1563441380e6f44e538651e8afe94d25a49f1fdc98.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '21724', 'image/jpeg'),
(35, 'reviews2', 'pic1563441380a0fc033827600ef935704e69fc39dcc2.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '54697', 'image/jpeg'),
(36, 'reviews4', 'pic1563441380548778159a10357e1ca2a24f9be83e30.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '34624', 'image/jpeg'),
(37, 'reviews3', 'pic1563441380e056c9cd494dd76161d0006984448f44.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '47052', 'image/jpeg'),
(38, 'stock_2', 'pic1563441380204e8b2e111c4a7458bc0fe6897fe5ed.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '60530', 'image/jpeg'),
(39, 'stock_1', 'pic15634413805cd3066516cff338710bd2ea0237269f.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '53831', 'image/jpeg'),
(40, 'articles_3', 'pic1563441380a6189c4b5a063183fecf2c3fc45039bf.jpg', NULL, NULL, '2019-07-18 09:16:20', '2019-07-18 09:16:20', '138240', 'image/jpeg'),
(41, 'goods_show1', 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, NULL, '2019-07-18 09:16:21', '2019-07-18 09:16:21', '149163', 'image/jpeg'),
(42, 'stock_3', 'pic1563441381a1a42b76016343b6da7cb2a3e253c2a5.jpg', NULL, NULL, '2019-07-18 09:16:21', '2019-07-18 09:16:21', '146751', 'image/jpeg'),
(43, 'articles_main', 'pic15634413816d1b2a10b80d5cbb1341ecd9a469470e.jpg', NULL, NULL, '2019-07-18 09:16:21', '2019-07-18 09:16:21', '317736', 'image/jpeg'),
(44, 'main_pic2', 'pic156344138145f4bd4c040818384e918b77b436e51e.jpg', NULL, NULL, '2019-07-18 09:16:21', '2019-07-18 09:16:21', '288967', 'image/jpeg'),
(45, 'main_pic', 'pic1563441381e2329422f5ee98b174b59969a1d22417.jpg', NULL, NULL, '2019-07-18 09:16:21', '2019-07-18 09:16:21', '919021', 'image/jpeg'),
(46, 'main_pic3', 'pic1563441381380447dd883bab57f161580520334a1f.jpg', NULL, NULL, '2019-07-18 09:16:21', '2019-07-18 09:16:21', '850054', 'image/jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `code` int(11) DEFAULT NULL,
  `vendor_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `color` text COLLATE utf8mb4_unicode_ci,
  `material` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `availability` enum('В наличии','Нет в наличии','На складе','На заказ') COLLATE utf8mb4_unicode_ci DEFAULT 'В наличии',
  `url` text COLLATE utf8mb4_unicode_ci,
  `enable` tinyint(1) DEFAULT '1',
  `position` int(11) DEFAULT NULL,
  `sex` enum('all','man','woman') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `category_id`, `title`, `desc`, `code`, `vendor_code`, `price`, `discount`, `color`, `material`, `image`, `availability`, `url`, `enable`, `position`, `sex`, `created_at`, `updated_at`) VALUES
(8, 16, '11', '111', NULL, NULL, 1222, 12, '12', '12', 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', 'На складе', '11-8', 1, 8, 'all', '2019-07-21 16:07:06', '2019-07-22 07:40:30'),
(9, 1, '222', '222', NULL, NULL, 4000, 12, '22', '2', 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', 'Нет в наличии', '222-9', 1, 9, 'all', '2019-07-21 16:11:26', '2019-07-23 04:28:43'),
(10, 16, '11dd', NULL, NULL, NULL, 1221, 12, '11', '11', 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', 'На складе', '11dd-10', 1, 10, 'woman', '2019-07-22 07:28:58', '2019-07-22 07:28:58'),
(11, 20, 'Double', '1212', NULL, NULL, 2000, 12, '121221', NULL, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', 'На складе', 'double-11', 1, 11, 'woman', '2019-07-22 10:22:18', '2019-07-22 10:22:18'),
(12, 14, 'BDSM', 'awfw', NULL, NULL, 1212, 12, '12', '2', 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', 'На складе', 'bdsm-12', 1, 12, 'woman', '2019-07-22 10:24:34', '2019-07-22 10:24:34'),
(13, 1, '222dd', 'dd', NULL, NULL, 1288, NULL, '221', '2', 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', 'В наличии', '222dd-13', 1, 13, 'woman', '2019-07-23 06:09:25', '2019-07-23 06:09:25'),
(14, 1, '22ee', 'awfaf', NULL, NULL, 122, NULL, NULL, NULL, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', 'В наличии', '22ee-14', 1, 14, 'woman', '2019-07-23 06:50:32', '2019-07-23 06:50:32');

-- --------------------------------------------------------

--
-- Структура таблицы `items_views_goods`
--

CREATE TABLE `items_views_goods` (
  `id` int(10) UNSIGNED NOT NULL,
  `item` int(11) DEFAULT NULL,
  `view_item` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `items_views_goods`
--

INSERT INTO `items_views_goods` (`id`, `item`, `view_item`, `created_at`, `updated_at`) VALUES
(5, 9, 13, '2019-07-23 06:50:58', '2019-07-23 06:50:58'),
(6, 9, 14, '2019-07-23 06:59:29', '2019-07-23 06:59:29');

-- --------------------------------------------------------

--
-- Структура таблицы `item_images`
--

CREATE TABLE `item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `item_images`
--

INSERT INTO `item_images` (`id`, `item_id`, `image`, `position`, `created_at`, `updated_at`) VALUES
(8, 8, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-21 16:07:06', '2019-07-21 16:07:06'),
(9, 9, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-21 16:11:26', '2019-07-21 16:11:26'),
(10, 10, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-22 07:28:58', '2019-07-22 07:28:58'),
(11, 10, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-22 07:28:58', '2019-07-22 07:28:58'),
(12, 11, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-22 10:22:18', '2019-07-22 10:22:18'),
(13, 11, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-22 10:22:18', '2019-07-22 10:22:18'),
(14, 12, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-22 10:24:34', '2019-07-22 10:24:34'),
(15, 13, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-23 06:09:25', '2019-07-23 06:09:25'),
(16, 14, 'pic156344138189296207c6927c3415ab7465ecb5189a.jpg', NULL, '2019-07-23 06:50:32', '2019-07-23 06:50:32');

-- --------------------------------------------------------

--
-- Структура таблицы `item_reviews`
--

CREATE TABLE `item_reviews` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '0',
  `name` text COLLATE utf8mb4_unicode_ci,
  `email` text COLLATE utf8mb4_unicode_ci,
  `text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `languages`
--

CREATE TABLE `languages` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default` int(11) DEFAULT NULL,
  `data` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `language_interfaces`
--

CREATE TABLE `language_interfaces` (
  `id` int(10) UNSIGNED NOT NULL,
  `lang_id` int(11) DEFAULT NULL,
  `key` text COLLATE utf8mb4_unicode_ci,
  `name` text COLLATE utf8mb4_unicode_ci,
  `data` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2018_01_24_183430_create_subscribes_table', 1),
(4, '2018_02_19_160126_create_seos_table', 1),
(5, '2018_02_19_184508_entrust_setup_tables', 1),
(6, '2018_07_16_115456_languages', 1),
(7, '2018_07_18_105822_language_interface', 1),
(8, '2019_04_23_103529_filemanager', 1),
(9, '2019_04_23_173525_filemanager_size', 1),
(10, '2019_04_24_154835_filemanager_type', 1),
(11, '2019_07_17_114251_create_categories_table', 2),
(12, '2019_07_17_123431_create_blocks_table', 3),
(13, '2019_07_17_123542_create_configs_table', 3),
(14, '2019_07_17_161920_create_sliders_table', 4),
(21, '2019_07_17_174929_create_items_table', 5),
(22, '2019_07_17_181738_create_item_images_table', 5),
(23, '2019_07_19_104400_categories2items', 6),
(24, '2019_07_23_114922_items_view_goods', 7),
(25, '2019_07_23_133431_item_reviews', 8),
(26, '2019_07_23_171031_cart', 9),
(27, '2019_07_24_085705_create_sessions_table', 10),
(28, '2019_07_24_152651_order', 11),
(29, '2019_07_24_171359_order_goods', 12);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `ordernumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `sum` int(11) DEFAULT NULL,
  `pay_method` enum('Наличными','Банковской картой') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Наличными',
  `delivery_method` enum('Доставка','Самовывоз') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Самовывоз',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `status_pay` tinyint(1) NOT NULL DEFAULT '0',
  `status_delivery` tinyint(1) NOT NULL DEFAULT '0',
  `payment_result` text COLLATE utf8mb4_unicode_ci,
  `pg_sig` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `ordernumber`, `session_id`, `name`, `phone`, `city`, `address`, `sum`, `pay_method`, `delivery_method`, `status`, `status_pay`, `status_delivery`, `payment_result`, `pg_sig`, `created_at`, `updated_at`) VALUES
(1, 'KZ2019-26070234-1', 'r6aknwth5dG9qxnSNgY2JEGrNDMaCTnUUBaNxzNz', '1212', '+7 (121) 212 1212', '1212', '121212', 2141, 'Банковской картой', 'Доставка', 0, 0, 0, NULL, NULL, '2019-07-26 08:34:43', '2019-07-26 08:34:43');

-- --------------------------------------------------------

--
-- Структура таблицы `order_goods`
--

CREATE TABLE `order_goods` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `count` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `order_goods`
--

INSERT INTO `order_goods` (`id`, `order_id`, `code`, `title`, `price`, `count`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'BDSM', '1066.56', '1', '2019-07-26 08:34:43', '2019-07-26 08:34:43'),
(2, 1, NULL, '11dd', '1074.48', '1', '2019-07-26 08:34:43', '2019-07-26 08:34:43');

-- --------------------------------------------------------

--
-- Структура таблицы `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'user-read', 'Просмотр пользователей', 'Просмотр списка пользователей', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(2, 'user-create', 'Создать пользователя', 'Создать нового пользователя', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(3, 'user-edit', 'Изменить пользователя', 'Изменить пользователя', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(4, 'user-delete', 'Удалить пользователя', 'Удалить пользователя', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(5, 'role-read', 'Просмотр ролей', 'Просмотр списка ролей', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(6, 'role-create', 'Создать роль', 'Создать новую роль', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(7, 'role-edit', 'Изменить роль', 'Изменить роль', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(8, 'role-delete', 'Удалить роль', 'Удалить роль', '2019-07-17 05:05:06', '2019-07-17 05:05:06');

-- --------------------------------------------------------

--
-- Структура таблицы `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'superadmin', 'Суперадмин', 'Полный доступ к функционалу', '2019-07-17 05:05:06', '2019-07-17 05:05:06'),
(2, 'login', 'Логин', 'Добавленный пользователь, имеет доступ только к личному кабинету. Роль присваивается автоматически.', '2019-07-17 05:05:06', '2019-07-17 05:05:06');

-- --------------------------------------------------------

--
-- Структура таблицы `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `seos`
--

CREATE TABLE `seos` (
  `id` int(10) UNSIGNED NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci,
  `page` text COLLATE utf8mb4_unicode_ci,
  `title` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `keywords` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `seos`
--

INSERT INTO `seos` (`id`, `url`, `page`, `title`, `description`, `keywords`, `created_at`, `updated_at`) VALUES
(1, 'main', 'Главная', NULL, NULL, NULL, '2019-07-17 05:05:06', '2019-07-17 05:05:06');

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('r6aknwth5dG9qxnSNgY2JEGrNDMaCTnUUBaNxzNz', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoia2VBdEJmOXZXdW1WQ2VXU2t6b3B5WWtXemlPOHdUa1poMG1UV2FkeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9mcmVlbGlmZS5sb2NhbC9hZG1pbi9vcmRlcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1564130333),
('z74CA1fcXGJ6br2b8HurwaiVgjAgMiFMbjRmduLc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2hnRHRJZ0tNVWU3YmJ4bnNsTU1TN0JGaWRRWUk3NlMzOFMzdzIxViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9mcmVlbGlmZS5sb2NhbCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1564127714),
('zxueoi0V3A0dyVbFRq6v5sD1ITjko784ViYGQN92', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUEdFWmx2akxMUXpscjRISG5DS28zcVRuTG0wcjhUOFdNSzJJQUliZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9mcmVlbGlmZS5sb2NhbC9zdG9ja3MiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1563937615);

-- --------------------------------------------------------

--
-- Структура таблицы `sliders`
--

CREATE TABLE `sliders` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` text COLLATE utf8mb4_unicode_ci,
  `position` int(11) DEFAULT NULL,
  `enable` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sliders`
--

INSERT INTO `sliders` (`id`, `title`, `image`, `icon`, `url`, `position`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'Секс игрушки', 'pic1563441381e2329422f5ee98b174b59969a1d22417.jpg', 'pic1563441379d67d82f68c852d7b4599d45a25daf737.svg', '/', 1, 1, '2019-07-17 11:41:02', '2019-07-19 11:32:37'),
(2, 'БДСМ / Фетиш', 'pic156344138145f4bd4c040818384e918b77b436e51e.jpg', 'pic1563441379b746fc7277df722f688bc5e660a3f5df.svg', '/', 2, 1, '2019-07-17 11:41:52', '2019-07-19 11:32:37'),
(3, 'Эротическое белье', 'pic1563441381380447dd883bab57f161580520334a1f.jpg', 'pic156344137958e5e858d9265e5822d6296c5f12295e.svg', '/', 3, 1, '2019-07-17 11:42:37', '2019-07-19 11:32:37'),
(4, 'Лубриканты', 'pic1563441381e2329422f5ee98b174b59969a1d22417.jpg', 'pic15634413790af4b6a15c53d412d8e84f33f1726945.svg', '/', 4, 1, '2019-07-17 11:46:19', '2019-07-18 09:31:07'),
(5, 'БАДЫ', 'pic156344138145f4bd4c040818384e918b77b436e51e.jpg', 'pic15634413799658d02f5aa4d816d7dc091e22016184.svg', '/', 5, 1, '2019-07-17 11:47:05', '2019-07-18 09:31:22');

-- --------------------------------------------------------

--
-- Структура таблицы `subscribes`
--

CREATE TABLE `subscribes` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@lovestyle.kz', '$2y$10$gO3481a7aAN6H3JXhQA5S.Wdkt0auSTKpEQngkCb6StQUhy1kpJri', 'vWAuoJ9vMZJpoK98MauegYvzoC9MfnSGPrlaksBsmirwcsfki0QDbjD5uZlZ', '2019-07-17 05:05:06', '2019-07-17 05:05:06');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `filemanagers`
--
ALTER TABLE `filemanagers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `items_views_goods`
--
ALTER TABLE `items_views_goods`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `item_images`
--
ALTER TABLE `item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_images_item_id_foreign` (`item_id`);

--
-- Индексы таблицы `item_reviews`
--
ALTER TABLE `item_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `language_interfaces`
--
ALTER TABLE `language_interfaces`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ixOrdernumber` (`ordernumber`);

--
-- Индексы таблицы `order_goods`
--
ALTER TABLE `order_goods`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Индексы таблицы `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Индексы таблицы `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Индексы таблицы `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Индексы таблицы `seos`
--
ALTER TABLE `seos`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD UNIQUE KEY `sessions_id_unique` (`id`);

--
-- Индексы таблицы `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `subscribes`
--
ALTER TABLE `subscribes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscribes_email_unique` (`email`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `configs`
--
ALTER TABLE `configs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `filemanagers`
--
ALTER TABLE `filemanagers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `items_views_goods`
--
ALTER TABLE `items_views_goods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `item_images`
--
ALTER TABLE `item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `item_reviews`
--
ALTER TABLE `item_reviews`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `language_interfaces`
--
ALTER TABLE `language_interfaces`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `order_goods`
--
ALTER TABLE `order_goods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `seos`
--
ALTER TABLE `seos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `subscribes`
--
ALTER TABLE `subscribes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `item_images`
--
ALTER TABLE `item_images`
  ADD CONSTRAINT `item_images_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
