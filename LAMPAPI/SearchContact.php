<?php
	$inData = getRequestInfo();

	$search = $inData["search"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else 
	{
		$stmt = $conn->prepare("SELECT Name, Phone, Email FROM Contacts WHERE (Name LIKE ? OR Email LIKE ? OR Phone LIKE ?) AND UserID=?");
		$searchParam = "%" . $search . "%";
		$stmt->bind_param("sssi", $searchParam, $searchParam, $searchParam, $userId);
		$stmt->execute();
		$result = $stmt->get_result();

		$searchResults = [];
		while ($row = $result->fetch_assoc()) 
		{
			$searchResults[] = $row;
		}

		if (count($searchResults) > 0) 
		{
			returnWithInfo($searchResults);
		} 
		else 
		{
			returnWithError("No contacts found.");
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError($err)
	{
		$retValue = '{"results":[],"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

	function returnWithInfo($results)
	{
		$retValue = '{"results":' . json_encode($results) . ',"error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
