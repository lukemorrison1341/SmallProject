 <?php

	$inData = getRequestInfo();
	
	$username = $inData["username"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");
	
	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID, Password FROM Users WHERE Username=?");
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$result = $stmt->get_result();

		if ($row = $result->fetch_assoc()) 
		{

			if ($password == $row["Password"]) 
			{
				returnWithInfo($row["ID"]);
			} 
			else 
			{
				returnWithError("Try Again.");
			}
		} 
		else 
		{
			returnWithError("Try Again.");
		}

		$stmt->close();
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($id)
	{
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?> 

