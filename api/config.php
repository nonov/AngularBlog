<?php 
function getDB() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="arevia";
	try {
		$dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		echo $e->getMessage();
		die();
	}
	return $dbConnection;
}
?>
