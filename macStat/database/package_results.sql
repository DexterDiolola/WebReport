DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `package_results`(IN `trend` VARCHAR(180), IN `mac` VARCHAR(180))
    NO SQL
BEGIN
    DROP TABLE IF EXISTS temp_package_results;
    CREATE TEMPORARY TABLE temp_package_results(
        id INT(10) AUTO_INCREMENT PRIMARY KEY,
        xxxMinutes INT(10) NOT NULL DEFAULT 0,
        iHour INT(10) NOT NULL DEFAULT 0,
        iiHours INT(10) NOT NULL DEFAULT 0,
        iiiHours INT(10) NOT NULL DEFAULT 0,
        vHours INT(10) NOT NULL DEFAULT 0,
        iDay INT(10) NOT NULL DEFAULT 0,
        iiDays INT(10) NOT NULL DEFAULT 0,
        ivDays INT(10) NOT NULL DEFAULT 0,
        iWeek INT(10) NOT NULL DEFAULT 0,
        dateCreated DATETIME NOT NULL DEFAULT 0
    );

    # Specific conditions
    IF trend='check' THEN   
        SELECT * FROM `computed_packages` WHERE dateCreated > DATE_SUB(NOW(), INTERVAL 30 MINUTE);

    ELSEIF trend='truncate' THEN
        TRUNCATE TABLE computed_packages;
    




    # Needed for graph purposes in dashboard
    ELSEIF trend='perDay' THEN
        SELECT SUM(xxxMinutes) AS xxxMinutes, SUM(iHour) AS iHour, SUM(iiHours) AS iiHours, 
        SUM(iiiHours) AS iiiHours, SUM(vHours) AS vHours, SUM(iDay) AS iDay, SUM(iiDays) AS iiDays, 
        SUM(ivDays) AS ivDays, SUM(iWeek) AS iWeek, dateCreated FROM computed_packages 
        GROUP BY DATE(dateCreated);

    ELSEIF trend='perWeek' THEN
        SELECT SUM(xxxMinutes) AS xxxMinutes, SUM(iHour) AS iHour, SUM(iiHours) AS iiHours, 
        SUM(iiiHours) AS iiiHours, SUM(vHours) AS vHours, SUM(iDay) AS iDay, SUM(iiDays) AS iiDays, 
        SUM(ivDays) AS ivDays, SUM(iWeek) AS iWeek, dateCreated FROM computed_packages 
        GROUP BY WEEK(dateCreated);

    ELSEIF trend='perMonth' THEN
        SELECT SUM(xxxMinutes) AS xxxMinutes, SUM(iHour) AS iHour, SUM(iiHours) AS iiHours, 
        SUM(iiiHours) AS iiiHours, SUM(vHours) AS vHours, SUM(iDay) AS iDay, SUM(iiDays) AS iiDays, 
        SUM(ivDays) AS ivDays, SUM(iWeek) AS iWeek, dateCreated FROM computed_packages 
        GROUP BY MONTH(dateCreated);

    # For Users (uses the 'mac' parameter to input name of a user)
    ELSEIF trend='perDay-user' THEN
        SELECT SUM(xxxMinutes) AS xxxMinutes, SUM(iHour) AS iHour, SUM(iiHours) AS iiHours, 
        SUM(iiiHours) AS iiiHours, SUM(vHours) AS vHours, SUM(iDay) AS iDay, SUM(iiDays) AS iiDays, 
        SUM(ivDays) AS ivDays, SUM(iWeek) AS iWeek, computed_packages.dateCreated FROM computed_packages 
        LEFT OUTER JOIN macs_users ON computed_packages.mac = macs_users.mac 
        WHERE macs_users.owner = mac 
        GROUP BY DATE(computed_packages.dateCreated);

    ELSEIF trend='perWeek-user' THEN
        SELECT SUM(xxxMinutes) AS xxxMinutes, SUM(iHour) AS iHour, SUM(iiHours) AS iiHours, 
        SUM(iiiHours) AS iiiHours, SUM(vHours) AS vHours, SUM(iDay) AS iDay, SUM(iiDays) AS iiDays, 
        SUM(ivDays) AS ivDays, SUM(iWeek) AS iWeek, computed_packages.dateCreated FROM computed_packages 
        LEFT OUTER JOIN macs_users ON computed_packages.mac = macs_users.mac 
        WHERE macs_users.owner = mac 
        GROUP BY WEEK(computed_packages.dateCreated);

    ELSEIF trend='perMonth-user' THEN
        SELECT SUM(xxxMinutes) AS xxxMinutes, SUM(iHour) AS iHour, SUM(iiHours) AS iiHours, 
        SUM(iiiHours) AS iiiHours, SUM(vHours) AS vHours, SUM(iDay) AS iDay, SUM(iiDays) AS iiDays, 
        SUM(ivDays) AS ivDays, SUM(iWeek) AS iWeek, computed_packages.dateCreated FROM computed_packages 
        LEFT OUTER JOIN macs_users ON computed_packages.mac = macs_users.mac 
        WHERE macs_users.owner = mac 
        GROUP BY MONTH(computed_packages.dateCreated);





    # Needed for package in dashboard
    ELSEIF trend='overall-perDay' THEN
        INSERT INTO temp_package_results(xxxMinutes, iHour, iiHours, iiiHours, vHours,
                    iDay, iiDays, ivDays, iWeek, dateCreated)

            SELECT SUM(xxxMinutes), SUM(iHour), SUM(iiHours), 
            SUM(iiiHours), SUM(vHours), SUM(iDay), SUM(iiDays), 
            SUM(ivDays), SUM(iWeek), dateCreated FROM computed_packages 
            GROUP BY DATE(dateCreated);

        SELECT MAX(xxxMinutes) AS xxxMinutes, MAX(iHour) AS iHour, MAX(iiHours) AS iiHours, 
        MAX(iiiHours) AS iiiHours, MAX(vHours) AS vHours, MAX(iDay) AS iDay, MAX(iiDays) AS iiDays, 
        MAX(ivDays) AS ivDays, MAX(iWeek) AS iWeek FROM temp_package_results;

    ELSEIF trend='overall-perWeek' THEN
        INSERT INTO temp_package_results(xxxMinutes, iHour, iiHours, iiiHours, vHours,
                    iDay, iiDays, ivDays, iWeek, dateCreated)

            SELECT SUM(xxxMinutes), SUM(iHour), SUM(iiHours), 
            SUM(iiiHours), SUM(vHours), SUM(iDay), SUM(iiDays), 
            SUM(ivDays), SUM(iWeek), dateCreated FROM computed_packages 
            GROUP BY WEEK(dateCreated);

        SELECT MAX(xxxMinutes) AS xxxMinutes, MAX(iHour) AS iHour, MAX(iiHours) AS iiHours, 
        MAX(iiiHours) AS iiiHours, MAX(vHours) AS vHours, MAX(iDay) AS iDay, MAX(iiDays) AS iiDays, 
        MAX(ivDays) AS ivDays, MAX(iWeek) AS iWeek FROM temp_package_results;

    ELSEIF trend='overall-perMonth' THEN
        INSERT INTO temp_package_results(xxxMinutes, iHour, iiHours, iiiHours, vHours,
                    iDay, iiDays, ivDays, iWeek, dateCreated)

            SELECT SUM(xxxMinutes), SUM(iHour), SUM(iiHours), 
            SUM(iiiHours), SUM(vHours), SUM(iDay), SUM(iiDays), 
            SUM(ivDays), SUM(iWeek), dateCreated FROM computed_packages 
            GROUP BY MONTH(dateCreated);

        SELECT MAX(xxxMinutes) AS xxxMinutes, MAX(iHour) AS iHour, MAX(iiHours) AS iiHours, 
        MAX(iiiHours) AS iiiHours, MAX(vHours) AS vHours, MAX(iDay) AS iDay, MAX(iiDays) AS iiDays, 
        MAX(ivDays) AS ivDays, MAX(iWeek) AS iWeek FROM temp_package_results;

    # For Users (uses the 'mac' parameter to input name of a user)
    ELSEIF trend='overall-perDay-user' THEN
        INSERT INTO temp_package_results(xxxMinutes, iHour, iiHours, iiiHours, vHours,
                    iDay, iiDays, ivDays, iWeek, dateCreated)

            SELECT SUM(xxxMinutes), SUM(iHour), SUM(iiHours), 
            SUM(iiiHours), SUM(vHours), SUM(iDay), SUM(iiDays), 
            SUM(ivDays), SUM(iWeek), computed_packages.dateCreated FROM computed_packages 
            LEFT OUTER JOIN macs_users ON computed_packages.mac = macs_users.mac 
            WHERE macs_users.owner = mac 
            GROUP BY DATE(computed_packages.dateCreated);

        SELECT MAX(xxxMinutes) AS xxxMinutes, MAX(iHour) AS iHour, MAX(iiHours) AS iiHours, 
        MAX(iiiHours) AS iiiHours, MAX(vHours) AS vHours, MAX(iDay) AS iDay, MAX(iiDays) AS iiDays, 
        MAX(ivDays) AS ivDays, MAX(iWeek) AS iWeek FROM temp_package_results;

    ELSEIF trend='overall-perWeek-user' THEN
        INSERT INTO temp_package_results(xxxMinutes, iHour, iiHours, iiiHours, vHours,
                    iDay, iiDays, ivDays, iWeek, dateCreated)

            SELECT SUM(xxxMinutes), SUM(iHour), SUM(iiHours), 
            SUM(iiiHours), SUM(vHours), SUM(iDay), SUM(iiDays), 
            SUM(ivDays), SUM(iWeek), computed_packages.dateCreated FROM computed_packages 
            LEFT OUTER JOIN macs_users ON computed_packages.mac = macs_users.mac 
            WHERE macs_users.owner = mac 
            GROUP BY WEEK(computed_packages.dateCreated);

        SELECT MAX(xxxMinutes) AS xxxMinutes, MAX(iHour) AS iHour, MAX(iiHours) AS iiHours, 
        MAX(iiiHours) AS iiiHours, MAX(vHours) AS vHours, MAX(iDay) AS iDay, MAX(iiDays) AS iiDays, 
        MAX(ivDays) AS ivDays, MAX(iWeek) AS iWeek FROM temp_package_results;

    ELSEIF trend='overall-perMonth-user' THEN
        INSERT INTO temp_package_results(xxxMinutes, iHour, iiHours, iiiHours, vHours,
                    iDay, iiDays, ivDays, iWeek, dateCreated)

            SELECT SUM(xxxMinutes), SUM(iHour), SUM(iiHours), 
            SUM(iiiHours), SUM(vHours), SUM(iDay), SUM(iiDays), 
            SUM(ivDays), SUM(iWeek), computed_packages.dateCreated FROM computed_packages 
            LEFT OUTER JOIN macs_users ON computed_packages.mac = macs_users.mac 
            WHERE macs_users.owner = mac 
            GROUP BY MONTH(computed_packages.dateCreated);

        SELECT MAX(xxxMinutes) AS xxxMinutes, MAX(iHour) AS iHour, MAX(iiHours) AS iiHours, 
        MAX(iiiHours) AS iiiHours, MAX(vHours) AS vHours, MAX(iDay) AS iDay, MAX(iiDays) AS iiDays, 
        MAX(ivDays) AS ivDays, MAX(iWeek) AS iWeek FROM temp_package_results;

    



    # Needed for package in permac ativity and permac activity graph

    # No need for getting the sum since they are already the sum value in computed_packages table when GROUP BY DATE(dateCreated)
    ELSEIF trend='mac-perDay' THEN
        SELECT * FROM computed_packages WHERE computed_packages.mac = mac;

    ELSEIF trend='mac-perWeek' THEN
        SELECT mac, wallet, CAST(SUM(xxxMinutes) AS SIGNED) AS xxxMinutes, CAST(SUM(iHour) AS SIGNED) AS iHour, 
        CAST(SUM(iiHours) AS SIGNED) AS iiHours, CAST(SUM(iiiHours) AS SIGNED) AS iiiHours, 
        CAST(SUM(vHours) AS SIGNED) AS vHours, CAST(SUM(iDay) AS SIGNED) AS iDay, 
        CAST(SUM(iiDays) AS SIGNED) AS iiDays, CAST(SUM(ivDays) AS SIGNED) AS ivDays, 
        CAST(SUM(iWeek) AS SIGNED) AS iWeek, # Use CAST to make the output integer
        DATE_FORMAT(computed_packages.dateCreated, '%Y-%m-%d') AS dateCreated FROM computed_packages 
        WHERE computed_packages.mac = mac 
        GROUP BY WEEK(dateCreated)
        ORDER BY dateCreated DESC;

    ELSEIF trend='mac-perMonth' THEN
        SELECT mac, wallet, CAST(SUM(xxxMinutes) AS SIGNED) AS xxxMinutes, CAST(SUM(iHour) AS SIGNED) AS iHour, 
        CAST(SUM(iiHours) AS SIGNED) AS iiHours, CAST(SUM(iiiHours) AS SIGNED) AS iiiHours, 
        CAST(SUM(vHours) AS SIGNED) AS vHours, CAST(SUM(iDay) AS SIGNED) AS iDay, 
        CAST(SUM(iiDays) AS SIGNED) AS iiDays, CAST(SUM(ivDays) AS SIGNED) AS ivDays, 
        CAST(SUM(iWeek) AS SIGNED) AS iWeek,
        DATE_FORMAT(computed_packages.dateCreated, '%Y-%m-%d') AS dateCreated FROM computed_packages 
        WHERE computed_packages.mac = mac 
        GROUP BY MONTH(dateCreated)
        ORDER BY dateCreated DESC;

    END IF;
    

END$$
DELIMITER ;
