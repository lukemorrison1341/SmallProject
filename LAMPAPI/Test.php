<?php
    $inData = getRequestInfo();

    $username = $inData["username"];
	$password = $inData["password"];

    header('Content-type: application/json');
    echo $username;

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
?>