const el2 = document.getElementById("status")
const url = "ws://localhost:8000"
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
var ws = new WSClient(url)
ws.on("open", () => {
	setStatus("unknown")
})
ws.on("message", (message) => {
	try {
		var data = JSON.parse(message)
	} catch(e) {
		return
	}
	if (data.type == "status") {
		setStatus(data.status)
	}
})
