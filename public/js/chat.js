var chat1 = document.getElementById('chat-1')
var chat2 = document.getElementById('chat-2')

socket.on('message', e => {
	chat2.textContent = e.msg + ' ?'
	animateChat(chat2)
})
socket.on('message-sent', e => {
	chat1.textContent = e.msg + ' ?'
	animateChat(chat1)
})

socket.on('won', e => {
	socket.off('wait')
	document.body.innerHTML = `
		<div
			style="color: #222; background-color: yellowgreen; margin: 5px; padding: 25px; border-radius: 5px; font-size: 1.2rem">
			<h1 style="color: #eef;">Thank you for playing Baraja Doodler</h1>
			<br>
			<button style="margin-left: 0; margin-top: 15px;" onclick="window.location.reload()">Play Again</button>
		</div>
	`
})

function animateChat(chat) {
	if (chat.classList.contains('animate')) {
		return
	}
	chat.classList.add('animate')
	setTimeout(() => {
		chat.classList.remove('animate')
	}, 2000)
}
