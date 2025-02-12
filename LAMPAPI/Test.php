<?php
    $inData = getRequestInfo();

    $username = $inData["username"];
	$password = $inData["password"];

    $result = '{"username":"' . $username . '"}';
    sendResultInfoAsJson($result);

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