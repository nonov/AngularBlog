<?php
include('../api/config.php');

// Receive and Decode JSON Data
$post = file_get_contents("php://input");
$request = json_decode($post, true);

$id = $request['id'];
$content = $request["content"];
$firstname = $request['firstname'];
$email = $request['email'];

$sql = "INSERT INTO posts (`article_id`,`content`,`firstname`,`email`) VALUES (:id,:content,:firstname,:email)";

try {
	// DB Connection
	$db  = getDB();
	$query = $db->prepare($sql);
	$query->execute(array(':id' => $id, ':content' => $content, ':firstname' => $firstname, ':email' => $email));
	$db = null;
}
catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/php.log');
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

echo true;
?>