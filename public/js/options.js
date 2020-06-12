var buttons = document.querySelectorAll('.option')
var timer = document.getElementById('timer')

var time = 10
timer.innerHTML = time

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', sendEmitDraw)
}

clearInterval(timerInterval)
var timerInterval = setInterval(() => {
	time--
	timer.innerHTML = time
	if (time <= 0) {
		sendEmitDraw()
	}
}, 1000)

function sendEmitDraw(e) {
	clearInterval(timerInterval)
	let option = e ? e.target.textContent : buttons[0].textContent
	socket.emit('emit-draw', {
		option,
	})
}
