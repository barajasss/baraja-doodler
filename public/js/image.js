var keys = document.querySelectorAll('.key')
var keyBackspace = document.querySelector('.key--backspace')
var keySend = document.querySelector('.key--send')
var underscoreEl = document.querySelectorAll('.underscore__el')
var word = ''

var cursor = 0

for (let i = 0; i < keys.length; i++) {
	;(function (i) {
		keys[i].addEventListener('click', function (e) {
			if (
				keys[i].classList.contains('key--backspace') ||
				keys[i].classList.contains('key--send')
			) {
				return
			}

			updateText(e)
		})
	})(i)
}

socket.on('image-url', e => {
	document.getElementById('image').src = e.imageUrl
})

keyBackspace.addEventListener('click', function () {
	if (cursor > 0) {
		underscoreEl[cursor - 1].textContent = '_'
		cursor--
		word = word.slice(0, -1)
	}
})

keySend.addEventListener('click', function () {
	if (word) {
		cursor = 0
		for (let i = 0; i < underscoreEl.length; i++) {
			underscoreEl[i].textContent = '_'
		}
		socket.emit('check-word', {
			word: word,
		})
		socket.emit('send-message', {
			msg: word,
		})
	}
})

function updateText(e) {
	word = ''
	if (cursor < underscoreEl.length) {
		underscoreEl[cursor].textContent = e.target.textContent
		cursor++
	}
	for (let i = 0; i < cursor; i++) {
		word += underscoreEl[i].textContent
	}
}
