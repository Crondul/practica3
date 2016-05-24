-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 19-04-2016 a las 18:01:12
-- Versión del servidor: 10.1.9-MariaDB
-- Versión de PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ph2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barco`
--

DROP TABLE IF EXISTS `barco`;
CREATE TABLE `barco` (
  `COLUMNA` tinyint(4) NOT NULL,
  `FILA` tinyint(4) NOT NULL,
  `TAMANYO` tinyint(4) NOT NULL,
  `ANGULO` tinyint(4) NOT NULL COMMENT '0, -90',
  `LOGIN` varchar(20) NOT NULL,
  `HITS` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `barco`
--

INSERT INTO `barco` (`COLUMNA`, `FILA`, `TAMANYO`, `ANGULO`, `LOGIN`, `HITS`) VALUES
(1, 2, 3, -90, 'usu2', 2),
(1, 3, 1, -90, 'usu2', 2),
(1, 4, 3, 0, 'usu1', 0),
(1, 9, 4, -90, 'usu1', 0),
(2, 2, 1, 0, 'usu1', 0),
(3, 7, 1, 0, 'usu1', 0),
(3, 10, 3, 0, 'usu1', 0),
(4, 4, 2, -90, 'usu2', 2),
(5, 3, 3, 0, 'usu2', 2),
(5, 8, 2, 0, 'usu1', 0),
(5, 9, 4, 0, 'usu2', 2),
(6, 1, 2, 0, 'usu2', 2),
(6, 6, 2, 0, 'usu1', 0),
(7, 0, 1, -90, 'usu2', 2),
(7, 4, 1, 0, 'usu1', 0),
(7, 7, 1, 0, 'usu2', 2),
(7, 10, 2, 0, 'usu1', 0),
(8, 0, 2, -90, 'usu2', 2),
(8, 2, 1, 0, 'usu2', 2),
(9, 5, 1, -90, 'usu1', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disparo`
--

DROP TABLE IF EXISTS `disparo`;
CREATE TABLE `disparo` (
  `LOGIN` varchar(20) NOT NULL,
  `COLUMNA` tinyint(4) NOT NULL,
  `FILA` tinyint(4) NOT NULL,
  `REALIZADO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `disparo`
--

INSERT INTO `disparo` (`LOGIN`, `COLUMNA`, `FILA`, `REALIZADO`) VALUES
('usu1', 3, 8, 1),
('usu1', 6, 4, 0),
('usu2', 3, 7, 1),
('usu2', 4, 1, 1),
('usu2', 7, 4, 0),
('usu3', 0, 4, 1),
('usu3', 6, 1, 1),
('usu3', 6, 3, 1),
('usu3', 6, 9, 1),
('usu3', 9, 1, 1),
('usu3', 9, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidas`
--

DROP TABLE IF EXISTS `partidas`;
CREATE TABLE `partidas` (
  `LOGIN` varchar(20) NOT NULL,
  `JUGADAS` int(11) NOT NULL,
  `GANADAS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `partidas`
--

INSERT INTO `partidas` (`LOGIN`, `JUGADAS`, `GANADAS`) VALUES
('usu1', 10, 6),
('usu2', 17, 10),
('usu3', 7, 5),
('usu4', 3, 1),
('usu5', 9, 8);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barco`
--
ALTER TABLE `barco`
  ADD PRIMARY KEY (`COLUMNA`,`FILA`,`LOGIN`);

--
-- Indices de la tabla `disparo`
--
ALTER TABLE `disparo`
  ADD PRIMARY KEY (`LOGIN`,`COLUMNA`,`FILA`,`REALIZADO`);

--
-- Indices de la tabla `partidas`
--
ALTER TABLE `partidas`
  ADD PRIMARY KEY (`LOGIN`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
