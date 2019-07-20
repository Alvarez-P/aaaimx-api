-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 15, 2019 at 05:19 PM
-- Server version: 10.2.23-MariaDB
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u925603734_snbx`
--

-- --------------------------------------------------------

--
-- Table structure for table `Collaborators`
--

CREATE TABLE `Collaborators` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adscription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) DEFAULT 0,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Collaborators`
--

INSERT INTO `Collaborators` (`uuid`, `name`, `lastname`, `email`, `adscription`, `active`, `extra`, `createdAt`, `updatedAt`) VALUES
('0440735c-941c-4837-ae96-dd145a1c4712', 'Ariel', 'Pino-Meza', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:28:55', '2019-07-14 00:28:55'),
('19f33575-ecd5-4a4f-87c1-6baf04f97349', 'Manuel', 'Rodríguez-Morayta', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Teacher\"],\"lines\":[]}', '2019-07-14 00:29:18', '2019-07-14 00:29:18'),
('1f9fc617-3d64-4d3b-a9d3-210b2b8762d6', 'Sheila Sugey', 'Manzanero-Martín', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"]}', '2019-07-13 17:12:32', '2019-07-13 17:12:32'),
('21a995c4-4232-4109-8ba1-0a509cbf3690', 'Gerardo', 'Cetzal-Balam', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"]}', '2019-07-13 17:10:26', '2019-07-13 17:10:26'),
('2f021722-22db-400f-9f2e-e3d9d1abc44a', 'Daniel', 'Ordaz-Bencomo', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"]}', '2019-07-13 17:06:29', '2019-07-13 17:06:29'),
('3b8f9bad-ab05-473e-bc2e-ff8a0a1f1deb', 'Romeo Alam', 'Gómez-Buenfil', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:26:53', '2019-07-14 00:26:53'),
('4bae1bae-99ff-440d-b079-28085e0554be', 'Guillermo', 'Fernández-Estrella', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:29:48', '2019-07-14 00:29:48'),
('4f856c99-3a89-41d0-b326-757f709f3b1a', 'Dakar Fernando', 'Villafaña-Gamboa', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Teacher\"],\"lines\":[]}', '2019-07-14 00:28:29', '2019-07-14 00:28:29'),
('692c7c26-2a5e-41c5-b489-fbeac246f21f', 'Jorge Javier', 'Hernández-Gómez', '', 'Instituto Politécnico Nacional / Centro de Desarrollo Aeroespacial', 1, '{\"roles\":[\"Researcher\",\"Teacher\"],\"lines\":[]}', '2019-07-14 00:12:32', '2019-07-14 00:12:32'),
('7b6e0aa6-5928-4070-855b-652a8c7e6d79', 'Carlos', 'Bermejo-Sabbagh', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Teacher\"]}', '2019-07-13 17:12:53', '2019-07-13 17:12:53'),
('98849005-640f-4c72-b239-260772ab65ce', 'Raul Armin', 'Novelo-Cruz', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:31:08', '2019-07-14 00:31:08'),
('9e3f7601-4457-4cc5-bd24-cd8587f51922', 'José Misael', 'Guzmán-Tolosa', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:27:17', '2019-07-14 00:27:17'),
('a4a492a7-eaca-4ed5-a3ac-8e2f799316cd', 'Joel Antonio', 'Trejo-Sánchez', '', 'Centro de Investigación en Matemáticas / Unidad Mérida', 1, '{\"roles\":[\"Researcher\"],\"lines\":[]}', '2019-07-14 00:30:48', '2019-07-14 00:30:48'),
('a8b67f47-b514-4400-8c55-b3cce7954efb', 'Eric', 'Suárez-Gallareta', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"]}', '2019-07-13 17:12:08', '2019-07-13 17:12:08'),
('a8dc1483-9e12-4370-a4ce-0a7086977b22', 'Nora Leticia', 'Cuevas-Cuevas', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Teacher\"],\"lines\":[]}', '2019-07-14 00:11:56', '2019-07-14 00:11:56'),
('a9fd5867-60a3-4409-9c5a-28b1dba11cd5', 'Jeni Karina', 'Molina-Puc', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:26:34', '2019-07-14 00:26:34'),
('ae537659-cc44-49b6-8e01-00c258bdd4a4', 'Juan Carlos', 'Valdiviezo-Navarro', '', 'Comisión Nacional de Ciencia y Tecnología / Centro de Investigación en Ciencias de Información Geoespacial Subsede Yucatán', 1, '{\"roles\":[\"Researcher\"]}', '2019-07-13 16:32:38', '2019-07-13 16:32:38'),
('bed3c4ef-c880-438b-b475-2e64b4fab3c6', 'Héctor', 'Rodríguez-Castillo', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:26:09', '2019-07-14 00:26:09'),
('cb1dfe6d-eada-4553-a7dd-215345464e15', 'Mauricio Gabriel', 'Orozco-del-Castillo', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Researcher\",\"Teacher\"]}', '2019-07-13 16:20:09', '2019-07-13 16:20:09'),
('d5243139-71d3-47a8-afee-3dde66f1df30', 'Larissa Jeanette', 'Peniche-Ruiz', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Teacher\"],\"lines\":[]}', '2019-07-13 17:14:49', '2019-07-14 00:13:03'),
('ddc43b5a-15f7-47a4-87fd-552d56964435', 'Raúl', 'Cáceres-Escalante', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Teacher\"],\"lines\":[]}', '2019-07-14 00:28:07', '2019-07-14 00:28:07'),
('e47fb344-5a5c-4dd9-96ed-3f7e69fdda1d', 'Wilberth', 'Canul-Dzul', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:23:53', '2019-07-14 00:23:53'),
('eec02173-742c-42cb-987a-52d6e1aa92af', 'Francisco Javier', 'Hernández-López', '', 'Centro de Investigación en Matemáticas / Unidad Mérida', 1, '{\"roles\":[\"Researcher\"],\"lines\":[]}', '2019-07-14 00:31:36', '2019-07-14 00:31:36'),
('f6fdd92f-d2e3-4875-8de6-85ee80dd0262', 'Mario Renán', 'Moreno-Sabido', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Teacher\"]}', '2019-07-13 17:09:39', '2019-07-13 17:09:39'),
('f9a60d5e-201e-4180-8a6e-87704ed9509c', 'Saul', 'Navarro-Tec', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"]}', '2019-07-13 17:07:23', '2019-07-13 17:07:23'),
('fb2086cd-6c50-4402-bb2b-549c83b1c13f', 'Ricardo', 'Cordero-Chan', '', 'Tecnológico Nacional de México / I.T. Mérida', 1, '{\"roles\":[\"Student\"],\"lines\":[]}', '2019-07-14 00:14:04', '2019-07-14 00:14:04');

-- --------------------------------------------------------

--
-- Table structure for table `Projects`
--

CREATE TABLE `Projects` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institute` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Research`
--

CREATE TABLE `Research` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Research`
--

INSERT INTO `Research` (`uuid`, `title`, `description`, `type`, `year`, `extra`, `createdAt`, `updatedAt`) VALUES
('4a098612-6afb-4a85-9e2e-7ebb9b0a96bb', 'Análisis del crecimiento urbano y su relación con el incremento de temperaturas en la ciudad de Mérida utilizando imágenes satelitales', NULL, 'Publicación', '2018', '{\"pub_type\":\"Revista indizada en otros índices\",\"grade\":\"\",\"pub_in\":\"Research in computing science\",\"event\":\"\",\"authors\":[{\"uuid\":\"f9a60d5e-201e-4180-8a6e-87704ed9509c\",\"name\":\"Saul\",\"lastname\":\"Navarro-Tec\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Student\\\"]}\",\"createdAt\":\"2019-07-13T17:07:23.000Z\",\"updatedAt\":\"2019-07-13T17:07:23.000Z\"},{\"uuid\":\"cb1dfe6d-eada-4553-a7dd-215345464e15\",\"name\":\"Mauricio Gabriel\",\"lastname\":\"Orozco-del-Castillo\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T16:20:09.000Z\",\"updatedAt\":\"2019-07-13T16:20:09.000Z\"},{\"uuid\":\"ae537659-cc44-49b6-8e01-00c258bdd4a4\",\"name\":\"Juan Carlos\",\"lastname\":\"Valdiviezo-Navarro\",\"email\":\"\",\"adscription\":\"Comisión Nacional de Ciencia y Tecnología / Centro de Investigación en Ciencias de Información Geoespacial Subsede Yucatán\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\"]}\",\"createdAt\":\"2019-07-13T16:32:38.000Z\",\"updatedAt\":\"2019-07-13T16:32:38.000Z\"},{\"uuid\":\"2f021722-22db-400f-9f2e-e3d9d1abc44a\",\"name\":\"Daniel\",\"lastname\":\"Ordaz-Bencomo\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Student\\\"]}\",\"createdAt\":\"2019-07-13T17:06:29.000Z\",\"updatedAt\":\"2019-07-13T17:06:29.000Z\"},{\"uuid\":\"f6fdd92f-d2e3-4875-8de6-85ee80dd0262\",\"name\":\"Mario Renán\",\"lastname\":\"Moreno-Sabido\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T17:09:39.000Z\",\"updatedAt\":\"2019-07-13T17:09:39.000Z\"},{\"uuid\":\"7b6e0aa6-5928-4070-855b-652a8c7e6d79\",\"name\":\"Carlos\",\"lastname\":\"Bermejo-Sabbagh\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T17:12:53.000Z\",\"updatedAt\":\"2019-07-13T17:12:53.000Z\"}],\"topics\":[\"Genetic programming and swarm intelligence\",\"Computer vision and image processing\",\"Classification and clustering\"],\"advisors\":[]}', '2019-07-14 08:02:00', '2019-07-14 08:02:00'),
('7c84b648-e74a-4ae6-b072-3a214279ff96', 'Clasificación de galaxias utilizando procesamiento digital de imágenes y redes neuronales artificiales', NULL, 'Publicación', '2018', '{\"pub_type\":\"Revista indizada en otros índices\",\"grade\":\"\",\"pub_in\":\"Research in computing science\",\"event\":\"\",\"authors\":[{\"uuid\":\"fb2086cd-6c50-4402-bb2b-549c83b1c13f\",\"name\":\"Ricardo\",\"lastname\":\"Cordero-Chan\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Student\\\"],\\\"lines\\\":[]}\",\"createdAt\":\"2019-07-14T00:14:04.000Z\",\"updatedAt\":\"2019-07-14T00:14:04.000Z\"},{\"uuid\":\"cb1dfe6d-eada-4553-a7dd-215345464e15\",\"name\":\"Mauricio Gabriel\",\"lastname\":\"Orozco-del-Castillo\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T16:20:09.000Z\",\"updatedAt\":\"2019-07-13T16:20:09.000Z\"},{\"uuid\":\"f6fdd92f-d2e3-4875-8de6-85ee80dd0262\",\"name\":\"Mario Renán\",\"lastname\":\"Moreno-Sabido\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T17:09:39.000Z\",\"updatedAt\":\"2019-07-13T17:09:39.000Z\"},{\"uuid\":\"692c7c26-2a5e-41c5-b489-fbeac246f21f\",\"name\":\"Jorge Javier\",\"lastname\":\"Hernández-Gómez\",\"email\":\"\",\"adscription\":\"Instituto Politécnico Nacional / Centro de Desarrollo Aeroespacial\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"],\\\"lines\\\":[]}\",\"createdAt\":\"2019-07-14T00:12:32.000Z\",\"updatedAt\":\"2019-07-14T00:12:32.000Z\"},{\"uuid\":\"21a995c4-4232-4109-8ba1-0a509cbf3690\",\"name\":\"Gerardo\",\"lastname\":\"Cetzal-Balam\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Student\\\"]}\",\"createdAt\":\"2019-07-13T17:10:26.000Z\",\"updatedAt\":\"2019-07-13T17:10:26.000Z\"},\"Couder-Castañeda, Carlos\"],\"topics\":[\"Neuronal Networks\",\"Computer vision and image processing\",\"Classification and clustering\"],\"advisors\":[]}', '2019-07-14 08:24:47', '2019-07-14 08:24:47'),
('7f8b5470-7b7e-4a63-9936-703feecab753', 'Inland water-bodies extraction in complex reliefs from Sentinel-1 satellite data', NULL, 'Publicación', '2019', '{\"pub_type\":\"Revista indizada en JCR\",\"grade\":\"\",\"pub_in\":\"Journal of Applied Remote Sensing\",\"event\":\"\",\"authors\":[{\"uuid\":\"ae537659-cc44-49b6-8e01-00c258bdd4a4\",\"name\":\"Juan Carlos\",\"lastname\":\"Valdiviezo-Navarro\",\"email\":\"\",\"adscription\":\"Comisión Nacional de Ciencia y Tecnología / Centro de Investigación en Ciencias de Información Geoespacial Subsede Yucatán\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\"]}\",\"createdAt\":\"2019-07-13T16:32:38.000Z\",\"updatedAt\":\"2019-07-13T16:32:38.000Z\"},\"Salazar-Garibay, A.\",\"Tellez-Quinones, A.\",{\"uuid\":\"cb1dfe6d-eada-4553-a7dd-215345464e15\",\"name\":\"Mauricio Gabriel\",\"lastname\":\"Orozco-del-Castillo\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T16:20:09.000Z\",\"updatedAt\":\"2019-07-13T16:20:09.000Z\"},{\"uuid\":\"cb1dfe6d-eada-4553-a7dd-215345464e15\",\"name\":\"Mauricio Gabriel\",\"lastname\":\"Orozco-del-Castillo\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T16:20:09.000Z\",\"updatedAt\":\"2019-07-13T16:20:09.000Z\"}],\"topics\":[\"Computer vision and image processing\"],\"advisors\":[]}', '2019-07-14 07:48:58', '2019-07-14 07:48:58'),
('98179704-c81a-470f-8d9b-fa3d8c2fb679', 'Sistema híbrido basado en redes neuronales artificiales y descomposición modal empírica para la evaluación de la interrelación entre la irradiancia solar total y el calentamiento global', NULL, 'Publicación', '2018', '{\"pub_type\":\"Revista indizada en otros índices\",\"grade\":\"\",\"pub_in\":\"Research in computing science\",\"event\":\"\",\"authors\":[{\"uuid\":\"a8b67f47-b514-4400-8c55-b3cce7954efb\",\"name\":\"Eric\",\"lastname\":\"Suárez-Gallareta\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Student\\\"]}\",\"createdAt\":\"2019-07-13T17:12:08.000Z\",\"updatedAt\":\"2019-07-13T17:12:08.000Z\"},{\"uuid\":\"692c7c26-2a5e-41c5-b489-fbeac246f21f\",\"name\":\"Jorge Javier\",\"lastname\":\"Hernández-Gómez\",\"email\":\"\",\"adscription\":\"Instituto Politécnico Nacional / Centro de Desarrollo Aeroespacial\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"],\\\"lines\\\":[]}\",\"createdAt\":\"2019-07-14T00:12:32.000Z\",\"updatedAt\":\"2019-07-14T00:12:32.000Z\"},{\"uuid\":\"21a995c4-4232-4109-8ba1-0a509cbf3690\",\"name\":\"Gerardo\",\"lastname\":\"Cetzal-Balam\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Student\\\"]}\",\"createdAt\":\"2019-07-13T17:10:26.000Z\",\"updatedAt\":\"2019-07-13T17:10:26.000Z\"},{\"uuid\":\"cb1dfe6d-eada-4553-a7dd-215345464e15\",\"name\":\"Mauricio Gabriel\",\"lastname\":\"Orozco-del-Castillo\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T16:20:09.000Z\",\"updatedAt\":\"2019-07-13T16:20:09.000Z\"},{\"uuid\":\"f6fdd92f-d2e3-4875-8de6-85ee80dd0262\",\"name\":\"Mario Renán\",\"lastname\":\"Moreno-Sabido\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"active\":true,\"extra\":\"{\\\"roles\\\":[\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T17:09:39.000Z\",\"updatedAt\":\"2019-07-13T17:09:39.000Z\"},\"Silva-Aguilera, R.\"],\"topics\":[\"Neuronal Networks\"],\"advisors\":[]}', '2019-07-14 08:07:41', '2019-07-14 08:07:41'),
('9a031d98-d6d3-4862-a92f-53ea0546fe06', 'A fuzzy inference system applied to estimate the error in the recovery of the Green’s function by means of seismic noise correlations', NULL, 'Publicación', '2018', '{\"pub_type\":\"Revista indizada en JCR\",\"grade\":\"\",\"pub_in\":\"Journal of Geophysics and Engineering\",\"event\":\"\",\"authors\":[\"Rodríguez-Sánchez, J.E.\",{\"uuid\":\"cb1dfe6d-eada-4553-a7dd-215345464e15\",\"name\":\"Mauricio Gabriel\",\"lastname\":\"Orozco-del-Castillo\",\"email\":\"\",\"adscription\":\"Tecnológico Nacional de México / I.T. Mérida\",\"role\":null,\"extra\":\"{\\\"roles\\\":[\\\"Researcher\\\",\\\"Teacher\\\"]}\",\"createdAt\":\"2019-07-13T16:20:09.000Z\",\"updatedAt\":\"2019-07-13T16:20:09.000Z\"},\"Rodríguez-Castellanos, Alejandro\",\"Ávila-Carrera, Rafael\",\"Valle-Molina, C.\"],\"topics\":[\"Fuzzy logic\"],\"advisors\":[]}', '2019-07-14 06:45:42', '2019-07-14 06:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20190701065832-create-research.js'),
('20190707014208-create-collaborator.js'),
('20190711200107-create-user.js'),
('20190713201954-create-project.js');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_staff` tinyint(1) DEFAULT 0,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`uuid`, `username`, `is_staff`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
('d1a0d969-b960-4843-b749-9bbd793c0c39', 'admin', 1, 'admin@aaaimx.org', '$2b$10$w6FCUimHjXpa2zH.UDpZYep/s8fCwyaZEUUtWjQGAdC2sDnIUra5C', '2019-07-11 06:02:28', '2019-07-11 22:06:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Collaborators`
--
ALTER TABLE `Collaborators`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `Projects`
--
ALTER TABLE `Projects`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `Research`
--
ALTER TABLE `Research`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
