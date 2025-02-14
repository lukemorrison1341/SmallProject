<?php
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];

	// Concatenate first and last name
	$name = $firstName . ' ' . $lastName;

	$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts  (Name, Phone, Email, UserID) VALUES(?,?,?,?)");
		$stmt->bind_param("sssi", $name, $phone, $email, $userId);

		if($stmt->execute()){

			returnWithInfo("Contact Added Successfully");

		}else{

			returnWithInfo("Error Adding Contact");

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
	
	function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo($info)
	{
		$retValue = '{"message":"' . $info . '"}';
		sendResultInfoAsJson($retValue);
	}

	
?>
