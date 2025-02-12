<?php
    $inData = getRequestInfo();

    header('Content-type: application/json');
    echo $inData;

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
?>