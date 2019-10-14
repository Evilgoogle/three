-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 28 2019 г., 09:25
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
-- Структура таблицы `articles`
--

CREATE TABLE `articles` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) DEFAULT '1',
  `title` text COLLATE utf8mb4_unicode_ci,
  `url` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fullimage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`id`, `enable`, `title`, `url`, `image`, `fullimage`, `desc`, `text`, `created_at`, `updated_at`) VALUES
(1, 1, 'Как полюбить себя', 'kak-polyubit-sebya-1', 'pic15634413804f31337513709b113aa9563840b8eae7.jpg', 'pic15634413816d1b2a10b80d5cbb1341ecd9a469470e.jpg', 'Мы предоставляем консультацию по \r\nвыбору покрытий и инструментов, \r\nспособов нанесения и обработки \r\nповерхностей, исходя из Ваших \r\nпотребностей.', '<p>С другой стороны укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также консультация с широким активом требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Товарищи! постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития.</p>\r\n\r\n<p>Повседневная практика показывает, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа форм развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют от нас анализа направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки систем массового участия. С другой стороны реализация намеченных плановых заданий требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет оценить значение систем массового участия.</p>', '2019-07-27 07:34:28', '2019-07-27 07:34:52'),
(2, 1, '8 тайн мастурбации', '8-tayn-masturbacii-2', 'pic1563441380a6189c4b5a063183fecf2c3fc45039bf.jpg', 'pic15634413816d1b2a10b80d5cbb1341ecd9a469470e.jpg', 'Мы предоставляем консультацию по \r\nвыбору покрытий и инструментов, \r\nспособов нанесения и обработки \r\nповерхностей, исходя из Ваших \r\nпотребностей.', '<p>С другой стороны укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также консультация с широким активом требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Товарищи! постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития.</p>\r\n\r\n<p>Повседневная практика показывает, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа форм развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют от нас анализа направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки систем массового участия. С другой стороны реализация намеченных плановых заданий требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет оценить значение систем массового участия.</p>', '2019-07-27 07:36:01', '2019-07-27 07:36:01'),
(3, 1, '5 способов рассказать  партнеру о своих  эротических фантазиях', '5-sposobov-rasskazat-partneru-o-svoih-eroticheskih-fantaziyah-3', 'pic1563441379fa4058e45417f17947a6550eb2580122.jpg', 'pic15634413816d1b2a10b80d5cbb1341ecd9a469470e.jpg', 'Мы предоставляем консультацию по \r\nвыбору покрытий и инструментов, \r\nспособов нанесения и обработки \r\nповерхностей, исходя из Ваших \r\nпотребностей.', '<p>С другой стороны укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также консультация с широким активом требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Товарищи! постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития.</p>\r\n\r\n<p>Повседневная практика показывает, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа форм развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют от нас анализа направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки систем массового участия. С другой стороны реализация намеченных плановых заданий требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет оценить значение систем массового участия.</p>', '2019-07-27 07:36:56', '2019-07-27 07:36:56'),
(4, 1, '5 главных мифов о  женской мастурбации', '5-glavnih-mifov-o-zhenskoy-masturbacii-4', 'pic15634413801ca621dd2b55ce1af04c3b3a01abba7e.jpg', 'pic15634413816d1b2a10b80d5cbb1341ecd9a469470e.jpg', 'Мы предоставляем консультацию по \r\nвыбору покрытий и инструментов, \r\nспособов нанесения и обработки \r\nповерхностей, исходя из Ваших \r\nпотребностей.', '<p>С другой стороны укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также консультация с широким активом требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Товарищи! постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития.</p>\r\n\r\n<p>Повседневная практика показывает, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа форм развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют от нас анализа направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки систем массового участия. С другой стороны реализация намеченных плановых заданий требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет оценить значение систем массового участия.</p>', '2019-07-27 07:37:52', '2019-07-27 07:37:52'),
(5, 1, 'Тестовая статья', 'testovaya-statya-5', 'pic15634413801ca621dd2b55ce1af04c3b3a01abba7e.jpg', 'pic15634413816d1b2a10b80d5cbb1341ecd9a469470e.jpg', 'Мы предоставляем консультацию по \r\nвыбору покрытий и инструментов, \r\nспособов нанесения и обработки \r\nповерхностей, исходя из Ваших \r\nпотребностей.', '<p>С другой стороны укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также консультация с широким активом требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Товарищи! постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития.</p>\r\n\r\n<p>Повседневная практика показывает, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа форм развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют от нас анализа направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки систем массового участия. С другой стороны реализация намеченных плановых заданий требуют от нас анализа соответствующий условий активизации. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет оценить значение систем массового участия.</p>', '2018-07-27 07:38:45', '2018-07-27 07:38:45');

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

--
-- Дамп данных таблицы `carts`
--

INSERT INTO `carts` (`id`, `session_id`, `item_id`, `count`, `created_at`, `updated_at`) VALUES
(60, 'r6aknwth5dG9qxnSNgY2JEGrNDMaCTnUUBaNxzNz', 1, 92, '2019-07-27 02:06:33', '2019-07-27 14:18:53'),
(61, 'r6aknwth5dG9qxnSNgY2JEGrNDMaCTnUUBaNxzNz', NULL, 4, '2019-07-27 12:06:10', '2019-07-27 13:11:37');

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
-- Структура таблицы `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `phone` text COLLATE utf8mb4_unicode_ci,
  `adress` text COLLATE utf8mb4_unicode_ci,
  `email` text COLLATE utf8mb4_unicode_ci,
  `lat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `contacts`
--

INSERT INTO `contacts` (`id`, `phone`, `adress`, `email`, `lat`, `lng`, `created_at`, `updated_at`) VALUES
(1, '+7 701 529 99 90', 'Ауэзова 99', 'freelifekz@mail.ru', '43.241046', '76.903386', NULL, '2019-07-27 09:15:13');

-- --------------------------------------------------------

--
-- Структура таблицы `favourites`
--

CREATE TABLE `favourites` (
  `id` int(10) UNSIGNED NOT NULL,
  `session_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `favourites`
--

INSERT INTO `favourites` (`id`, `session_id`, `item_id`, `created_at`, `updated_at`) VALUES
(4, 'r6aknwth5dG9qxnSNgY2JEGrNDMaCTnUUBaNxzNz', 1, '2019-07-27 14:04:45', '2019-07-27 14:04:45');

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
  `popular` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `category_id`, `title`, `desc`, `code`, `vendor_code`, `price`, `discount`, `color`, `material`, `image`, `availability`, `url`, `enable`, `position`, `sex`, `popular`, `created_at`, `updated_at`) VALUES
(2, 21, 'Виброкольцо', 'Большое виброкольцо на член для большого удовольствия', 0, 'B-MC2', 3000, 0, 'Фиолетовый', 'Силикон', '/goods_files/nasadki_kolsa/B-MC2/1.JPG', 'В наличии', 'vibrokolco-2', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(3, 21, 'Насадка с двумя кольцами и вибратором для клитора', 'Насадка с двумя кольцами и вибратором для клитора', 0, 'B-AXYC2', 10000, 0, 'Фиолетовый, черный', 'Силикон', '/goods_files/nasadki_kolsa/B-AXYC2/10756476542_1011717967.jpg', 'В наличии', 'nasadka-s-dvumya-kolcami-i-vibratorom-dlya-klitora-3', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(4, 21, 'Насадка с двумя кольцами и вибратором для клитора', 'Насадка с двумя кольцами и вибратором для клитора беспроводным пультом', 0, 'B-AXYC3', 10000, 0, 'Фиолетовый, черный', 'Силикон', '/goods_files/nasadki_kolsa/B-AXYC3/9549120053_731867149.jpg', 'В наличии', 'nasadka-s-dvumya-kolcami-i-vibratorom-dlya-klitora-4', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(5, 22, 'Набор из 3 колец для члена', 'набор из 3 силиконовых колец для улучшения эрекции, дополнительной стимуляции и задержки эякуляции.', 0, 'ST6-9047', 1500, 0, 'Черный', 'Силикон', '/goods_files/nasadki_kolsa/ST6-9047/ST6-9047.jpg', 'В наличии', 'nabor-iz-3-kolec-dlya-chlena-5', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(6, 23, 'Мягкая и нежная насадка на член', 'Мягкая и нежная насадка на член', 0, 'ST6-9045', 1500, 0, 'прозрачный', 'Силикон', '/goods_files/nasadki_kolsa/ST6-9045/ST6-9045.jpg', 'В наличии', 'myagkaya-i-nezhnaya-nasadka-na-chlen-6', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(7, 23, 'Мягкая и нежная насадка на член', 'Мягкая и нежная насадка на член сдерживающая эякуляцию', 0, 'NC-01', 1500, 0, 'натуральный', 'Силикон', '/goods_files/nasadki_kolsa/NC-01/NC-01.jpg', 'В наличии', 'myagkaya-i-nezhnaya-nasadka-na-chlen-7', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(8, 23, 'Мягкая и нежная насадка на член', 'Мягкая и нежная насадка на член сдерживающая эякуляцию', 0, 'ST6-9064', 1000, 0, 'прозрачный', 'Силикон', '/goods_files/nasadki_kolsa/ST6-9064/ST6-9064.jpg', 'В наличии', 'myagkaya-i-nezhnaya-nasadka-na-chlen-8', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(9, 22, 'Мягкая и нежная насадка на член', 'Мягкая и нежная насадка на член в  виде колец, сдерживающая эякуляцию', 0, 'LB-80709-001', 1500, 0, 'прозрачный', 'Силикон', '/goods_files/nasadki_kolsa/LB-80709-001/1CD83BCAF1B410B0AD855C1EEC35ECD1_1 (1).jpg', 'В наличии', 'myagkaya-i-nezhnaya-nasadka-na-chlen-9', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(10, 23, 'Мягкая и нежная насадка на член', 'Мягкая и нежная насадка на член', 0, 'ST6-9055', 1200, 0, 'натуральный', 'Силикон', '/goods_files/nasadki_kolsa/ST6-9055/FBFE2B924B7F2F89694FBC9AA98EF1B1.jpg', 'В наличии', 'myagkaya-i-nezhnaya-nasadka-na-chlen-10', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(11, 23, 'Мягкая и нежная насадка на член', 'Мягкая и нежная насадка на член', 0, 'ST6-9060', 500, 0, 'прозрачный', 'Силикон', '/goods_files/nasadki_kolsa/ST6-9060/643C9B3594D52F0BB1F57780700F4FF7.jpg', 'В наличии', 'myagkaya-i-nezhnaya-nasadka-na-chlen-11', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(12, 23, 'Мягкая и нежная насадка на член', 'Мягкая и нежная насадка на член', 0, 'ST6-9058', 1200, 0, 'прозрачный', 'Силикон', '/goods_files/nasadki_kolsa/ST6-9058/B51D9ADAD7EC035FBAE08D0EDB001373.jpg', 'В наличии', 'myagkaya-i-nezhnaya-nasadka-na-chlen-12', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(13, 21, 'Виброкольцо', 'Большое виброкольцо на член для большого удовольствия', 0, 'ST6-9051', 2000, 0, 'белый, синий', 'Силикон', '/goods_files/nasadki_kolsa/ST6-9051/ST6-9051.jpg', 'В наличии', 'vibrokolco-13', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(14, 21, 'Кольцо из ВИП линии', 'Большое виброкольцо на член для большого удовольствия из ВИП линии', 0, 'VIP-05', 15000, 0, 'синий, черный', 'Силикон', '/goods_files/nasadki_kolsa/VIP-05/IMG_3672-28-06-19-09-21.PNG', 'В наличии', 'kolco-iz-vip-linii-14', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(15, 21, 'Кольцо из ВИП линии', 'Большое виброкольцо на член для большого удовольствия с 2 вибраторами, из ВИП линии', 0, 'VIP-06', 17000, 0, 'синий, черный', 'Силикон', '/goods_files/nasadki_kolsa/VIP-06/IMG_3675-28-06-19-09-21.PNG', 'В наличии', 'kolco-iz-vip-linii-15', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(16, 21, 'Насадка на член с пультом управления', 'Насадка на член с пультом управления', 0, 'ED-25', 6000, 0, 'черный', 'Силикон', '/goods_files/nasadki_kolsa/ED-25/ED-25(1).jpg', 'В наличии', 'nasadka-na-chlen-s-pultom-upravleniya-16', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(17, 21, 'Насадка на член в виде кролика', 'Насадка на член в виде кролика', 0, 'ED-26', 5000, 0, 'черный', 'Силикон', '/goods_files/nasadki_kolsa/ED-26/ED-26.jpg', 'В наличии', 'nasadka-na-chlen-v-vide-krolika-17', 1, NULL, 'man', 0, '2019-07-28 06:05:55', '2019-07-28 06:05:55');

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
(1, 2, 'goods_files/nasadki_kolsa/B-MC2/1.JPG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(2, 2, 'goods_files/nasadki_kolsa/B-MC2/2.JPG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(3, 2, 'goods_files/nasadki_kolsa/B-MC2/3.JPG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(4, 2, 'goods_files/nasadki_kolsa/B-MC2/4.JPG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(5, 2, 'goods_files/nasadki_kolsa/B-MC2/5.JPG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(6, 2, 'goods_files/nasadki_kolsa/B-MC2/6.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(7, 3, 'goods_files/nasadki_kolsa/B-AXYC2/10756476542_1011717967.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(8, 3, 'goods_files/nasadki_kolsa/B-AXYC2/10756491351_1011717967.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(9, 3, 'goods_files/nasadki_kolsa/B-AXYC2/10786786642_1011717967.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(10, 3, 'goods_files/nasadki_kolsa/B-AXYC2/10786792579_1011717967.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(11, 3, 'goods_files/nasadki_kolsa/B-AXYC2/10786819008_1011717967.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(12, 3, 'goods_files/nasadki_kolsa/B-AXYC2/10813193386_1011717967.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(13, 3, 'goods_files/nasadki_kolsa/B-AXYC2/10813202209_1011717967.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(14, 4, 'goods_files/nasadki_kolsa/B-AXYC3/9549120053_731867149.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(15, 5, 'goods_files/nasadki_kolsa/ST6-9047/ST6-9047.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(16, 6, 'goods_files/nasadki_kolsa/ST6-9045/ST6-9045.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(17, 7, 'goods_files/nasadki_kolsa/NC-01/NC-01.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(18, 8, 'goods_files/nasadki_kolsa/ST6-9064/ST6-9064.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(19, 9, 'goods_files/nasadki_kolsa/LB-80709-001/1CD83BCAF1B410B0AD855C1EEC35ECD1_1 (1).jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(20, 9, 'goods_files/nasadki_kolsa/LB-80709-001/1CD83BCAF1B410B0AD855C1EEC35ECD1_1.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(21, 9, 'goods_files/nasadki_kolsa/LB-80709-001/1CD83BCAF1B410B0AD855C1EEC35ECD1_4.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(22, 9, 'goods_files/nasadki_kolsa/LB-80709-001/1CD83BCAF1B410B0AD855C1EEC35ECD1_5.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(23, 10, 'goods_files/nasadki_kolsa/ST6-9055/FBFE2B924B7F2F89694FBC9AA98EF1B1.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(24, 11, 'goods_files/nasadki_kolsa/ST6-9060/643C9B3594D52F0BB1F57780700F4FF7.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(25, 11, 'goods_files/nasadki_kolsa/ST6-9060/B5986E662988E597D4675A33F9DD2E4C.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(26, 12, 'goods_files/nasadki_kolsa/ST6-9058/B51D9ADAD7EC035FBAE08D0EDB001373.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(27, 12, 'goods_files/nasadki_kolsa/ST6-9058/CE89DC474C4E5184A16BA1E8C85EBDC0.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(28, 13, 'goods_files/nasadki_kolsa/ST6-9051/ST6-9051.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(29, 14, 'goods_files/nasadki_kolsa/VIP-05/IMG_3672-28-06-19-09-21.PNG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(30, 14, 'goods_files/nasadki_kolsa/VIP-05/IMG_3673-28-06-19-09-21.PNG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(31, 14, 'goods_files/nasadki_kolsa/VIP-05/IMG_3674-28-06-19-09-21.PNG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(32, 15, 'goods_files/nasadki_kolsa/VIP-06/IMG_3675-28-06-19-09-21.PNG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(33, 15, 'goods_files/nasadki_kolsa/VIP-06/IMG_3676-28-06-19-09-21.PNG', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(34, 16, 'goods_files/nasadki_kolsa/ED-25/ED-25(1).jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(35, 16, 'goods_files/nasadki_kolsa/ED-25/ED-25.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55'),
(36, 17, 'goods_files/nasadki_kolsa/ED-26/ED-26.jpg', NULL, '2019-07-28 06:05:55', '2019-07-28 06:05:55');

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
(29, '2019_07_24_171359_order_goods', 12),
(30, '2019_07_27_082810_create__page', 13),
(31, '2019_07_27_082847_create__page_itams', 13),
(32, '2019_07_27_101328_stocks', 14),
(33, '2019_07_27_111145_reviews', 15),
(34, '2019_07_27_131900_article', 16),
(35, '2019_07_27_145227_contacts', 17),
(36, '2019_07_27_174600_create_favourite', 18);

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
(1, 'KZ2019-26070234-1', 'r6aknwth5dG9qxnSNgY2JEGrNDMaCTnUUBaNxzNz', '1212', '+7 (121) 212 1212', '1212', '121212', 2141, 'Банковской картой', 'Доставка', 0, 0, 0, NULL, NULL, '2019-07-26 08:34:43', '2019-07-26 08:34:43'),
(2, 'KZ2019-26070604-2', '6aoLShjiuLQMVnUjctQChBarYDW4tyywFTlY3jrg', 'adawda', '+7 (124) 124 1241', '1212', '21212', 880, 'Банковской картой', 'Доставка', 0, 0, 0, NULL, NULL, '2019-07-26 12:04:53', '2019-07-26 12:04:53'),
(3, 'KZ2019-26070604-3', '6aoLShjiuLQMVnUjctQChBarYDW4tyywFTlY3jrg', 'adawda', '+7 (124) 124 1241', '1212', '21212', 880, 'Банковской картой', 'Доставка', 0, 0, 0, NULL, NULL, '2019-07-26 12:04:53', '2019-07-26 12:04:53');

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
(2, 1, NULL, '11dd', '1074.48', '1', '2019-07-26 08:34:43', '2019-07-26 08:34:43'),
(3, 3, NULL, '1212', '880', '1', '2019-07-26 12:04:53', '2019-07-26 12:04:53'),
(4, 2, NULL, '1212', '880', '1', '2019-07-26 12:04:53', '2019-07-26 12:04:53');

-- --------------------------------------------------------

--
-- Структура таблицы `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `pages`
--

INSERT INTO `pages` (`id`, `text`, `created_at`, `updated_at`) VALUES
(1, '<p><strong>Доставка по г. Алматы</strong></p>\r\n\r\n<p>Вы можете выбрать удобный для вас способ доставки &ndash; курьерской доставкой по городу или самовывозом из магазина. При заказе на сумму 15 000 тенге доставка бесплатно, (если заказ меньше 15 000 тенге, доставка в черте города 1000 тенге)</p>\r\n\r\n<p>Доставка за черту города обговаривается индивидуально. Заказы принимаются в течение дня с 09-00 до 20-00. Доставка в этот же день до 20-00. Возможен вариант самовывоза выбранного вами товара.</p>\r\n\r\n<p>Для этого при оформлении заказа необходимо выбрать пункт &quot;Самовывоз&quot; в разделе &quot;Корзина&quot;. Оплата производится на сайте с помощью кредитной карты или курьеру при доставке.<br />\r\nРаботаем без выходных!</p>\r\n\r\n<p><strong>Доставка по г. Алматы</strong></p>\r\n\r\n<p>Доставка осуществляется КазПочтой (EMS, Экспресс доставка).</p>\r\n\r\n<p>При заказе от 15 000 тенге и массой посылки меньше 2 кг доставка бесплатная!</p>\r\n\r\n<p>Доставки в другие города посылок выше 2 кг обговариваются индивидуально.</p>\r\n\r\n<p>Оплата производится на сайте с помощью кредитной карты</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Перед доставкой заказа наш оператор свяжется с вами для уточнения места и времени получения.</strong></p>\r\n\r\n<p><strong>Посылки доставляются в непрозрачных пакетах с соблюдением всех мер конфиденциальности.</strong></p>\r\n\r\n<p><span style=\"color: #E83F8B\">Если доставка не осуществилась по вине клиента: </span></p>\r\n\r\n<ul>\r\n	<li>телефон вне зоны доступа;</li>\r\n	<li>по адресу доставки адресат отсутствует;</li>\r\n	<li>Повторная доставка стоит 1 500 тенге в черте города.</li>\r\n</ul>', NULL, '2019-07-27 03:46:55'),
(2, '<p><em>Согласно постановлению Правительства РК, товары интимного назначения возврату и обмену не подлежат.</em></p>\r\n\r\n<p><strong>Возврат и обмен бракованного товара</strong></p>\r\n\r\n<p>Вернуть или обменять товар можно в том случае, если Вы обнаружили производственный брак по вине производителя. Заявки на возврат или обмен товара принимаются в течение 14 календарных дней со дня получения заказа. При этом обязательно должны быть сохранены товарный вид и целостность упаковки товара.</p>\r\n\r\n<p>Мы обязательно бесплатно заменим некачественное или бракованное изделие, на аналогичное или вернем всю сумму целиком.</p>\r\n\r\n<p><strong>Возврат и обмен товара надлежащего качества, в том числе белья.</strong></p>\r\n\r\n<p>В соответствии со статьей закона РК &laquo;О защите прав потребителей&raquo; - потребитель вправе отказаться от товара в любое время до его передачи. После передачи товара потребителю, согласно Постановлению Правительства РК:</p>\r\n\r\n<p>белье надлежащего качества возврату и обмену на аналогичный товар другого размера, формы, габарита, фасона, расцветки или комплектации не подлежит.</p>\r\n\r\n<p>Секс игрушки, у которых Вам не понравился запах, цвет, материал или изделие Вам не подошло - возврату и обмену не подлежат. Вы можете ознакомиться перед покупкой с товаром на месте. Если вы приобрели товар с доставкой, можете проверить качество изделия в машине курьера или в его присутствии на &quot;вашей территории&quot;.</p>', NULL, '2019-07-27 03:51:23'),
(3, '<p>Основной вид деятельности компании составляет розничная торговля товарами интимной гигиены и изделиями эротической направленности.</p>\r\n\r\n<p><strong>Цель компании &ndash; формирование сексуальной культуры и здоровья общества, гармонизация интимных отношений граждан</strong></p>\r\n\r\n<p>Основные наши покупатели&ndash; люди старше 30-ти лет, чаще всего семейные пары. Товары, продающиеся в наших магазинах, разнообразят супружеские отношения, поскольку это предметы извлечения новых, доселе неизведанных приятных ощущений, они привносят элемент игры, добавляют гармонии.</p>\r\n\r\n<p>Поэтому можно смело утверждать, что наш магазин &ndash; это настоящая отдушина для людей, заботящихся о своем здоровье и долголетии, стремящихся прожить полную и красочную интимную жизнь. Давно известно, что именно люди, сумевшие достичь гармонии в семейных отношениях, являются наиболее удачливыми во всех областях общественной жизни.</p>', NULL, '2019-07-27 03:51:51'),
(4, '<p><strong>Шаг первый. Выбор товара</strong></p>\r\n\r\n<p>Выбрав понравившийся вам товар, нажмите кнопку &laquo;КУПИТЬ&raquo;, и товар автоматически отправится в вашу корзину. Обратите внимание, что товары, не имеющие этой кнопки, купить в интернет-магазине нельзя, они есть только в магазине. Далее Вы можете продолжить выбор товаров в интернет-магазине, добавляя в корзину столько товаров, сколько Вам необходимо. Если Вы закончили выбор товаров, приступайте к оформлению заказа в меню &laquo;КОРЗИНА&raquo;.<br />\r\n&nbsp;</p>\r\n\r\n<p><strong>Шаг второй. Оплата товара</strong></p>\r\n\r\n<p>Заполните всплывающее меню и нажмите кнопку &laquo;ЗАКАЗАТЬ&raquo;. Покупки в интернет-магазине &laquo;Freelife.kz&raquo; вы можете оплатить при помощи наличного или безналичного расчета, в том числе пластиковыми картами: онлайн (прямо на сайте) или при получении товара.</p>\r\n\r\n<p><strong>Шаг третий. Доставка и получение товара</strong></p>\r\n\r\n<p>Доставка по г. Алматы<br />\r\nВы можете выбрать удобный для вас способ доставки &ndash; курьерской доставкой по городу или самовывозом из магазина.<br />\r\nПри заказе на сумму 15 000 тенге доставка бесплатно, (если заказ меньше 15 000 тенге, доставка в черте города 1000 тенге)<br />\r\nДоставка за черту города обговаривается индивидуально. (оплата будет производится путем банковского перевода Kaspi Gold или PayPall)<br />\r\nЗаказы принимаются в течение дня с 09-00 до 18-00. Доставка в этот же день до 20-00.<br />\r\nВозможен вариант самовывоза выбранного вами товара. Для этого при оформлении заказа необходимо выбрать пункт &quot;Самовывоз&quot; в разделе &quot;Корзина&quot;.<br />\r\nРаботаем без выходных!<br />\r\nДоставка по Казахстану<br />\r\nДоставка осуществляется КазПочтой (EMS, Экспресс доставка).<br />\r\nПри заказе от 15 000 тенге и массой посылки меньше 2 кг доставка бесплатная!<br />\r\nДоставки в другие города посылок выше 2 кг обговариваются индивидуально.<br />\r\nОплата за товар производится на сайте с помощью кредитной карты.<br />\r\nОплата за доставку посылки больше 2 кг производится путем карточного перевода Kaspi Gold или PayPall<br />\r\nПеред доставкой заказа наш оператор свяжется с вами для уточнения места и времени получения.<br />\r\nПосылки доставляются в непрозрачных пакетах с соблюдением всех мер конфиденциальности.</p>\r\n\r\n<p><span style=\"color: #E83F8B\">Если доставка не осуществилась по вине клиента: </span></p>\r\n\r\n<ul>\r\n	<li>телефон вне зоны доступа;</li>\r\n	<li>по адресу доставки адресат отсутствует;</li>\r\n	<li>Повторная доставка стоит 1 500 тенге в черте города.</li>\r\n</ul>', NULL, '2019-07-27 03:50:29'),
(5, '<ul>\r\n	<li>sdfsdfs</li>\r\n	<li>dfgdfg</li>\r\n	<li>dfgd</li>\r\n	<li>fgd</li>\r\n	<li>fgdfg</li>\r\n</ul>\r\n\r\n<p>sdfsdfsdfs</p>\r\n\r\n<p>&nbsp;</p>', '2019-07-27 03:27:53', '2019-07-27 03:27:53');

-- --------------------------------------------------------

--
-- Структура таблицы `pages_items`
--

CREATE TABLE `pages_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `page_id` int(11) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) DEFAULT '1',
  `title` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `enable`, `title`, `image`, `video`, `created_at`, `updated_at`) VALUES
(1, 1, 'Fallos-Mofallos1', 'pic1563441380e6f44e538651e8afe94d25a49f1fdc98.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xl6WwV9pYLs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:46:04', '2019-07-27 05:49:03'),
(2, 1, 'Fallos-Mofallos2', 'pic1563441380a0fc033827600ef935704e69fc39dcc2.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/8idfXR4-0X8\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:49:51', '2019-07-27 07:17:45'),
(3, 1, 'Fallos-Mofallos3', 'pic1563441380548778159a10357e1ca2a24f9be83e30.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xl6WwV9pYLs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:50:27', '2019-07-27 06:23:31'),
(4, 1, 'Fallos-Mofallos4', 'pic1563441380e056c9cd494dd76161d0006984448f44.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GFbYyrMXBg4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:50:47', '2019-07-27 06:23:36'),
(5, 1, 'Fallos-Mofallos5', 'pic1563441380e6f44e538651e8afe94d25a49f1fdc98.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xl6WwV9pYLs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:51:05', '2019-07-27 06:23:42'),
(6, 1, 'Fallos-Mofallos6', 'pic1563441380a0fc033827600ef935704e69fc39dcc2.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GFbYyrMXBg4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:51:36', '2019-07-27 06:23:48'),
(7, 1, 'Fallos-Mofallos7', 'pic1563441380548778159a10357e1ca2a24f9be83e30.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xl6WwV9pYLs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:51:52', '2019-07-27 06:23:54'),
(8, 1, 'Fallos-Mofallos8', 'pic1563441380e056c9cd494dd76161d0006984448f44.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GFbYyrMXBg4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:52:11', '2019-07-27 06:24:00'),
(9, 1, 'BDSM', 'pic1563441380e6f44e538651e8afe94d25a49f1fdc98.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/2WUL5qBEPxI\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:54:08', '2019-07-27 05:54:08'),
(10, 1, 'Latex', 'pic1563441380a0fc033827600ef935704e69fc39dcc2.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hNRl0QC98Dc\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:54:33', '2019-07-27 05:54:33'),
(11, 1, 'BDSM-ID', 'pic1563441380e056c9cd494dd76161d0006984448f44.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/jaFVzLueYAI\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 05:59:28', '2019-07-27 06:24:08'),
(12, 1, 'Video1', 'pic1563441380a0fc033827600ef935704e69fc39dcc2.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/jaFVzLueYAI\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 04:57:56', '2019-07-27 06:57:56'),
(13, 1, 'video2', 'pic1563441380548778159a10357e1ca2a24f9be83e30.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xl6WwV9pYLs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 04:58:30', '2019-07-27 06:58:30'),
(14, 1, 'video3', 'pic1563441380e6f44e538651e8afe94d25a49f1fdc98.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xl6WwV9pYLs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 04:58:47', '2019-07-27 06:58:47'),
(15, 1, 'video 4', 'pic1563441380e056c9cd494dd76161d0006984448f44.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xl6WwV9pYLs\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 04:59:05', '2019-07-27 06:59:05'),
(16, 1, 'video5', 'pic1563441380e056c9cd494dd76161d0006984448f44.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/8idfXR4-0X8\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 04:00:12', '2019-07-27 07:00:12'),
(17, 1, 'video6', 'pic1563441380e6f44e538651e8afe94d25a49f1fdc98.jpg', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/8idfXR4-0X8\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>', '2019-07-27 04:00:25', '2019-07-27 07:00:25');

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
('6aoLShjiuLQMVnUjctQChBarYDW4tyywFTlY3jrg', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoickJ2Tm1sRjlqTXl2b3o2SXNpS3czTzB4azZ5dThJbFBVNkxNU0FTWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9mcmVlbGlmZS5sb2NhbC9hZG1pbi9jYXRlZ29yeSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjA6e31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1564294788),
('r6aknwth5dG9qxnSNgY2JEGrNDMaCTnUUBaNxzNz', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoia2VBdEJmOXZXdW1WQ2VXU2t6b3B5WWtXemlPOHdUa1poMG1UV2FkeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9mcmVlbGlmZS5sb2NhbC9hZG1pbi9pdGVtIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1564292417),
('z74CA1fcXGJ6br2b8HurwaiVgjAgMiFMbjRmduLc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2hnRHRJZ0tNVWU3YmJ4bnNsTU1TN0JGaWRRWUk3NlMzOFMzdzIxViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9mcmVlbGlmZS5sb2NhbCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1564127714);

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
-- Структура таблицы `stocks`
--

CREATE TABLE `stocks` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) DEFAULT '1',
  `position` int(11) DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stocks`
--

INSERT INTO `stocks` (`id`, `enable`, `position`, `title`, `url`, `image`, `text`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '11', '11', 'pic15634413805cd3066516cff338710bd2ea0237269f.jpg', NULL, '2019-07-27 04:29:34', '2019-07-27 04:51:52'),
(2, 1, 2, '22', '22', 'pic1563441380204e8b2e111c4a7458bc0fe6897fe5ed.jpg', NULL, '2019-07-27 04:29:48', '2019-07-27 04:53:50'),
(3, 1, 3, '33', '33', 'pic1563441381a1a42b76016343b6da7cb2a3e253c2a5.jpg', NULL, '2019-07-27 04:29:58', '2019-07-27 04:51:36');

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
-- Индексы таблицы `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

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
-- Индексы таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `favourites`
--
ALTER TABLE `favourites`
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
-- Индексы таблицы `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `pages_items`
--
ALTER TABLE `pages_items`
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
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

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
-- Индексы таблицы `stocks`
--
ALTER TABLE `stocks`
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
-- AUTO_INCREMENT для таблицы `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `configs`
--
ALTER TABLE `configs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `favourites`
--
ALTER TABLE `favourites`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `filemanagers`
--
ALTER TABLE `filemanagers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `items_views_goods`
--
ALTER TABLE `items_views_goods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `item_images`
--
ALTER TABLE `item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `order_goods`
--
ALTER TABLE `order_goods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `pages_items`
--
ALTER TABLE `pages_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
-- AUTO_INCREMENT для таблицы `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
