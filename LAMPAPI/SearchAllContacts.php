<?php

$inData = getRequestInfo();

$userId = $inData["userId"];

$conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

if ($conn->connect_error) {

    returnWithError($conn->connect_error);

} else {
   
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID = ?");
    $stmt->bind_param("i", $userId);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $contacts = [];

        while ($row = $result->fetch_assoc()) {

            $contacts[] = $row;

        }

        returnWithInfo($contacts);

    } else {

        returnWithError("No Contacts Found");

    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj) {

    header('Content-type: application/json');
    echo json_encode($obj);

}

function returnWithError($err) {

    $retValue = ["error" => $err];
    sendResultInfoAsJson($retValue);

}

function returnWithInfo($info) {

    $retValue = ["contacts" => $info];
    sendResultInfoAsJson($retValue);

}
?>
