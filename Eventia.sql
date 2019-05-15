-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: eventia
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Ambassador`
--

DROP TABLE IF EXISTS `Ambassador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ambassador` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_name` varchar(30) DEFAULT NULL,
  `a_contact` varchar(25) DEFAULT NULL,
  `a_email` varchar(30) DEFAULT NULL,
  `uni_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`a_id`),
  KEY `uni_id` (`uni_id`),
  CONSTRAINT `Ambassador_ibfk_1` FOREIGN KEY (`uni_id`) REFERENCES `University` (`uni_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ambassador`
--

LOCK TABLES `Ambassador` WRITE;
/*!40000 ALTER TABLE `Ambassador` DISABLE KEYS */;
INSERT INTO `Ambassador` VALUES (1,'Petyr Baelish','090078601','littlefinger@gmail.com',1);
/*!40000 ALTER TABLE `Ambassador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `Ambassador_Info`
--

DROP TABLE IF EXISTS `Ambassador_Info`;
/*!50001 DROP VIEW IF EXISTS `Ambassador_Info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Ambassador_Info` AS SELECT 
 1 AS `a_id`,
 1 AS `a_name`,
 1 AS `a_contact`,
 1 AS `a_email`,
 1 AS `uni_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Modules`
--

DROP TABLE IF EXISTS `Modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Modules` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_name` varchar(35) DEFAULT NULL,
  `m_price` int(11) DEFAULT NULL,
  `m_date` varchar(30) DEFAULT NULL,
  `t_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`m_id`),
  KEY `t_id` (`t_id`),
  CONSTRAINT `Modules_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `Team` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Modules`
--

LOCK TABLES `Modules` WRITE;
/*!40000 ALTER TABLE `Modules` DISABLE KEYS */;
INSERT INTO `Modules` VALUES (1,'Battle of the B.',1000,'2019-05-13',NULL),(2,'Battle of Winterfell',1000,'2019-05-14',NULL),(3,'Battle of the Blackwater',1000,'2019-05-15',NULL),(4,'Battle of Castle Black',1000,'2019-05-13',NULL),(5,'Greyjoy Naval Battle',1000,'2019-05-14',NULL),(6,'The Red Wedding',1000,'2019-05-14',NULL);
/*!40000 ALTER TABLE `Modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `Modules_Info`
--

DROP TABLE IF EXISTS `Modules_Info`;
/*!50001 DROP VIEW IF EXISTS `Modules_Info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Modules_Info` AS SELECT 
 1 AS `m_name`,
 1 AS `Participants`,
 1 AS `Teams`,
 1 AS `University`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Organizer`
--

DROP TABLE IF EXISTS `Organizer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Organizer` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT,
  `o_name` varchar(30) DEFAULT NULL,
  `o_contact` varchar(25) DEFAULT NULL,
  `o_email` varchar(30) DEFAULT NULL,
  `m_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`o_id`),
  KEY `m_id` (`m_id`),
  CONSTRAINT `Organizer_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `Modules` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Organizer_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `Modules` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Organizer`
--

LOCK TABLES `Organizer` WRITE;
/*!40000 ALTER TABLE `Organizer` DISABLE KEYS */;
/*!40000 ALTER TABLE `Organizer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `Organizer_Info`
--

DROP TABLE IF EXISTS `Organizer_Info`;
/*!50001 DROP VIEW IF EXISTS `Organizer_Info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Organizer_Info` AS SELECT 
 1 AS `o_id`,
 1 AS `o_name`,
 1 AS `o_contact`,
 1 AS `o_email`,
 1 AS `m_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `ParticipantInfo`
--

DROP TABLE IF EXISTS `ParticipantInfo`;
/*!50001 DROP VIEW IF EXISTS `ParticipantInfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ParticipantInfo` AS SELECT 
 1 AS `p_id`,
 1 AS `p_name`,
 1 AS `t_name`,
 1 AS `p_num`,
 1 AS `p_email`,
 1 AS `uni_name`,
 1 AS `m_name`,
 1 AS `isLeader`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Participants`
--

DROP TABLE IF EXISTS `Participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Participants` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(40) NOT NULL,
  `p_num` varchar(20) DEFAULT NULL,
  `p_email` varchar(30) NOT NULL,
  `m_id` int(11) DEFAULT NULL,
  `t_id` int(11) DEFAULT NULL,
  `isLeader` tinyint(1) DEFAULT NULL,
  `uni_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`p_id`),
  KEY `m_id` (`m_id`),
  KEY `t_id` (`t_id`),
  KEY `uni_id` (`uni_id`),
  CONSTRAINT `Participants_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `Modules` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Participants_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `Team` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Participants_ibfk_3` FOREIGN KEY (`uni_id`) REFERENCES `University` (`uni_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Participants`
--

LOCK TABLES `Participants` WRITE;
/*!40000 ALTER TABLE `Participants` DISABLE KEYS */;
INSERT INTO `Participants` VALUES (4,'Ramsay Bolten','1100','hotDog@gmail.com',1,2,1,1),(5,'Jon Snow','0000','youKnowNothing@gmail.com',4,3,1,8),(6,'Samwell Tarly','0101','fatGuy@gmail.com',4,3,0,8),(7,'Allister Thorne ','0101','MasterAtArms@gmail.com',4,3,0,8),(8,'Ygritte','1231','iKnow@gmail.com',4,4,1,8),(9,'Tormund Giantsbane','','smallGiant@gmail.com',4,4,0,8),(10,'Olly','','',4,4,0,8),(11,'Stannis Baratheon','1122','stannis@gmail.com',3,5,1,5),(12,'Davos Seaworth','','onionKnight@gmail.com',3,5,0,5),(13,'Hound','','',3,5,0,5),(14,'Joffrey Baratheon','1212','fakeLannister@gmail.com',3,6,1,5),(15,'Tyrion Lannister','','dwarf@gmail.com',3,6,0,5),(16,'Cersei Lannister ','','youWantQueen@gmail.com',3,6,0,5),(20,'Daenerys Targaryen','1100','Dracarys@gmail.com',2,8,1,3),(21,'Jorah Mormont','','f.zoned@gmail.com',2,8,0,3),(22,'Grey Worm','','unsullied@gmail.com',2,8,0,3),(23,'Theon Greyjoy','1231','hotDog@gmail.com',2,9,1,3),(24,'Lyanna Mormont','1122','lyanna@gmail.com',2,10,1,3),(25,'Wolder Frey','0101','wolder@gmail.com',6,11,1,2),(26,'Robb Stark','123','robb@gmail.com',6,12,1,1),(27,'Catelyn Stark','','cat@gmail.com',6,12,0,1),(28,'The Knight King','1011','king@gmail.com',2,13,1,1),(29,'Dothraki','','huhu@gmail.com',2,13,0,1),(30,'Jon Snow','1010','youknowNothing@gmail.com',1,12,1,1),(31,'Sansa Stark','','slowLearner@gmail.com',1,12,0,1);
/*!40000 ALTER TABLE `Participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Team` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_name` varchar(30) DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT NULL,
  `uni_id` int(11) DEFAULT NULL,
  `m_id` int(11) DEFAULT NULL,
  `p_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `uni_id` (`uni_id`),
  KEY `m_id` (`m_id`),
  KEY `p_id` (`p_id`),
  CONSTRAINT `Team_ibfk_1` FOREIGN KEY (`uni_id`) REFERENCES `University` (`uni_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Team_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `Modules` (`m_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Team_ibfk_3` FOREIGN KEY (`p_id`) REFERENCES `Participants` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Team`
--

LOCK TABLES `Team` WRITE;
/*!40000 ALTER TABLE `Team` DISABLE KEYS */;
INSERT INTO `Team` VALUES (2,'Team Bolten',NULL,1,1,NULL),(3,'Team Night Watch',0,7,4,NULL),(4,'Team Wildlings',1,8,4,NULL),(5,'Team Baratheon',0,6,3,NULL),(6,'Team Lennister',1,5,3,NULL),(7,'Team Starks',NULL,3,2,NULL),(8,'Team Targaryen',1,2,2,NULL),(9,'Team Greyjoy',1,4,2,NULL),(10,'Team Mormont',NULL,3,2,NULL),(11,'Team Frey',0,7,6,NULL),(12,'Team Stark',1,1,1,NULL),(13,'Team White Walkers',0,8,2,NULL),(14,'Team Stark',NULL,1,1,NULL);
/*!40000 ALTER TABLE `Team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `TeamInfo`
--

DROP TABLE IF EXISTS `TeamInfo`;
/*!50001 DROP VIEW IF EXISTS `TeamInfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `TeamInfo` AS SELECT 
 1 AS `t_id`,
 1 AS `t_name`,
 1 AS `p_name`,
 1 AS `m_name`,
 1 AS `uni_name`,
 1 AS `p_num`,
 1 AS `isPaid`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `Team_Count_Module`
--

DROP TABLE IF EXISTS `Team_Count_Module`;
/*!50001 DROP VIEW IF EXISTS `Team_Count_Module`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Team_Count_Module` AS SELECT 
 1 AS `Module`,
 1 AS `No of Teams`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `Team_Count_Module_Uni`
--

DROP TABLE IF EXISTS `Team_Count_Module_Uni`;
/*!50001 DROP VIEW IF EXISTS `Team_Count_Module_Uni`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Team_Count_Module_Uni` AS SELECT 
 1 AS `Module`,
 1 AS `University`,
 1 AS `Teams`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `Team_Count_Uni_All`
--

DROP TABLE IF EXISTS `Team_Count_Uni_All`;
/*!50001 DROP VIEW IF EXISTS `Team_Count_Uni_All`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Team_Count_Uni_All` AS SELECT 
 1 AS `ID`,
 1 AS `University`,
 1 AS `Teams`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `University`
--

DROP TABLE IF EXISTS `University`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `University` (
  `uni_id` int(11) NOT NULL AUTO_INCREMENT,
  `uni_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`uni_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `University`
--

LOCK TABLES `University` WRITE;
/*!40000 ALTER TABLE `University` DISABLE KEYS */;
INSERT INTO `University` VALUES (1,'The Winterfell'),(2,'The Riverlands'),(3,'The Westerlands'),(4,'The Iron Islands'),(5,'The Kings Landing'),(6,'The Stromlands'),(7,'Dorne'),(8,'The Wall');
/*!40000 ALTER TABLE `University` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `Ambassador_Info`
--

/*!50001 DROP VIEW IF EXISTS `Ambassador_Info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Ambassador_Info` AS select `Ambassador`.`a_id` AS `a_id`,`Ambassador`.`a_name` AS `a_name`,`Ambassador`.`a_contact` AS `a_contact`,`Ambassador`.`a_email` AS `a_email`,`University`.`uni_name` AS `uni_name` from (`Ambassador` join `University` on((`University`.`uni_id` = `Ambassador`.`uni_id`))) group by `Ambassador`.`a_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Modules_Info`
--

/*!50001 DROP VIEW IF EXISTS `Modules_Info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Modules_Info` AS select `Modules`.`m_name` AS `m_name`,count(distinct `Participants`.`p_id`) AS `Participants`,count(distinct `Team`.`t_id`) AS `Teams`,count(distinct `University`.`uni_id`) AS `University` from (((`Modules` left join `Participants` on((`Modules`.`m_id` = `Participants`.`m_id`))) left join `Team` on((`Team`.`t_id` = `Participants`.`t_id`))) left join `University` on((`University`.`uni_id` = `Participants`.`uni_id`))) group by `Modules`.`m_name` order by `Modules`.`m_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Organizer_Info`
--

/*!50001 DROP VIEW IF EXISTS `Organizer_Info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Organizer_Info` AS select `Organizer`.`o_id` AS `o_id`,`Organizer`.`o_name` AS `o_name`,`Organizer`.`o_contact` AS `o_contact`,`Organizer`.`o_email` AS `o_email`,`Modules`.`m_name` AS `m_name` from (`Organizer` join `Modules` on((`Modules`.`m_id` = `Organizer`.`m_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ParticipantInfo`
--

/*!50001 DROP VIEW IF EXISTS `ParticipantInfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ParticipantInfo` AS select `Participants`.`p_id` AS `p_id`,`Participants`.`p_name` AS `p_name`,`Team`.`t_name` AS `t_name`,`Participants`.`p_num` AS `p_num`,`Participants`.`p_email` AS `p_email`,`University`.`uni_name` AS `uni_name`,`Modules`.`m_name` AS `m_name`,`Participants`.`isLeader` AS `isLeader` from (((`Participants` join `University` on((`University`.`uni_id` = `Participants`.`uni_id`))) join `Modules` on((`Modules`.`m_id` = `Participants`.`m_id`))) join `Team` on((`Team`.`t_id` = `Participants`.`t_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `TeamInfo`
--

/*!50001 DROP VIEW IF EXISTS `TeamInfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `TeamInfo` AS select `Team`.`t_id` AS `t_id`,`Team`.`t_name` AS `t_name`,`Participants`.`p_name` AS `p_name`,`Modules`.`m_name` AS `m_name`,`University`.`uni_name` AS `uni_name`,`Participants`.`p_num` AS `p_num`,`Team`.`isPaid` AS `isPaid` from (((`Team` join `University` on((`University`.`uni_id` = `Team`.`uni_id`))) join `Modules` on((`Modules`.`m_id` = `Team`.`m_id`))) join `Participants` on((`Team`.`t_id` = `Participants`.`t_id`))) where (`Participants`.`isLeader` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Team_Count_Module`
--

/*!50001 DROP VIEW IF EXISTS `Team_Count_Module`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Team_Count_Module` AS select `Modules`.`m_name` AS `Module`,count(`Team`.`t_id`) AS `No of Teams` from (`Team` join `Modules` on((`Modules`.`m_id` = `Team`.`m_id`))) group by `Modules`.`m_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Team_Count_Module_Uni`
--

/*!50001 DROP VIEW IF EXISTS `Team_Count_Module_Uni`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Team_Count_Module_Uni` AS select `Modules`.`m_name` AS `Module`,`University`.`uni_name` AS `University`,count(`Team`.`t_id`) AS `Teams` from ((`Team` join `University` on((`University`.`uni_id` = `Team`.`uni_id`))) join `Modules` on((`Modules`.`m_id` = `Team`.`m_id`))) group by `Modules`.`m_name`,`University`.`uni_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Team_Count_Uni_All`
--

/*!50001 DROP VIEW IF EXISTS `Team_Count_Uni_All`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Team_Count_Uni_All` AS select `University`.`uni_id` AS `ID`,`University`.`uni_name` AS `University`,count(`Team`.`t_id`) AS `Teams` from (`University` left join `Team` on((`University`.`uni_id` = `Team`.`uni_id`))) group by `University`.`uni_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-16  2:40:25
