document.getElementById("wrapper").addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the input field values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    
    var requestData = {
        username: username,
        password: password
    };

    // Create a POST request to the PHP backend
    fetch('Login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === "") {
            
            console.log("Login successful! User ID: " + data.id);
            document.getElementById('errorMessage').textContent = ''; 
        } else {
            
            handleLoginError(data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

function handleLoginError(errorMessage) {
    // Reset the styles of the input fields before highlighting
    document.getElementById('username').style.borderColor = '';
    document.getElementById('password').style.borderColor = '';
    document.getElementById('errorMessage').textContent = ''; 

    if (errorMessage === "No such user.") {
        // User not found, highlight the username field in red
        //document.getElementById('input-box').style.borderColor = 'red';
        document.getElementById("username").textContent = "invalid username";
        document.getElementById('errorMessage').textContent = 'No such user.';
    } else if (errorMessage === "Incorrect password.") {
        
        document.getElementById('password').style.color = 'red';
        document.getElementById('errorMessage').textContent = 'Incorrect password.';
    }
}
