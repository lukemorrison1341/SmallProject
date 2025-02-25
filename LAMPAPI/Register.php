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

