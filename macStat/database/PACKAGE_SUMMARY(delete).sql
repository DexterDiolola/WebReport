DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `PACKAGE_SUMMARY`(IN `trend` VARCHAR(180), IN `mac` VARCHAR(180), IN `nthDay` INT(10))
    NO SQL
BEGIN
     DROP TABLE IF EXISTS tempUtilizations;
     CREATE TEMPORARY TABLE tempUtilizations(
         id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
         mac VARCHAR(255) NOT NULL DEFAULT '',
         active INT(10) NOT NULL DEFAULT 0, 
         ccq INT(10) NOT NULL DEFAULT 0, 
         utiltx DECIMAL(20,2) NOT NULL DEFAULT 0,
         utilrx DECIMAL(20,2) NOT NULL DEFAULT 0, 
         usagetx DECIMAL(20,2) NOT NULL DEFAULT 0, 
         usagerx DECIMAL(20,2) NOT NULL DEFAULT 0,
         lease INT(10) NOT NULL DEFAULT 0,
         freeMem DECIMAL(20,2) NOT NULL DEFAULT 0,
         cpuFreq INT(10) NOT NULL DEFAULT 0,
         cpuLoad INT(10) NOT NULL DEFAULT 0,
         freeHdd INT(10) NOT NULL DEFAULT 0,
         badBlock INT(10) NOT NULL DEFAULT 0,
         uptime VARCHAR(255) NOT NULL DEFAULT 0,
         version VARCHAR(255) NOT NULL DEFAULT '',
         appVersion VARCHAR(255) NOT NULL DEFAULT '',
         gps VARCHAR(255)  NOT NULL DEFAULT '',
         dispense VARCHAR(255) NOT NULL DEFAULT '',
         packages VARCHAR(255) NOT NULL DEFAULT '',
         dateCreated DATETIME NOT NULL DEFAULT 0);
     
         IF trend='perDay' THEN

            INSERT INTO tempUtilizations(mac, active, ccq, utiltx, utilrx,
            usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd,
            badBlock, uptime, version, appVersion, gps, dispense, packages, dateCreated)
                SELECT mac_fk, MAX(active), MAX(ccq), MAX(utiltx),
                MAX(utilrx), MAX(usagetx), MAX(usagerx), MAX(lease),        
                MAX(freeMemory), MAX(cpuFreq), MAX(cpuLoad), MAX(freeHdd),
                MAX(badBlock), uptime, version, appVersion, gps, dispense, packages, dateCreated FROM utilizations 
                WHERE mac_fk=mac AND DAYOFYEAR(dateCreated) = DAYOFYEAR(NOW()) - nthDay
                GROUP BY DATE(dateCreated), HOUR(dateCreated);
                     
             SELECT tempUtilizations.mac, label, owner, active, ccq, utiltx, 
             utilrx, usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd, badBlock, uptime,
             version, appVersion, gps, dispense, packages,
             DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d %H:00') AS dateCreated, 
             DATE_FORMAT(tempUtilizations.dateCreated, '%H:00') AS dateCreated2 FROM tempUtilizations
             LEFT OUTER JOIN macs ON tempUtilizations.mac = macs.mac 
             LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
             ORDER BY tempUtilizations.dateCreated DESC;

        ELSEIF trend='perWeek' THEN

            INSERT INTO tempUtilizations(mac, active, ccq, utiltx, utilrx,
            usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd,
            badBlock, uptime, version, appVersion, gps, dispense, packages, dateCreated)
                SELECT mac_fk, MAX(active), MAX(ccq), MAX(utiltx),
                MAX(utilrx), MAX(usagetx), MAX(usagerx), MAX(lease),        
                MAX(freeMemory), MAX(cpuFreq), MAX(cpuLoad), MAX(freeHdd),
                MAX(badBlock), uptime, version, appVersion, gps, dispense, packages, dateCreated FROM utilizations 
                WHERE mac_fk=mac AND WEEK(dateCreated) = WEEK(NOW()) - nthDay
                GROUP BY DATE(dateCreated), HOUR(dateCreated);
                     
             SELECT tempUtilizations.mac, label, owner, active, ccq, utiltx, 
             utilrx, usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd, badBlock, uptime,
             version, appVersion, gps, dispense, packages,
             DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d %H:00') AS dateCreated, 
             DATE_FORMAT(tempUtilizations.dateCreated, '%H:00') AS dateCreated2 FROM tempUtilizations
             LEFT OUTER JOIN macs ON tempUtilizations.mac = macs.mac 
             LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
             ORDER BY tempUtilizations.dateCreated DESC;

        ELSEIF trend='perMonth' THEN
            INSERT INTO tempUtilizations(mac, active, ccq, utiltx, utilrx,
            usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd,
            badBlock, uptime, version, appVersion, gps, dispense, packages, dateCreated)
                SELECT mac_fk, MAX(active), MAX(ccq), MAX(utiltx),
                MAX(utilrx), MAX(usagetx), MAX(usagerx), MAX(lease),        
                MAX(freeMemory), MAX(cpuFreq), MAX(cpuLoad), MAX(freeHdd),
                MAX(badBlock), uptime, version, appVersion, gps, dispense, packages, dateCreated FROM utilizations 
                WHERE mac_fk=mac AND DAYOFYEAR(dateCreated) = DAYOFYEAR(NOW()) - nthDay
                GROUP BY DATE(dateCreated), HOUR(dateCreated);
                     
             SELECT tempUtilizations.mac, label, owner, active, ccq, utiltx, 
             utilrx, usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd, badBlock, uptime,
             version, appVersion, gps, dispense, packages,
             DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d %H:00') AS dateCreated, 
             DATE_FORMAT(tempUtilizations.dateCreated, '%H:00') AS dateCreated2 FROM tempUtilizations
             LEFT OUTER JOIN macs ON tempUtilizations.mac = macs.mac 
             LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
             ORDER BY tempUtilizations.dateCreated DESC;


        END IF;
END$$
DELIMITER ;
