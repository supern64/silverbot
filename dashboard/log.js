const url = "ws://localhost:8000"
const el = document.getElementsByClassName("box")[0]
const el2 = document.getElementById("status")
function br() {
	var br = document.createElement("BR")
	el.appendChild(br)
}
function pushMessage(level, message) {
	var date = new Date()
	var formattedTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
	var tn = document.createTextNode("[" + formattedTime + "] [" + level + "] " + message)
	el.appendChild(tn)
	br()
}
function setStatus(status) {
	el2.innerHTML = status.toUpperCase()
}
pushMessage("INFO", "Trying to connect to WebSocket server... (" + url + ")")
try {
	var ws = new WSClient(url)
} catch(e) {
	pushMessage("ERROR", "Failed to connect to WebSocket server.")
	throw e
}
ws.on("open", () => {
	pushMessage("INFO", "Connected successfully to WebSocket server")
})
ws.on("message", (message) => {
	try {
		var data = JSON.parse(message)
	} catch(e) {
		pushMessage("DEBUG", "Message received is not valid JSON.")
		console.info("%c[WebSocket]", "color: #6c0196", message.toString())
		return
	}
	pushMessage(data.level.toUpperCase(), data.text)
	console.info("%c[WebSocket]", "color: #6c0196", data.level.toUpperCase() + ": " + data.text)
})
ws.on("close", (code, reason) => {
	if (!reason || reason == "") {
		var reason = WSCloseDescription[code]
		if (!reason) {
			var reason = "Unknown"
		}
	}
	pushMessage("INFO", "WebSocket connection closed with reason '" + reason + "' with code " + code)
})
ws.on("error", (err) => {
	pushMessage("ERROR", "An error occured in WebSocket")
	console.error(err)
})