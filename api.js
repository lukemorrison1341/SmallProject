const urlBase = 'http://gerberthegoat.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

let adding_contact = false;


function doLogin()
{
	userId = 0;
	
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	if(username.trim() === "" || password.trim() === ""){
		if (username.trim() === "") {
			document.getElementById("username").style.borderColor = "red";
		}
		if (password.trim() === "") {
			document.getElementById("password").style.borderColor = "red";
		}
		return;
	}
	
	let tmp = {
		username: username,
		password: password
	};
	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + "/Login." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{	
					document.getElementById("username").style.borderColor = "red";
					document.getElementById("password").style.borderColor = "red";
					var errorMessage = document.getElementById('error-message');
					errorMessage.style.display = 'block';
					
				

					return;
				}

				saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		return;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	const site_url = window.location.protocol + "//" + window.location.host + "/" 
	if( userId < 0 )
	{
		
		if (window.location.href === site_url || window.location.href === site_url + "SignUPPage.html" || window.location.href === site_url + "index.html") return;
		window.location.href = "index.html";
	}
	else
	{
		if (window.location.href === site_url + "contacts.html") return;
		window.location.href = "contacts.html";
	}
}

function doRegister() {

	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let confirmpassword = document.getElementById("confirmpassword").value;

	if(username.trim() === "" || password.trim() === "" || confirmpassword.trim() === ""){
		if (username.trim() === "") {
			document.getElementById("username").style.borderColor = "red";
		}
		if (password.trim() === "") {
			document.getElementById("password").style.borderColor = "red";
		}
		if (confirmpassword.trim() === "") {
			document.getElementById("confirmpassword").style.borderColor = "red";
		}
		
		return;
	}
	if(password != confirmpassword){
		document.getElementById("password").style.borderColor = "red";
		document.getElementById("confirmpassword").style.borderColor = "red";
		var errorMessage = document.getElementById('password-error');
		errorMessage.style.display = 'block';

		return;

	}

	let tmp = {
		username: username,
		password: password
	};

	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + "/Register." + extension;

	console.log(jsonPayload);
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("YEP!");	
				
				let response = JSON.parse(this.responseText);
                if (response.error =="Username already exists." ) {
					// console.log("In the if block...");
                    var usernameerrorMessage = document.getElementById('username-error');
                    usernameerrorMessage.style.display = 'block';
					return;
                }
				window.location.href = "index.html";
			}
			
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		return;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	if (adding_contact) return;
	adding_contact = true;

	let error_p = document.getElementById("error");
	if (error_p) {
		error_p.remove();
	}

	const results_area = document.getElementById("results-box");
	results_area.scrollTop = 0;
	const table_row = document.createElement("div");
	table_row.classList.add("contact-row");
	const contact_div = document.createElement('div');
	contact_div.classList.add("contact-info");
	table_row.appendChild(contact_div);

	let div = document.createElement('div');
	div.classList.add("input-box");
	let name_field = document.createElement('input');
	document.createElement('input');
	name_field.type = "text";
	name_field.placeholder = "Name";
	name_field.name = "name";
	name_field.id = "name";
	div.appendChild(name_field);
	contact_div.appendChild(div);

	div = document.createElement('div');
	div.classList.add("input-box");
	let email_field = document.createElement('input');
	email_field.type = "email";
	email_field.placeholder = "Email";
	email_field.name = "email";
	email_field.id = "email";
	div.appendChild(email_field);
	contact_div.appendChild(div);

	div = document.createElement("div");
	div.classList.add("input-box");
	let phone_field = document.createElement('input');
	phone_field.type = "tel";
	phone_field.placeholder = "Phone";
	phone_field.name = "phone";
	phone_field.id = "phone";
	div.appendChild(phone_field);
	contact_div.appendChild(div);

	let tmp = document.createElement('div');
	tmp.innerHTML = '<svg id="confirm" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
	table_row.appendChild(tmp);
	tmp = document.createElement('div');
	tmp.innerHTML = '<svg id="cancel" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
	table_row.appendChild(tmp);
	results_area.prepend(table_row);

	let confirm_btn = document.getElementById("confirm");
	confirm_btn.addEventListener("click", function() {
		if (name_field.value === "" || email_field.value === "" || phone_field.value === "") {
			return;
		}
		else if (!isValidEmail(email_field.value)) {
			return;
		}
		else if (!isValidPhoneNumber(phone_field.value)) {
			return;
		}

		let name = name_field.value.split(" ");
		let tmp = {
			userId: userId,
			firstName: name[0],
			lastName: (name.length > 1) ? name[1] : "",
			phone: (hasNoDashes(phone_field.value)) ? phone_field.value.replace(/(\d{3})(\d{3})(\d{4})(\d*)/, '$1-$2-$3') : phone_field.value,
			email: email_field.value
		};

		let jsonPayload = JSON.stringify( tmp );
		let url = urlBase + '/AddContact.' + extension;
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					let jsonObject = JSON.parse( xhr.responseText );

					if (jsonObject.error) {
						return;
					}

					window.location.href = "contacts.html";
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("colorSearchResult").innerHTML = err.message;
		}
	}, false);
	let cancel_btn = document.getElementById("cancel");
	cancel_btn.addEventListener("click", function() {
		table_row.remove();
		adding_contact = false;
	}, false);
}

function searchContact()
{
	let srch = document.getElementById("search").value;

	let tmp = {
		search: srch,
		userId: userId
	};

	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContact.' + extension;

	const results_area = document.getElementById("results-box");
	results_area.innerHTML = '';
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{

				let jsonObject = JSON.parse( xhr.responseText );
				for(let i = 0; i < jsonObject.results.length; i++) {
					results_area.appendChild(createContactElement(jsonObject.results[i]));
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

function searchAllContacts()
{

	let tmp = {
		userId: userId
	};

	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchAllContacts.' + extension;

	const results_area = document.getElementById("results-box");
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );

				if (jsonObject.error) {
					tmp = document.createElement('p');
					tmp.id = "error";
					tmp.style.textAlign = "center";
					tmp.innerHTML = jsonObject.error;
					results_area.appendChild(tmp);
					return;
				}

				for(let i = 0; i < jsonObject.contacts.length; i++) {
					results_area.appendChild(createContactElement(jsonObject.contacts[i]));
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

function deleteContact(contact_id) {
	let url_params = {
		userId: userId,
		contactId: parseInt(contact_id)
	}

	url_params = new URLSearchParams(url_params).toString();
	let url = urlBase + "/DeleteContact." + extension + "?" + url_params;
	let xhr = new XMLHttpRequest();
	console.log(url);
	xhr.open("DELETE", url, true);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
			alert("Contact Deleted!");
			window.location.href = "contacts.html";
		} else {
			alert('Request failed with status:', xhr.status);
		}
	};

	xhr.send();
}

function createContactElement(contactObject) {
	const table_row = document.createElement('div');
	table_row.classList.add("contact-row");
	const contact_div = document.createElement('div');
	contact_div.classList.add("contact-info");
	contact_div.setAttribute("data-id", contactObject.ID);
	table_row.appendChild(contact_div);
	let tmp = document.createElement('p');
	tmp.classList.add("name");
	tmp.innerHTML = contactObject.Name;
	contact_div.appendChild(tmp);
	tmp = document.createElement('p');
	tmp.classList.add("email");
	tmp.innerHTML = contactObject.Email;
	contact_div.appendChild(tmp);
	tmp = document.createElement('p');
	tmp.classList.add("phone");
	tmp.innerHTML = contactObject.Phone;
	contact_div.appendChild(tmp);
	tmp = document.createElement('div');
	tmp.innerHTML = '<svg class="edit" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>';
	table_row.appendChild(tmp);
	tmp = document.createElement('div');
	tmp.innerHTML = '<svg class="delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
	tmp.addEventListener("click", function() {
		deleteContact(contact_div.getAttribute("data-id"));
	}, false);
	
	table_row.appendChild(tmp);
	return table_row
}

// Show password toggle
document.addEventListener('DOMContentLoaded', function() {
    let toggleIcon = document.getElementById('show-password-toggle');
    if (toggleIcon) {
        toggleIcon.addEventListener('click', function() {
            var passwordField = document.getElementById('password');
			var confirmpasswordField = document.getElementById('confirmpassword');
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
				confirmpasswordField.type = 'text';
            } else {
                passwordField.type = 'password';
				confirmpasswordField.type = 'password';
            }
        });
    }

	const logout_btn = document.querySelector("#logout-div svg");
	if (!logout_btn) return;
	logout_btn.addEventListener("click", function() {
		doLogout();
	})
});

function isValidEmail(email) {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailPattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {
	const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;
	return phonePattern.test(phoneNumber);
}

function hasNoDashes(phoneNumber) {
	const phonePattern = /^\d{10}$/;
	return phonePattern.test(phoneNumber);
}