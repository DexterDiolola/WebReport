DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `MAX_OF_PACKAGES`(IN `cond` VARCHAR(180))
    NO SQL
BEGIN
	
	DROP TABLE IF EXISTS tempPackage;
	CREATE TEMPORARY TABLE tempPackage(
		id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		xxxmins INT(10) NOT NULL DEFAULT 0,
		ihr INT(10) NOT NULL DEFAULT 0,
		iihrs INT(10) NOT NULL DEFAULT 0,
		vhrs INT(10) NOT NULL DEFAULT 0,
		iday INT(10) NOT NULL DEFAULT 0,
		iidays INT(10) NOT NULL DEFAULT 0,
		ivdays INT(10) NOT NULL DEFAULT 0,
		iweek INT(10) NOT NULL DEFAULT 0,
		dateCreated DATETIME NOT NULL DEFAULT 0
	);

	IF cond = 'max-perday' THEN
		INSERT INTO tempPackage(xxxmins, ihr, iihrs, vhrs, iday,
		iidays, ivdays, iweek, dateCreated)

			SELECT SUM(xxxmins), SUM(ihr), SUM(iihrs), SUM(vhrs), SUM(iday), 
			SUM(iidays), SUM(ivdays), SUM(iweek), dateCreated FROM packages
			GROUP BY DATE(dateCreated);

		SELECT MAX(xxxmins) AS xxxmins, MAX(ihr) AS ihr, MAX(iihrs) AS iihrs, 
		MAX(vhrs) AS vhrs, MAX(iday) AS iday, MAX(iidays) AS iidays, 
		MAX(ivdays) AS ivdays, MAX(iweek) AS iweek, dateCreated FROM tempPackage;

	ELSEIF cond = 'max-perweek' THEN
		INSERT INTO tempPackage(xxxmins, ihr, iihrs, vhrs, iday,
		iidays, ivdays, iweek, dateCreated)

			SELECT SUM(xxxmins), SUM(ihr), SUM(iihrs), SUM(vhrs), SUM(iday), 
			SUM(iidays), SUM(ivdays), SUM(iweek), dateCreated FROM packages
			GROUP BY WEEK(dateCreated);

		SELECT MAX(xxxmins) AS xxxmins, MAX(ihr) AS ihr, MAX(iihrs) AS iihrs, 
		MAX(vhrs) AS vhrs, MAX(iday) AS iday, MAX(iidays) AS iidays, 
		MAX(ivdays) AS ivdays, MAX(iweek) AS iweek, dateCreated FROM tempPackage;

	ELSEIF cond = 'sum-perday' THEN
		INSERT INTO tempPackage(xxxmins, ihr, iihrs, vhrs, iday,
		iidays, ivdays, iweek, dateCreated)

			SELECT SUM(xxxmins), SUM(ihr), SUM(iihrs), SUM(vhrs), SUM(iday), 
			SUM(iidays), SUM(ivdays), SUM(iweek), dateCreated FROM packages
			GROUP BY DATE(dateCreated);

		SELECT xxxmins, ihr, iihrs, vhrs, iday, iidays, 
		ivdays, iweek, dateCreated FROM tempPackage ORDER BY dateCreated DESC;

	ELSEIF cond = 'sum-perweek' THEN
		INSERT INTO tempPackage(xxxmins, ihr, iihrs, vhrs, iday,
		iidays, ivdays, iweek, dateCreated)

			SELECT SUM(xxxmins), SUM(ihr), SUM(iihrs), SUM(vhrs), SUM(iday), 
			SUM(iidays), SUM(ivdays), SUM(iweek), dateCreated FROM packages
			GROUP BY WEEK(dateCreated);

		SELECT xxxmins, ihr, iihrs, vhrs, iday, iidays, 
		ivdays, iweek, dateCreated FROM tempPackage ORDER BY dateCreated DESC;

	END IF;



END$$
DELIMITER ;
