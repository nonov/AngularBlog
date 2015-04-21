<?php
include('../api/config.php');

// Receive and Decode JSON Data
$post = file_get_contents("php://input");
$request = json_decode($post, true);

$title = $request['title'];
$img_path = $request["img_path"];
$content = $request['content'];

$sql = "INSERT INTO articles (`title`,`content`,`img_path`) VALUES (:title,:content,:img_path)";

try {
	// DB Connection
	$db  = getDB();
	$query = $db->prepare($sql);
	$query->execute(array(':title' => $title, ':content' => $content, ':img_path' => $img_path));
	$db = null;
}
catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/php.log');
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

echo true;
?>