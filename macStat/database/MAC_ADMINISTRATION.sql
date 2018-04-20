DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `MAC_ADMINISTRATION`(IN `cond` VARCHAR(255), IN `owner` VARCHAR(255), IN `mac` VARCHAR(255))
    NO SQL
BEGIN

    IF cond = 'show-unassigned' THEN
        SELECT macs_users.id, macs_users.mac, macs_users.dateUpdated, macs_users.owner, macs.label 
        FROM macs_users
        LEFT OUTER JOIN macs ON macs_users.mac = macs.mac  
        WHERE macs_users.owner = ''
        ORDER BY macs_users.dateCreated DESC;
    
    ELSEIF cond = 'show-assigned' THEN
        SELECT id, macs_users.mac, dateUpdated, macs_users.owner 
        FROM macs_users WHERE macs_users.owner != ''
        ORDER BY dateUpdated DESC;

    ELSEIF cond = 'show-users' THEN
        SELECT username FROM users;
    
    ELSEIF cond = 'assign' THEN
        UPDATE macs_users SET macs_users.owner = owner,
        dateUpdated = NOW() WHERE macs_users.mac = mac;

    ELSEIF cond = 'unassign' THEN
        UPDATE macs_users SET macs_users.owner = '',
        dateUpdated = NOW() WHERE macs_users.mac = mac;

    ELSEIF cond = 'count-macs-of-user' THEN
        SELECT macs_users.owner, COUNT(mac) AS owned 
        FROM macs_users WHERE macs_users.owner != '' 
        GROUP BY macs_users.owner;

    ELSEIF cond = 'show-macs-of-user' THEN
        SELECT macs_users.mac, macs_users.owner 
        FROM macs_users WHERE macs_users.owner = owner;
    END IF;    
    
END$$
DELIMITER ;
