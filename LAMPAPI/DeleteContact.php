<?php

$userId = $_GET["userId"];
$contactId = $_GET["contactId"];

$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ? AND UserID = ?");
    $stmt->bind_param("ii", $contactId, $userId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            returnWithInfo("Contact Deleted.");
        } else {
            returnWithError("Contact Not Found.");
        }
    } else {
        returnWithError("Error executing delete query.");
    }

    $stmt->close();
    $conn->close();
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

?>
