const urlBase = 'http://gerberthegoat.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

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
					alert("Username not found or incorrect password");
				

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
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		console.log(userId);
	}
}

function doRegister() {

	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

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
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchContact()
{
	let srch = document.getElementById("search").value;
	
	let colorList = "";

	let tmp = {
		search: srch,
		userId: userId
	};

	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContact.' + extension;
	
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
					console.log(jsonObject.results[i].Name, jsonObject.results[i].Email, jsonObject.results[i].Phone);
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
					tmp.innerHTML = jsonObject.error;
					results_area.appendChild(tmp);
					return;
				}

				for(let i = 0; i < jsonObject.contacts.length; i++) {
					tmp = document.createElement('p');
					tmp.innerHTML = `${jsonObject.contacts[i].Name} ${jsonObject.contacts[i].Email} ${jsonObject.contacts[i].Phone}`;
					results_area.appendChild(tmp);
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