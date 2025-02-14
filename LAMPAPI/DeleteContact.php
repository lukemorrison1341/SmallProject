<?php

$inData = getRequestInfo();

$userId = $inData["userId"];
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];

$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

if ($conn->connect_error) {

    returnWithError($conn->connect_error);

} else {

    $stmt = $conn->prepare("DELETE FROM Contacts WHERE Name = ? AND UserID = ?");
    $name = $firstName . ' ' . $lastName;
    $stmt->bind_param("si", $name, $userId);

    if ($stmt->execute()) {

        if ($stmt->affected_rows > 0) {

            returnWithInfo("Contact Deleted.");

        } else {

            returnWithError("Contact Not Found.");

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

?>