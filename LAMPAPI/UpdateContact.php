<?php
    $inData = getRequestInfo();

    $id = $inData["id"];
    $userId = $inData["userId"];
    $name = $inData["Name"];
    $phone = $inData["Phone"];
    $email = $inData["Email"];

    $conn = new mysqli("localhost", "contact_app", "UniversalP@ssw0rd!", "contact_manager");

    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        
        $stmt = $conn->prepare("UPDATE Contacts SET Name = ?, Phone = ?, Email = ? WHERE id = ? AND UserID = ?");
        $stmt->bind_param("sssis", $name, $phone, $email, $id, $userId);
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
