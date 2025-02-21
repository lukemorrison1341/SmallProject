<?php

$inData = getRequestInfo();

$id = $inData["id"];
$userId = $inData["userId"];
$name = isset($inData["Name"]) ? $inData["Name"] : null;
$phone = isset($inData["Phone"]) ? $inData["Phone"] : null;
$email = isset($inData["Email"]) ? $inData["Email"] : null;

$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    
    $sql = "UPDATE Contacts SET ";
    $params = [];
    $types = "";

    if ($name !== null) {
        $sql .= "Name = ?, ";
        $params[] = $name;
        $types .= "s";
    }
    if ($phone !== null) {
        $sql .= "Phone = ?, ";
        $params[] = $phone;
        $types .= "s";
    }
    if ($email !== null) {
        $sql .= "Email = ?, ";
        $params[] = $email;
        $types .= "s";
    }

    
    $sql = rtrim($sql, ", ");
    $sql .= " WHERE id = ? AND UserID = ?";
    $params[] = $id;
    $params[] = $userId;
    $types .= "ii";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        returnWithInfo("Contact updated successfully.");
    } else {
        returnWithError("No contact updated. Please check if the contact exists and belongs to the user.");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err) {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($info) {
    $retValue = '{"message":"' . $info . '", "error":""}';
    sendResultInfoAsJson($retValue);
}

?>