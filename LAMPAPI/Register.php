/* <?php
	$inData = getRequestInfo();

	$username = $inData["username"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else 
	{
		// Check if username already exists
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Username=?");
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$result = $stmt->get_result();

		if ($result->num_rows > 0) 
		{
			returnWithError("Username already exists.");
		} 
		else 
		{
			// Insert new user
			$stmt = $conn->prepare("INSERT INTO Users (Username, Password) VALUES(?, ?)");
			$stmt->bind_param("ss", $username, $password);

			if ($stmt->execute()) 
			{
				returnWithInfo("User registered successfully.");
			} 
			else 
			{
				returnWithError("Error registering user.");
			}
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

	function returnWithInfo($info)
	{
		$retValue = '{"message":"' . $info . '"}';
		sendResultInfoAsJson($retValue);
	}
?> */

<?php
$inData = getRequestInfo();

$username = $inData["username"];
$password = $inData["password"]; 

$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    
    $stmt = $conn->prepare("SELECT ID FROM Users WHERE Username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        returnWithError("Username already exists.");
    } else {
        
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        
        $stmt = $conn->prepare("INSERT INTO Users (Username, Password) VALUES(?, ?)");
        $stmt->bind_param("ss", $username, $hashedPassword);

        if ($stmt->execute()) {
            returnWithInfo("User registered successfully.");
        } else {
            returnWithError("Error registering user.");
        }
    }

    $stmt->close();
    $conn->close();
}
?>

