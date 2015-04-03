<?php 

function cleanTimeStamp($chaine) {
	$date = new DateTime($chaine);
	return $date->format("d/m/Y H:i");
}