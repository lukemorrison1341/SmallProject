<?php
$inData = getRequestInfo();

$username = $inData["username"];
$password = $inData["password"]; 

$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    
    $stmt = $conn->prepare("SELECT ID, Password FROM Users WHERE Username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $storedPassword = $row["Password"];

        
        if (password_verify($password, $storedPassword)) {
            returnWithInfo("Login successful.");
        } else {
            returnWithError("Invalid username or password.");
        }
    } else {
        returnWithError("Username not found.");
    }

    $stmt->close();
    $conn->close();
}
?>

