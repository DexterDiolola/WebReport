DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ACTIVE_MACS_USER`(IN `trend` VARCHAR(255), IN `get` VARCHAR(255), IN `created` VARCHAR(255), IN `owner` VARCHAR(255))
    NO SQL
BEGIN
    DROP TABLE IF EXISTS actives;
    CREATE TEMPORARY TABLE actives(
        id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        activeDevice VARCHAR(255) NOT NULL DEFAULT '',
        dateCreated DATETIME NOT NULL DEFAULT 0
    );

    IF trend = "macs" THEN
        SELECT * FROM macs ORDER BY id DESC;

    ELSEIF trend = "countActivePD" THEN        
        INSERT INTO actives(activeDevice)
            SELECT mac_fk FROM utilizations 
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 1 DAY)
            GROUP BY mac_fk;     
        
        IF get = "getCount-user" THEN
            SELECT COUNT(*) as activeDevice FROM actives
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE macs_users.owner = owner;
        ELSEIF get = "getMac-user" THEN
            SELECT actives.activeDevice FROM actives
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE macs_users.owner = owner;

        END IF;
    
    ELSEIF trend = "countActivePW" THEN        
        INSERT INTO actives(activeDevice)
            SELECT mac_fk FROM max_table 
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 1 WEEK)
            GROUP BY mac_fk;

        IF get = "getCount-user" THEN
            SELECT COUNT(*) as activeDevice FROM actives
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE macs_users.owner = owner;
        ELSEIF get = "getMac-user" THEN
            SELECT actives.activeDevice FROM actives
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE macs_users.owner = owner;
        END IF;

    ELSEIF trend = "countActivePM" THEN        
        INSERT INTO actives(activeDevice)
            SELECT mac_fk FROM max_table 
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 1 MONTH)
            GROUP BY mac_fk;             
        
        IF get = "getCount-user" THEN
            SELECT COUNT(*) as activeDevice FROM actives
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE macs_users.owner = owner;
        ELSEIF get = "getMac-user" THEN
            SELECT actives.activeDevice FROM actives
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE macs_users.owner = owner;
        END IF;

    ELSEIF trend = "perDay" THEN
        INSERT INTO actives(activeDevice, dateCreated)
            SELECT mac_fk, dateCreated FROM utilizations
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 2 DAY)
            GROUP BY DATE(dateCreated), HOUR(dateCreated), mac_fk;

        IF get="getCount-user" THEN
            SELECT COUNT(actives.activeDevice) AS totalActive, 
            DATE_FORMAT(actives.dateCreated, '%Y-%m-%d %H:00') AS dateCreated, 
            DATE_FORMAT (actives.dateCreated, '%H:00') AS dateCreated2 FROM actives 
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac  
            WHERE actives.dateCreated > DATE_SUB(NOW(), INTERVAL 1 DAY) AND macs_users.owner = owner 
            GROUP BY DATE(actives.dateCreated), HOUR(actives.dateCreated) 
            ORDER BY actives.dateCreated DESC LIMIT 24;
        
        ELSEIF get="getMac-user" THEN
            SELECT actives.activeDevice, 
            DATE_FORMAT(actives.dateCreated, "%Y-%m-%d %H-00") AS dateCreated FROM actives 
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE actives.dateCreated>DATE_SUB(NOW(), INTERVAL 1 DAY) 
            AND HOUR(actives.dateCreated) = created
            AND macs_users.owner = owner;
        END IF;
    
    ELSEIF trend="perWeek" THEN
        INSERT INTO actives(activeDevice, dateCreated)
            SELECT mac_fk, dateCreated FROM max_table
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 2 WEEK)
            GROUP BY DATE(dateCreated), mac_fk;
                
        IF get = "getCount-user" THEN
            SELECT COUNT(actives.activeDevice) AS totalActive, 
            DATE_FORMAT(actives.dateCreated, '%Y-%m-%d') AS dateCreated, 
            DATE_FORMAT(actives.dateCreated, '%Y-%m-%d') AS dateCreated2 FROM actives  
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE actives.dateCreated > DATE_SUB(NOW(), INTERVAL 1 WEEK) 
            AND macs_users.owner = owner 
            GROUP BY DATE(actives.dateCreated) 
            ORDER BY actives.dateCreated DESC LIMIT 7;
        
        ELSEIF get = "getMac-user" THEN
            SELECT actives.activeDevice, 
            DATE_FORMAT(actives.dateCreated, "%Y-%m-%d") AS dateCreated FROM actives 
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE DATE(actives.dateCreated) = created AND macs_users.owner = owner;
        END IF;

    ELSEIF trend="perMonth" THEN
        INSERT INTO actives(activeDevice, dateCreated)
            SELECT mac_fk, dateCreated FROM max_table
            WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 2 MONTH)
            GROUP BY DATE(dateCreated), mac_fk;
        
        IF get = "getCount-user" THEN
            SELECT COUNT(actives.activeDevice) AS totalActive, 
            DATE_FORMAT(actives.dateCreated, '%Y-%m-%d') AS dateCreated, 
            DATE_FORMAT(actives.dateCreated, '%Y-%m-%d') AS dateCreated2 FROM actives  
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE actives.dateCreated > DATE_SUB(NOW(), INTERVAL 1 MONTH) 
            AND macs_users.owner = owner 
            GROUP BY DATE(actives.dateCreated) 
            ORDER BY actives.dateCreated DESC LIMIT 30;
        
        ELSEIF get = "getMac-user" THEN
            SELECT actives.activeDevice, 
            DATE_FORMAT(actives.dateCreated, "%Y-%m-%d") AS dateCreated FROM actives 
            LEFT OUTER JOIN macs_users ON actives.activeDevice = macs_users.mac 
            WHERE DATE(actives.dateCreated) = created AND macs_users.owner = owner;
        END IF;
    END IF;
END$$
DELIMITER ;
