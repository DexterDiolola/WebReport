DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SET_ALERT_VALUES`(IN `ccq` INT, IN `cpuLoad` INT, IN `freeMem` INT)
    NO SQL
BEGIN
	TRUNCATE TABLE alert_setting_values;
    
    INSERT INTO alert_setting_values SET alert_setting_values.ccq = ccq,
    alert_setting_values.cpuLoad = cpuLoad, alert_setting_values.freeMem = freeMem, alert_setting_values.dateCreated = NOW();


END$$
DELIMITER ;
