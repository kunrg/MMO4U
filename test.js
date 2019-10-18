var captchakey = 'khcymg8rctjzxry6pdflbvnh7jndxwvp';
var svg = document.querySelector('svg');
var img = new Image(150, 50);
var canvas = document.createElement("canvas");
	canvas.width = 150;
    canvas.height = 50;
// get svg data
var xml = new XMLSerializer().serializeToString(svg);

// make it base64
var svg64 = btoa(xml);
var b64Start = 'data:image/svg+xml;base64,';

// prepend a "header"
var image64 = b64Start + svg64;

// set it as the source of the img element
img.src = image64;

// draw the image onto the canvas
canvas.getContext('2d').drawImage(img, 0, 0);

var dt = canvas.toDataURL('image/png'); 
dt = dt.replace("data:image/png;base64,", "");



var idcapcha ='';
var http = new XMLHttpRequest();
var url = 'https://azcaptcha.com/in.php';
var params = 'method=base64&key='+captchakey+'&body='+dt;
http.open('POST', url, true);

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText.split("|")[1]);
		idcapcha = http.responseText.split("|")[1];	
		
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("POST", 'https://cors-anywhere.herokuapp.com/https://azcaptcha.com/res.php?action=get&key='+captchakey+'&id='+idcapcha, true); // true for asynchronous 
			//Send the proper header information along with the request
			xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xmlHttp.onreadystatechange = function() { 
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					console.log(xmlHttp.responseText);
			}
			xmlHttp.send(null);		
    }
}
http.send(params);
