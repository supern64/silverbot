const url = "ws://localhost:8000"
const el = document.getElementsByClassName("box")[0]
const el2 = document.getElementById("status")
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}
function br() {
	var br = document.createElement("BR")
	el.appendChild(br)
}
function pushMessage(level, message) {
	var date = new Date()
	var formattedTime = date.getHours().pad() + ":" + date.getMinutes().pad() + ":" + date.getSeconds().pad()
	var tn = document.createTextNode("[" + formattedTime + "] [" + level + "] " + message)
	el.appendChild(tn)
	br()
	el.scrollTop = el.scrollHeight
}
function setStatus(status) {
	el2.innerHTML = status.toUpperCase()
	switch (status) {
		case "ready":
			el2.style.color = "#67ff2b"
			break
		case "starting":
			el2.style.color = "#f3ff16"
			break
		case "error":
			el2.style.color = "#ea1c1c"
			break
		default:
			el2.style.color = "#a89999"
			break
	}
}
pushMessage("INFO", "Trying to connect to WebSocket server... (" + url + ")")
console.info("%c[WebSocket]", "color: #6c0196", "Connecting to WebSocket server at " + url)
try {
	var ws = new WSClient(url)
} catch(e) {
	pushMessage("ERROR", "Failed to connect to WebSocket server.")
	console.error("%c[WebSocket]", "color: #6c0196", "Failed to connect to WebSocket server at " + url)
	throw e
}
ws.on("open", () => {
	pushMessage("INFO", "Connected successfully to WebSocket server")
	console.info("%c[WebSocket]", "color: #6c0196", "Connected to WebSocket server at " + url)
	setStatus("unknown")
})
ws.on("message", (message) => {
	try {
		var data = JSON.parse(message)
	} catch(e) {
		pushMessage("DEBUG", "Message received is not valid JSON.")
		return
	}
	switch(data.type) {
		case "message":
			pushMessage(data.level.toUpperCase(), data.text)
			break
		case "status":
			setStatus(data.status)
			pushMessage("INFO", "Status changed to " + data.status)
			break
		default:
			if (!data.type) {
				pushMessage("DEBUG", "Message received does not have a type attribute.")
			} else {
				pushMessage("DEBUG", "Type is not valid")
			}
	}
})
ws.on("close", (code, reason) => {
	if (!reason || reason == "") {
		var reason = WSCloseDescription[code]
		if (!reason) {
			var reason = "Unknown"
		}
	}
	pushMessage("INFO", "WebSocket connection closed with reason '" + reason + "' with code " + code)
	console.info("%c[WebSocket]", "color: #6c0196", "WebSocket connection closed with reason '" + reason + "' with code " + code)
})
ws.on("error", (err) => {
	pushMessage("ERROR", "An error occured in WebSocket")
	console.error("%c[WebSocket]", "color: #6c0196", "An error occured in WebSocket")
})
