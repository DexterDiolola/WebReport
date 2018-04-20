DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `MAX_PER_TREND_USER`(IN `trend` VARCHAR(255), IN `get` VARCHAR(255), IN `created` VARCHAR(255), IN `owner` VARCHAR(255))
    NO SQL
BEGIN
    DROP TABLE IF EXISTS tempUtilizations, maxOfTotal;
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
        dateCreated DATETIME NOT NULL DEFAULT 0);

    CREATE TEMPORARY TABLE maxOfTotal(
        id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        active INT(10) NOT NULL DEFAULT 0,
        utiltx DECIMAL(20,2) NOT NULL DEFAULT 0,
        utilrx DECIMAL(20,2) NOT NULL DEFAULT 0, 
        usagetx DECIMAL(20,2) NOT NULL DEFAULT 0, 
        usagerx DECIMAL(20,2) NOT NULL DEFAULT 0,
        dateCreated DATETIME NOT NULL DEFAULT 0);
    
    IF trend="perDay" THEN
        INSERT INTO tempUtilizations(mac, active, ccq, utiltx, utilrx,
        usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd,
        badBlock, dateCreated)
            SELECT mac_fk, MAX(active), MAX(ccq), MAX(utiltx),
            MAX(utilrx), MAX(usagetx), MAX(usagerx), MAX(lease),        
            MAX(freeMemory), MAX(cpuFreq), MAX(cpuLoad), MAX(freeHdd),
            MAX(badBlock), dateCreated FROM utilizations 
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 2 DAY)
            GROUP BY DATE(dateCreated), HOUR(dateCreated), mac_fk;
     
        IF get = "user" THEN
            SELECT SUM(tempUtilizations.active) AS active, MAX(tempUtilizations.ccq) AS ccq, 
            SUM(tempUtilizations.utiltx) AS utiltx, SUM(tempUtilizations.utilrx) AS utilrx, 
            SUM(tempUtilizations.usagetx) AS usagetx, SUM(tempUtilizations.usagerx) AS usagerx, 
            SUM(tempUtilizations.lease) AS lease, SUM(tempUtilizations.freeMem) AS freeMem, 
            SUM(tempUtilizations.cpuFreq) AS cpuFreq, SUM(tempUtilizations.cpuLoad) AS cpuLoad, 
            SUM(tempUtilizations.freeHdd) AS freeHdd, SUM(tempUtilizations.badBlock) AS badBlock, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d %H:00') AS dateCreated, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%H:00') AS dateCreated2 FROM tempUtilizations
            LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
            WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 DAY)
            AND macs_users.owner = owner
            GROUP BY DATE(tempUtilizations.dateCreated), HOUR(tempUtilizations.dateCreated) 
            ORDER BY tempUtilizations.dateCreated DESC LIMIT 24;
       
        ELSEIF get="getEach-user" THEN
            SELECT tempUtilizations.mac, tempUtilizations.active, tempUtilizations.ccq, 
            tempUtilizations.utiltx, tempUtilizations.utilrx, .tempUtilizations.usagetx, 
            tempUtilizations.usagerx, tempUtilizations.lease, tempUtilizations.freeMem, 
            tempUtilizations.cpuFreq, tempUtilizations.cpuLoad, tempUtilizations.freeHdd, 
            tempUtilizations.badBlock, DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d %H:00') AS dateCreated, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%H:00') AS dateCreated2 FROM tempUtilizations
            LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac 
            WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 DAY) 
            AND HOUR(tempUtilizations.dateCreated) = created AND macs_users.owner = owner
            ORDER BY tempUtilizations.dateCreated DESC;
        
        ELSEIF get="getSum-user" THEN 
            INSERT INTO maxOfTotal(active, utiltx, utilrx, usagetx, usagerx)
                SELECT SUM(tempUtilizations.active), SUM(tempUtilizations.utiltx), SUM(tempUtilizations.utilrx),
                SUM(tempUtilizations.usagetx), SUM(tempUtilizations.usagerx) FROM tempUtilizations
                LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
                WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 DAY) AND macs_users.owner = owner
                GROUP BY DATE(tempUtilizations.dateCreated), HOUR(tempUtilizations.dateCreated) 
                ORDER BY tempUtilizations.dateCreated DESC;

                SELECT MAX(active) AS active, MAX(utiltx) AS utiltx, 
                MAX(utilrx) AS utilrx, MAX(usagetx) AS usagetx,
                MAX(usagerx) AS usagerx FROM maxOfTotal;
        
        ELSEIF get="getSumDate-user" THEN
            INSERT INTO maxOfTotal(active, dateCreated)
                SELECT SUM(tempUtilizations.active), tempUtilizations.dateCreated FROM tempUtilizations 
                LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
                WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 DAY) AND macs_users.owner = owner  
                GROUP BY DATE(tempUtilizations.dateCreated), HOUR(tempUtilizations.dateCreated) 
                ORDER BY tempUtilizations.dateCreated DESC;

                SELECT active, DATE_FORMAT(dateCreated, '%H:00') AS dateCreated FROM maxOfTotal 
                ORDER BY active DESC LIMIT 1;
        END IF;

    ELSEIF trend="perWeek" THEN
        INSERT INTO tempUtilizations(mac, active, ccq, utiltx, utilrx,
        usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd,
        badBlock, dateCreated)
            SELECT mac_fk, MAX(active), MAX(ccq), MAX(utiltx),
            MAX(utilrx), MAX(usagetx), MAX(usagerx), MAX(lease),        
            MAX(freeMemory), MAX(cpuFreq), MAX(cpuLoad), MAX(freeHdd),
            MAX(badBlock), dateCreated FROM max_table 
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 2 WEEK)
            GROUP BY DATE(dateCreated), mac_fk;
        
        IF get = "user" THEN
            SELECT SUM(tempUtilizations.active) AS active, MAX(tempUtilizations.ccq) AS ccq, 
            SUM(tempUtilizations.utiltx) AS utiltx, SUM(tempUtilizations.utilrx) AS utilrx, 
            SUM(tempUtilizations.usagetx) AS usagetx, SUM(tempUtilizations.usagerx) AS usagerx, 
            SUM(tempUtilizations.lease) AS lease, SUM(tempUtilizations.freeMem) AS freeMem, 
            SUM(tempUtilizations.cpuFreq) AS cpuFreq, SUM(tempUtilizations.cpuLoad) AS cpuLoad, 
            SUM(tempUtilizations.freeHdd) AS freeHdd, SUM(tempUtilizations.badBlock) AS badBlock, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated2 FROM tempUtilizations
            LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
            WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 WEEK)
            AND macs_users.owner = owner
            GROUP BY DATE(tempUtilizations.dateCreated) 
            ORDER BY tempUtilizations.dateCreated DESC LIMIT 7;
        
        ELSEIF get="getEach-user" THEN
            SELECT tempUtilizations.mac, tempUtilizations.active, tempUtilizations.ccq, 
            tempUtilizations.utiltx, tempUtilizations.utilrx, .tempUtilizations.usagetx, 
            tempUtilizations.usagerx, tempUtilizations.lease, tempUtilizations.freeMem, 
            tempUtilizations.cpuFreq, tempUtilizations.cpuLoad, tempUtilizations.freeHdd, 
            tempUtilizations.badBlock, DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated2 FROM tempUtilizations
            LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac 
            WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 WEEK) 
            AND DATE(tempUtilizations.dateCreated) = created AND macs_users.owner = owner
            ORDER BY tempUtilizations.dateCreated DESC;
        
        ELSEIF get="getSum-user" THEN 
            INSERT INTO maxOfTotal(active, utiltx, utilrx, usagetx, usagerx)
                SELECT SUM(tempUtilizations.active), SUM(tempUtilizations.utiltx), SUM(tempUtilizations.utilrx),
                SUM(tempUtilizations.usagetx), SUM(tempUtilizations.usagerx) FROM tempUtilizations
                LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
                WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 WEEK) AND macs_users.owner = owner
                GROUP BY DATE(tempUtilizations.dateCreated) 
                ORDER BY tempUtilizations.dateCreated DESC;

                SELECT MAX(active) AS active, MAX(utiltx) AS utiltx, 
                MAX(utilrx) AS utilrx, MAX(usagetx) AS usagetx,
                MAX(usagerx) AS usagerx FROM maxOfTotal;
        
        ELSEIF get="getSumDate-user" THEN
            INSERT INTO maxOfTotal(active, dateCreated)
                SELECT SUM(tempUtilizations.active), tempUtilizations.dateCreated FROM tempUtilizations 
                LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
                WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 WEEK) AND macs_users.owner = owner  
                GROUP BY DATE(tempUtilizations.dateCreated) 
                ORDER BY tempUtilizations.dateCreated DESC;

                SELECT active, DATE_FORMAT(dateCreated, '%Y-%m-%d') AS dateCreated FROM maxOfTotal 
                ORDER BY active DESC LIMIT 1;
        END IF;

    ELSEIF trend="perMonth" THEN
        INSERT INTO tempUtilizations(mac, active, ccq, utiltx, utilrx,
        usagetx, usagerx, lease, freeMem, cpuFreq, cpuLoad, freeHdd,
        badBlock, dateCreated)
            SELECT mac_fk, MAX(active), MAX(ccq), MAX(utiltx),
            MAX(utilrx), MAX(usagetx), MAX(usagerx), MAX(lease),        
            MAX(freeMemory), MAX(cpuFreq), MAX(cpuLoad), MAX(freeHdd),
            MAX(badBlock), dateCreated FROM max_table 
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 2 MONTH)
            GROUP BY DATE(dateCreated), mac_fk;
        
        IF get = "user" THEN
            SELECT SUM(tempUtilizations.active) AS active, MAX(tempUtilizations.ccq) AS ccq, 
            SUM(tempUtilizations.utiltx) AS utiltx, SUM(tempUtilizations.utilrx) AS utilrx, 
            SUM(tempUtilizations.usagetx) AS usagetx, SUM(tempUtilizations.usagerx) AS usagerx, 
            SUM(tempUtilizations.lease) AS lease, SUM(tempUtilizations.freeMem) AS freeMem, 
            SUM(tempUtilizations.cpuFreq) AS cpuFreq, SUM(tempUtilizations.cpuLoad) AS cpuLoad, 
            SUM(tempUtilizations.freeHdd) AS freeHdd, SUM(tempUtilizations.badBlock) AS badBlock, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated2 FROM tempUtilizations
            LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
            WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 MONTH)
            AND macs_users.owner = owner
            GROUP BY DATE(tempUtilizations.dateCreated) 
            ORDER BY tempUtilizations.dateCreated DESC LIMIT 30;
        
        ELSEIF get="getEach-user" THEN
            SELECT tempUtilizations.mac, tempUtilizations.active, tempUtilizations.ccq, 
            tempUtilizations.utiltx, tempUtilizations.utilrx, .tempUtilizations.usagetx, 
            tempUtilizations.usagerx, tempUtilizations.lease, tempUtilizations.freeMem, 
            tempUtilizations.cpuFreq, tempUtilizations.cpuLoad, tempUtilizations.freeHdd, 
            tempUtilizations.badBlock, DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated, 
            DATE_FORMAT(tempUtilizations.dateCreated, '%Y-%m-%d') AS dateCreated2 FROM tempUtilizations
            LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac 
            WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 MONTH) 
            AND DATE(tempUtilizations.dateCreated) = created AND macs_users.owner = owner
            ORDER BY tempUtilizations.dateCreated DESC;
       
        ELSEIF get="getSum-user" THEN 
            INSERT INTO maxOfTotal(active, utiltx, utilrx, usagetx, usagerx)
                SELECT SUM(tempUtilizations.active), SUM(tempUtilizations.utiltx), SUM(tempUtilizations.utilrx),
                SUM(tempUtilizations.usagetx), SUM(tempUtilizations.usagerx) FROM tempUtilizations
                LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
                WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 MONTH) AND macs_users.owner = owner
                GROUP BY DATE(tempUtilizations.dateCreated) 
                ORDER BY tempUtilizations.dateCreated DESC;

                SELECT MAX(active) AS active, MAX(utiltx) AS utiltx, 
                MAX(utilrx) AS utilrx, MAX(usagetx) AS usagetx,
                MAX(usagerx) AS usagerx FROM maxOfTotal;
        
        ELSEIF get="getSumDate-user" THEN
            INSERT INTO maxOfTotal(active, dateCreated)
                SELECT SUM(tempUtilizations.active), tempUtilizations.dateCreated FROM tempUtilizations 
                LEFT OUTER JOIN macs_users ON tempUtilizations.mac = macs_users.mac
                WHERE tempUtilizations.dateCreated > DATE_SUB(NOW(), INTERVAL 1 MONTH) AND macs_users.owner = owner  
                GROUP BY DATE(tempUtilizations.dateCreated) 
                ORDER BY tempUtilizations.dateCreated DESC;

                SELECT active, DATE_FORMAT(dateCreated, '%Y-%m-%d') AS dateCreated FROM maxOfTotal 
                ORDER BY active DESC LIMIT 1;
        END IF;
    END IF;
END$$
DELIMITER ;
