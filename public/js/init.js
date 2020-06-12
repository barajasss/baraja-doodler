let elementWidth = window.innerWidth - 30
let elementHeight = window.innerHeight - 350

// get username

let form = document.getElementById('form')
form.onsubmit = e => {
	e.preventDefault()
	socket.emit('add-user', {
		from: document.getElementById('form__name').value,
	})
}

if (typeof timerInterval !== 'undefined') clearInterval(timerInterval)

socket.on('connect', e => {})

socket.on('full', () => {
	document.body.innerHTML = 'Sorry already 2 players are playing it.'
})

socket.on('player-left', e => {
	alert(e.name + ' left the game...')
	console.log(e.name + ' left the game...')
	window.location.reload('/')
})

socket.on('guess', async e => {
	await prepareGuessWorld({
		name: e.name,
		optionLength: e.optionLength,
	})
})

socket.on('draw', async e => {
	await prepareDrawingWorld({
		option: e.option,
		name: e.name,
	})
})

socket.on('wait', () => {
	document.body.innerHTML = 'Waiting for the other player to join...'
})
socket.on('draw-options', async e => {
	await prepareDrawOptionsWorld(e.options)
	socket.off('wait')
})

socket.on('wait-guess', async e => {
	await prepareWaitGuessWorld(e.name)
})

async function prepareDrawingWorld(e) {
	let titleEl = `<h2>Draw The Word - ${e.option}</h2>`
	let contentEl = `
		<button id="clear-btn">Clear</button>
		<canvas 
			id="canvas" 
			width="${elementWidth}" 
			height="${elementHeight}"
		></canvas>
	`
	let canvasJS = await addScript('/js/canvas.js')
	let canvasScript = document.createElement('script')
	canvasScript.innerHTML = canvasJS

	document.body.innerHTML = ''
	document.body.innerHTML = `${titleEl}${contentEl}`
	await prepareChatWorld(e.name)
	document.body.appendChild(canvasScript)
}

async function prepareGuessWorld(e) {
	let titleEl = `<h2>Guess the drawing by : ${e.name}</h2>`
	let contentEl = `
		<img 
			id="image"
			src="" 
			width="${elementWidth}" 
			height="${elementHeight}"
			alt="guess-image"
		>`
	contentEl += '<div class="underscore">'
	for (let i = 0; i < e.optionLength; i++) {
		contentEl += '<span class="underscore__el">_</span>'
	}
	contentEl += '</div>'
	contentEl += `
		<div class="keyboard">
			<div class="keyboard__keyboard-row keyboard-row--1">
				<div class="key">Q</div>
				<div class="key">W</div>
				<div class="key">E</div>
				<div class="key">R</div>
				<div class="key">T</div>
				<div class="key">Y</div>
				<div class="key">U</div>
				<div class="key">I</div>
				<div class="key">O</div>
				<div class="key">P</div>
			</div>
			<div class="keyboard__keyboard-row keyboard-row--2">
				<div class="key">A</div>
				<div class="key">S</div>
				<div class="key">D</div>
				<div class="key">F</div>
				<div class="key">G</div>
				<div class="key">H</div>
				<div class="key">J</div>
				<div class="key">K</div>
				<div class="key">L</div>
			</div>
			<div class="keyboard__keyboard-row keyboard-row--3">
				<div class="key">Z</div>
				<div class="key">X</div>
				<div class="key">C</div>
				<div class="key">V</div>
				<div class="key">B</div>
				<div class="key">N</div>
				<div class="key">M</div>
				<div class="key key--special key--backspace">x</div>
				<div class="key key--special key--send">Send</div>
			</div>
		</div>
	`
	let imageJS = await addScript('/js/image.js')
	let imageScript = document.createElement('script')
	imageScript.innerHTML = imageJS

	document.body.innerHTML = ''
	document.body.innerHTML = `${titleEl} ${contentEl}`
	await prepareChatWorld(e.name)
	document.body.appendChild(imageScript)
}

async function prepareWaitGuessWorld(name) {
	document.body.innerHTML = ''
	document.body.innerHTML = `<h1>Waiting for ${name} to pick a word...</h1>`
}
async function prepareDrawOptionsWorld(drawOptions) {
	document.body.innerHTML = ''
	document.body.innerHTML += `<h2>Pick a word - <span id="timer"></span></h2>`
	drawOptions.forEach(el => {
		document.body.innerHTML += `<button class="option">${el}</button>`
	})
	let optionsJS = await addScript('/js/options.js')
	let optionsScript = document.createElement('script')
	optionsScript.innerHTML = optionsJS
	document.body.appendChild(optionsScript)
}

async function prepareChatWorld(name) {
	document.body.innerHTML += `
		<div class="player-container">
			<div id="player-1" class="player">
				<div class="user-container">
					<img src="/img/user-1.png" class="user-img">
					<h4 class="user-name">You</h4>
				</div>
				<div id="chat-1" class="chat">dafdafd</div>
			</div>
			<div id="player-2" class="player">
				<div class="user-container">
					<img src="/img/user-2.png" class="user-img">
					<h4 class="user-name">${name}</h4>
				</div>
				<div id="chat-2" class="chat">adsfdfds</div>
			</div>
		</div>
	`
	let chatJS = await addScript('/js/chat.js')
	let chatScript = document.createElement('script')
	chatScript.innerHTML = chatJS
	document.body.appendChild(chatScript)
}

async function addScript(url) {
	const res = await fetch(url)
	const data = await res.text()
	return data
}
