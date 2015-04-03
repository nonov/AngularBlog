<?php
require_once('../api/config.php');
include_once('sanitize.php');

// Receive and Decode JSON Data
$post = file_get_contents("php://input");
$request = json_decode($post, true);

$id = $request['id'];

$sql = "SELECT * FROM posts WHERE article_id = :id";

try {
	// DB Connection
	$db = getDB();
	$query = $db->prepare($sql);
	$query->execute(array(':id' => $id));

	$posts = $query->fetchAll(PDO::FETCH_ASSOC);

	// Clean Date
	foreach ($posts as $key => $value) {
		$posts[$key]['publish_date'] = cleanTimeStamp($posts[$key]['publish_date']);
	}
	$db = null;
	
	// JSON Encode
	$query_encode = json_encode($posts);

}
catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/php.log');
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

echo $query_encode;

?>