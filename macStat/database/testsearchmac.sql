DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `testsearchmac`(IN `mac` VARCHAR(180))
    NO SQL
BEGIN
	SELECT * FROM macs WHERE macs.mac = mac;


END$$
DELIMITER ;
