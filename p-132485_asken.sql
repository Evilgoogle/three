-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Окт 29 2019 г., 08:47
-- Версия сервера: 10.2.26-MariaDB-cll-lve
-- Версия PHP: 7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `p-132485_asken`
--

-- --------------------------------------------------------

--
-- Структура таблицы `abouts`
--

CREATE TABLE `abouts` (
  `id` int(10) UNSIGNED NOT NULL,
  `text_1` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text_2` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `textgray` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `abouts`
--

INSERT INTO `abouts` (`id`, `text_1`, `text_2`, `textgray`, `created_at`, `updated_at`) VALUES
(1, '<p>ТОО &laquo;ASKEN Казахстанско-Китайcкий Торговый Дом&raquo; специализируется на обеспечении постоянной поставки продукции для разных видов отраслей и осуществляет прямые поставки от заводов- производителей.</p>', '<p>Наша компания является многопрофильным поставщиком, которая может предоставить следующие категории продукции: трубы и фитинги, запорная арматура, оборудование для промышленного производства, металлический прокат, кабельно-проводниковая продукция, металлические решетчатые покрытия. Широкий ассортимент предлагаемой нами продукции обеспечивает все потребности заказчика по различным видам, параметрам, показателям и качеству продукции.</p>', '<p>Наши партнеры заводы - производители, имея передовой мировой опыт, применяют новые и инновационные технологии для производства той или иной продукции, что увеличивает срок службы и предает высокое качество.</p>', NULL, '2019-10-29 07:53:08');

-- --------------------------------------------------------

--
-- Структура таблицы `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `phone_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `contacts`
--

INSERT INTO `contacts` (`id`, `phone_1`, `phone_2`, `adress`, `email`, `lat`, `lng`, `created_at`, `updated_at`) VALUES
(1, '+7 727 355 00 61', '+7 708 193 9328', NULL, 'sales@askentd.kz', '43.222876', '76.964105', NULL, '2019-10-29 08:23:01');

-- --------------------------------------------------------

--
-- Структура таблицы `docs`
--

CREATE TABLE `docs` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 1,
  `product_id` int(11) DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `docs`
--

INSERT INTO `docs` (`id`, `enable`, `product_id`, `title`, `file`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Кабели силовые для стационарной прокладки на напряжение до 1 кВ включительно', '37fae088e03f7e4077730e1b5cbc4bdb.txt', '2019-10-23 07:25:13', '2019-10-23 09:36:22'),
(2, 1, 1, 'Кабели силовые для стационарной прокладки на напряжение свыше 1 кВ', '81566f6712ab6fec08bb3bd46731e025.jpg', '2019-10-23 09:36:08', '2019-10-24 05:53:03'),
(3, 1, 1, 'Кабель контрольный', NULL, '2019-10-23 09:36:36', '2019-10-23 09:50:16'),
(4, 1, 1, 'Провода и кабеля монтажные', NULL, '2019-10-23 09:36:52', '2019-10-23 09:36:52'),
(5, 1, 1, 'Кабели для нестационарной прокладки', NULL, '2019-10-23 09:37:02', '2019-10-23 09:37:02'),
(6, 1, 1, 'Провода силовые общего назначения', NULL, '2019-10-23 09:37:14', '2019-10-23 09:37:14'),
(7, 1, 1, 'Провода силовые для электрических установок', NULL, '2019-10-23 09:37:30', '2019-10-23 09:37:30'),
(8, 1, 1, 'Кабели судовые', NULL, '2019-10-23 09:37:40', '2019-10-23 09:37:40'),
(9, 1, 1, 'Провода и кабели для подвижного состава', NULL, '2019-10-23 09:37:52', '2019-10-23 09:37:52'),
(10, 1, 1, 'Провода неизолированные гибкие', NULL, '2019-10-23 09:38:17', '2019-10-23 09:38:17'),
(11, 1, 1, 'Провода изолированные для воздушных линий передач', NULL, '2019-10-23 09:38:40', '2019-10-23 09:38:40'),
(12, 1, 1, 'Провода неизолированные для воздушных линий передач', NULL, '2019-10-23 09:38:51', '2019-10-23 09:38:51'),
(13, 1, 1, 'Провода и шнуры различного назначения', NULL, '2019-10-23 09:39:05', '2019-10-23 09:39:05'),
(14, 1, 2, '11', NULL, '2019-10-23 09:39:57', '2019-10-23 09:39:57'),
(15, 1, 2, '22', NULL, '2019-10-23 09:40:10', '2019-10-23 09:40:10');

-- --------------------------------------------------------

--
-- Структура таблицы `filemanagers`
--

CREATE TABLE `filemanagers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `big` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alt` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `filemanagers`
--

INSERT INTO `filemanagers` (`id`, `name`, `image`, `big`, `alt`, `created_at`, `updated_at`, `size`, `type`) VALUES
(1, 'main_slider_ico1', 'pic157180831725df334312dc59133294d5693c15ec8c.svg', NULL, NULL, '2019-10-23 05:25:17', '2019-10-23 05:25:17', '1704', 'image/svg+xml'),
(2, 'main_slider_ico2', 'pic15718083187f569ec3af03b737f6dd5da977cc55fe.svg', NULL, NULL, '2019-10-23 05:25:18', '2019-10-23 05:25:18', '2586', 'image/svg+xml'),
(3, 'main_slider_fon3', 'pic1571808317ad4975dee4fff9a7c0f4290f8dea289a.png', NULL, NULL, '2019-10-23 05:25:18', '2019-10-23 05:25:18', '124267', 'image/png'),
(4, 'main_slider_fon4', 'pic1571808317ae8730747b83057648beff67dc60c9b6.png', NULL, NULL, '2019-10-23 05:25:19', '2019-10-29 07:05:07', '82241', 'image/png'),
(5, 'main_slider_fon2', 'pic157180831843c56b0798ccec16fca0fb3664392d63.png', NULL, NULL, '2019-10-23 05:25:19', '2019-10-23 05:25:19', '167910', 'image/png'),
(7, 'main_slider_fon1', 'pic157180831714435461c4f1d8cce56659590dc8f2de.png', NULL, NULL, '2019-10-23 05:25:19', '2019-10-23 05:25:19', '190535', 'image/png'),
(8, 'main_slider_ico3', 'pic15718083193d604ed05cf5989fe759f7af30457e90.svg', NULL, NULL, '2019-10-23 05:25:19', '2019-10-23 05:25:19', '877', 'image/svg+xml'),
(9, 'main_slider_ico5', 'pic1571808319c55bdcbd8c06eaf4b368125a930ff03d.svg', NULL, NULL, '2019-10-23 05:25:19', '2019-10-23 05:25:19', '1667', 'image/svg+xml'),
(10, 'main_slider_ico4', 'pic15718083192b6f4c21bfc4aa57c0c7fbe1cb555e34.svg', NULL, NULL, '2019-10-23 05:25:20', '2019-10-23 05:25:20', '2378', 'image/svg+xml'),
(13, 'main_slider_image5', 'pic1571808320d800f56a552a6241e883173473ca9d8a.png', NULL, NULL, '2019-10-23 05:25:22', '2019-10-23 05:25:22', '288706', 'image/png'),
(14, 'main_slider_image3', 'pic15718083204596c7a4b345c2bd7597cc878de2d8fb.png', NULL, NULL, '2019-10-23 05:25:22', '2019-10-23 05:25:22', '340995', 'image/png'),
(15, 'main_slider_image1', 'pic1571808320cd699c6b9a56aee2d203eaf337111a23.png', NULL, NULL, '2019-10-23 05:25:22', '2019-10-23 05:25:22', '334882', 'image/png'),
(18, 'main_slider_image2', 'pic1571808323719c429a17c7d4de50e031adc3b6b3da.png', NULL, NULL, '2019-10-23 05:25:23', '2019-10-23 05:25:23', '399349', 'image/png'),
(19, 'main_slider_image4', 'pic1571808350942f82cc64bdc95385bdd43ff031f74a.png', NULL, NULL, '2019-10-23 05:25:51', '2019-10-23 05:25:51', '229089', 'image/png'),
(20, 'main_slider_image21', 'pic1571996370533d4d0739572d9fc7c0b799ede2f0d7.png', NULL, NULL, '2019-10-25 09:39:30', '2019-10-25 09:42:53', '533878', 'image/png'),
(21, 'main_slider_ico1_extra', 'pic1572331833d6957cf1f38b23f437e55645c5b5155f.svg', NULL, NULL, '2019-10-29 06:50:33', '2019-10-29 06:50:33', '2586', 'image/svg+xml'),
(22, 'ind_4', 'pic1572333362fe003bfe1f4c065790582ce31ddd3f7e.jpg', NULL, NULL, '2019-10-29 07:16:02', '2019-10-29 07:16:02', '131224', 'image/jpeg'),
(23, 'ind_2', 'pic1572333362cc6cf62ec41ec89b5745e9c942ea9f12.jpg', NULL, NULL, '2019-10-29 07:16:02', '2019-10-29 07:16:02', '88078', 'image/jpeg'),
(24, 'ind_1', 'pic15723333634f22b96e8faa6f14cc6ab69cd5744f7b.jpg', NULL, NULL, '2019-10-29 07:16:03', '2019-10-29 07:16:03', '181045', 'image/jpeg'),
(25, 'ind_5', 'pic1572333364a38f3edc1bc0b06e375d9bec3d6e62b3.jpg', NULL, NULL, '2019-10-29 07:16:04', '2019-10-29 07:16:04', '247077', 'image/jpeg'),
(26, 'ind_3', 'pic1572333364d6ce27d999400efd7737ed5ee426817c.jpg', NULL, NULL, '2019-10-29 07:16:04', '2019-10-29 07:16:04', '243687', 'image/jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `industries`
--

CREATE TABLE `industries` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 1,
  `position` int(11) DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `industries`
--

INSERT INTO `industries` (`id`, `enable`, `position`, `title`, `image`, `desc`, `created_at`, `updated_at`) VALUES
(1, 1, 5, 'Энергетика и телекоммуникации', 'pic1572333362fe003bfe1f4c065790582ce31ddd3f7e.jpg', 'ТОО «ASKEN Казахстанско-Китайcкий Торговый Дом» является многопрофильным поставщиком продукции, направленной на улучшение и развитие различных видов отраслей экономики на постоянной основе.', '2019-10-23 06:15:29', '2019-10-29 07:45:44'),
(2, 1, 1, 'Инфраструктура и  внешние инженерные  коммуникации', 'pic15723333634f22b96e8faa6f14cc6ab69cd5744f7b.jpg', 'ТОО «ASKEN Казахстанско-Китайcкий Торговый Дом» является многопрофильным поставщиком продукции, направленной на улучшение и развитие различных видов отраслей экономики на постоянной основе.', '2019-10-23 06:17:15', '2019-10-29 07:45:50'),
(3, 1, 3, 'Производственный сектор', 'pic1572333364a38f3edc1bc0b06e375d9bec3d6e62b3.jpg', 'ТОО «ASKEN Казахстанско-Китайcкий Торговый Дом» является многопрофильным поставщиком продукции, направленной на улучшение и развитие различных видов отраслей экономики на постоянной основе.', '2019-10-23 06:17:38', '2019-10-29 07:45:54'),
(4, 1, 2, 'Строительство и реконструкция', 'pic1572333364d6ce27d999400efd7737ed5ee426817c.jpg', 'ТОО «ASKEN Казахстанско-Китайcкий Торговый Дом» является многопрофильным поставщиком продукции, направленной на улучшение и развитие различных видов отраслей экономики на постоянной основе.', '2019-10-23 06:18:01', '2019-10-29 07:45:52'),
(5, 1, 4, 'Промышленный сектор', 'pic1572333362cc6cf62ec41ec89b5745e9c942ea9f12.jpg', 'ТОО «ASKEN Казахстанско-Китайcкий Торговый Дом» является многопрофильным поставщиком продукции, направленной на улучшение и развитие различных видов отраслей экономики на постоянной основе.', '2019-10-23 06:18:21', '2019-10-29 07:45:54');

-- --------------------------------------------------------

--
-- Структура таблицы `languages`
--

CREATE TABLE `languages` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 1,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default` int(11) DEFAULT NULL,
  `data` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `key` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
(11, '2019_10_23_101029_table_products', 2),
(12, '2019_10_23_120110_table_industries', 3),
(13, '2019_10_23_122607_table_docs', 4),
(14, '2019_10_23_161048_table_contacts', 5),
(15, '2019_10_23_172349_table_about', 6),
(16, '2019_10_23_174505_table_requests', 7);

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
(1, 'user-read', 'Просмотр пользователей', 'Просмотр списка пользователей', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(2, 'user-create', 'Создать пользователя', 'Создать нового пользователя', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(3, 'user-edit', 'Изменить пользователя', 'Изменить пользователя', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(4, 'user-delete', 'Удалить пользователя', 'Удалить пользователя', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(5, 'role-read', 'Просмотр ролей', 'Просмотр списка ролей', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(6, 'role-create', 'Создать роль', 'Создать новую роль', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(7, 'role-edit', 'Изменить роль', 'Изменить роль', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(8, 'role-delete', 'Удалить роль', 'Удалить роль', '2019-10-22 09:18:29', '2019-10-22 09:18:29');

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
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `position` int(11) DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `position`, `title`, `url`, `icon`, `image`, `fon`, `desc`, `created_at`, `updated_at`) VALUES
(1, 1, 'Кабельно-проводниковая продукция', 'kabelno-provodnikovaya-produkciya-1', 'pic157180831725df334312dc59133294d5693c15ec8c.svg', 'pic1571808320cd699c6b9a56aee2d203eaf337111a23.png', 'pic157180831714435461c4f1d8cce56659590dc8f2de.png', 'Поставляемая нашей компанией кабельно-проводниковая продукция, обеспечит высокий уровень надёжности Ваших линий электропередач и управления, благодаря применению современных технологий на производстве. Качество металлов, применяемых при изготовлении проводников обеспечит высокую проводимость и снизит величину потерь при передаче электроэнергии', '2019-10-23 05:27:33', '2019-10-23 10:02:54'),
(2, 3, 'Трубы, фитинги и запорная арматура', 'trubi-fitingi-i-zapornaya-armatura-2', 'pic1572331833d6957cf1f38b23f437e55645c5b5155f.svg', 'pic15718083204596c7a4b345c2bd7597cc878de2d8fb.png', 'pic157180831843c56b0798ccec16fca0fb3664392d63.png', 'Накопленный опыт в сфере производства труб, фитингов, запорной арматуры и инструмента для сборки - реализован в технологиях высокого стандарта, что придает монтажу трубопровода простоту и надёжность. Уникальное оборудование производства позволяет изготавливать изделия любой сложности.', '2019-10-23 05:31:27', '2019-10-29 06:56:28'),
(3, 4, 'Оборудование для промышленного производства', 'oborudovanie-dlya-promishlennogo-proizvodstva-3', 'pic15718083192b6f4c21bfc4aa57c0c7fbe1cb555e34.svg', 'pic1571808350942f82cc64bdc95385bdd43ff031f74a.png', 'pic1571808317ae8730747b83057648beff67dc60c9b6.png', 'Предлагаемое нашей компанией оборудование для промышленного производства выполнено с учётом произведённых научных и экономических исследований, обеспечивающих простоту в установке и обслуживании, а также в выдаче максимального результата от обрабатываемого сырья. Виды оборудования ориентированы на современные технологии.', '2019-10-23 05:34:37', '2019-10-29 06:55:29'),
(4, 2, 'Металлические решётчатые настилы и ограждения', 'metallicheskie-reshyotchatie-nastili-i-ograzhdeniya-4', 'pic15718083193d604ed05cf5989fe759f7af30457e90.svg', 'pic1571996370533d4d0739572d9fc7c0b799ede2f0d7.png?id=72b32a1f754ba1c09b3695e0cb6cde7f', 'pic157180831843c56b0798ccec16fca0fb3664392d63.png', 'Металлические решётчатые настилы изготовлены по технологиям, обеспечивающим лёгкость и прочность конструкций, компактность, простоту в сборке и удобны в транспортировке.', '2019-10-23 05:37:40', '2019-10-29 06:55:54'),
(5, 5, 'Металлический прокат', 'metallicheskiy-prokat-5', 'pic1571808319c55bdcbd8c06eaf4b368125a930ff03d.svg', 'pic1571808320d800f56a552a6241e883173473ca9d8a.png', 'pic157180831714435461c4f1d8cce56659590dc8f2de.png', 'Продукция металлического проката используется многими мировыми строительными компаниями. Применяемые технологии изготовления изделий из коррозионностойких, углеродистых, оцинкованных и легированных сталей обеспечивают высокое качество металлического проката.', '2019-10-23 05:38:33', '2019-10-23 10:03:00');

-- --------------------------------------------------------

--
-- Структура таблицы `requests`
--

CREATE TABLE `requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 0,
  `name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `requests`
--

INSERT INTO `requests` (`id`, `enable`, `name`, `phone`, `email`, `message`, `created_at`, `updated_at`) VALUES
(1, 0, 'Amir', '+7 (701) 311 0001', 'amir1310zh@gmail.com', 'Добрый день! Хочу заказать для теста', '2019-10-28 09:29:19', '2019-10-28 09:29:19');

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
(1, 'superadmin', 'Суперадмин', 'Полный доступ к функционалу', '2019-10-22 09:18:29', '2019-10-22 09:18:29'),
(2, 'login', 'Логин', 'Добавленный пользователь, имеет доступ только к личному кабинету. Роль присваивается автоматически.', '2019-10-22 09:18:29', '2019-10-22 09:18:29');

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
  `url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `seos`
--

INSERT INTO `seos` (`id`, `url`, `page`, `title`, `description`, `keywords`, `created_at`, `updated_at`) VALUES
(1, 'main', 'Главная', NULL, NULL, NULL, '2019-10-22 09:18:30', '2019-10-22 09:18:30');

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
(1, 'Admin', 'admin@asken.kz', '$2y$10$5IyWyYkh6tHeoTkQnzM7OeFIGHqRU6huilmOA/DYxHFdtjDTzVifq', 'KPsntUfX0PnfXszJCr0QaHFqElXc5iTTifTybfvr2yUMQW3mhavGpfQtc2qc', '2019-10-22 09:18:29', '2019-10-22 09:18:29');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `docs`
--
ALTER TABLE `docs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `filemanagers`
--
ALTER TABLE `filemanagers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `industries`
--
ALTER TABLE `industries`
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
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `requests`
--
ALTER TABLE `requests`
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
-- AUTO_INCREMENT для таблицы `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `docs`
--
ALTER TABLE `docs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `filemanagers`
--
ALTER TABLE `filemanagers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `industries`
--
ALTER TABLE `industries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
