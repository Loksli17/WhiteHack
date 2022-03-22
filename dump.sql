-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: whitehack
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `authorId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_user1_idx` (`authorId`),
  CONSTRAINT `fk_event_user1` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(2,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(3,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(4,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(5,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(6,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(7,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(8,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(9,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(10,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(11,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(12,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(13,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1),(14,'2022-03-22','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventimage`
--

DROP TABLE IF EXISTS `eventimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventimage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(255) NOT NULL,
  `eventId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_eventImage_event_idx` (`eventId`),
  CONSTRAINT `fk_eventImage_event` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventimage`
--

LOCK TABLES `eventimage` WRITE;
/*!40000 ALTER TABLE `eventimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Холодидов Алексей');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_event`
--

DROP TABLE IF EXISTS `user_has_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `eventId` int NOT NULL,
  PRIMARY KEY (`id`,`userId`,`eventId`),
  KEY `fk_user_has_event_event1_idx` (`eventId`),
  KEY `fk_user_has_event_user1_idx` (`userId`),
  CONSTRAINT `fk_user_has_event_event1` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_user_has_event_user1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_event`
--

LOCK TABLES `user_has_event` WRITE;
/*!40000 ALTER TABLE `user_has_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-22 12:45:09
