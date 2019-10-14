-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 28 2019 г., 09:43
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

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
