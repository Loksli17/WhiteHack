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
  `userId` int NOT NULL,
  `eventTypeId` int NOT NULL,
  `regionId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_user1_idx` (`userId`),
  KEY `fk_event_EventType1_idx` (`eventTypeId`),
  KEY `fk_event_region1_idx` (`regionId`),
  CONSTRAINT `fk_event_EventType1` FOREIGN KEY (`eventTypeId`) REFERENCES `eventtype` (`id`),
  CONSTRAINT `fk_event_region1` FOREIGN KEY (`regionId`) REFERENCES `region` (`id`),
  CONSTRAINT `fk_event_user1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'2022-02-01','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',3,1,1),(2,'2022-03-20','19:17:00','ул. Ленина 44','Лучший субботник Найди лопату сам солдат.',1,2,1),(3,'2022-03-18','19:17:00','ул. Тимоша 322а','В этот день будем сажать деревья. Найди лопату сам солдат.',3,1,1),(4,'2022-03-19','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1,2,1),(5,'2022-03-20','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',2,3,2),(6,'2022-03-22','19:17:00','ул. Тимоша 322а','Деревья не посажены. Найди лопату сам солдат.',1,1,2),(7,'2022-02-10','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1,3,2),(8,'2022-03-22','19:17:00','ул. Ленина 44','Классный субботник с лопатами. Найди лопату сам солдат.',1,2,2),(9,'2022-03-22','19:17:00','ул. Ленина 44','Классный субботник с лопатами. Найди лопату сам солдат.',2,1,3),(10,'2022-01-22','19:17:00','ул. Графского 27','Озера не почищены. Найди лопату сам солдат.',1,2,3),(11,'2022-03-22','19:17:00','ул. Тимоша 322а','Классный субботник с лопатами. Найди лопату сам солдат.',4,3,3),(12,'2022-02-15','19:17:00','ул. Гоголя 7','Классный субботник с лопатами. Найди лопату сам солдат.',1,1,1),(13,'2022-03-19','19:17:00','ул. Ленина 104','Хм. Убираемся, вот и все. Такие дела!! Найди лопату сам солдат.',1,1,1),(14,'2022-03-21','19:17:00','ул. Тимоша 322а','Классный субботник с лопатами. Найди лопату сам солдат.',2,1,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventimage`
--

LOCK TABLES `eventimage` WRITE;
/*!40000 ALTER TABLE `eventimage` DISABLE KEYS */;
INSERT INTO `eventimage` VALUES (1,'image1.jpg',1),(2,'image2.jpg',1),(3,'image3.jpg',1),(4,'image4.jpg',1),(5,'image1.jpg',2),(6,'image2.jpg',2),(7,'image3.jpg',2),(8,'image4.jpg',2),(9,'image1.jpg',3),(10,'image2.jpg',3),(11,'image3.jpg',3),(12,'image4.jpg',3),(13,'image1.jpg',4),(14,'image2.jpg',4),(15,'image3.jpg',4),(16,'image4.jpg',4);
/*!40000 ALTER TABLE `eventimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventtype`
--

DROP TABLE IF EXISTS `eventtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventtype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventtype`
--

LOCK TABLES `eventtype` WRITE;
/*!40000 ALTER TABLE `eventtype` DISABLE KEYS */;
INSERT INTO `eventtype` VALUES (3,'Высадка деревьев'),(1,'Субботник'),(2,'Уборка водоема');
/*!40000 ALTER TABLE `eventtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pollutionDegree` int NOT NULL,
  `longitude` float NOT NULL,
  `lattitude` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Краснофлотский район',0,158.72,53.01),(2,'Центральный район',1,158.68,53.06),(3,'Железнедорожный район',2,158.65,53.05),(4,'Южный микрорайно',0,158.63,53.035);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Холодидов Алексей'),(2,'Чеботаридов Владимир'),(3,'Рукавидов Алексей'),(4,'Тимошидов Павел'),(5,'Поедидов Владимир'),(6,'Шепелевич Валентин');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_event`
--

LOCK TABLES `user_has_event` WRITE;
/*!40000 ALTER TABLE `user_has_event` DISABLE KEYS */;
INSERT INTO `user_has_event` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1);
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

-- Dump completed on 2022-03-22 17:23:41
