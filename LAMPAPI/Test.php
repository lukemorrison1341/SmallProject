<?php
    header('Content-type: application/json');
    sendResultInfoAsJson($_GET["username"]);

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
?>