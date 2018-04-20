DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `MOD_PACKAGES`(IN `cond` VARCHAR(180), IN `mac` VARCHAR(180), IN `label` VARCHAR(180), IN `package` VARCHAR(180), IN `dateCreated` VARCHAR(180), IN `xxxmins` VARCHAR(10), IN `ihr` VARCHAR(10), IN `iihrs` VARCHAR(10), IN `vhrs` VARCHAR(10), IN `iday` VARCHAR(10), IN `iidays` VARCHAR(10), IN `ivdays` VARCHAR(10), IN `iweek` VARCHAR(10))
    NO SQL
BEGIN

	IF cond = 'truncate' THEN
		TRUNCATE TABLE packages;
    
    ELSEIF cond = 'insert' THEN
        INSERT INTO packages SET packages.mac = mac, packages.label = label, packages.package = package,
        packages.dateCreated = dateCreated, packages.xxxmins = xxxmins, packages.ihr = ihr,
        packages.iihrs = iihrs, packages.vhrs = vhrs, packages.iday = iday, packages.iidays = iidays,
        packages.ivdays = ivdays, packages.iweek = iweek;
    
    END IF;


END$$
DELIMITER ;
