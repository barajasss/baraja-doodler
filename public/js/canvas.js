var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var clearBtn = document.getElementById('clear-btn')

var paint = false
var dx = -canvas.offsetLeft
var dy = -canvas.offsetTop
var prevX
var prevY

ctx.strokeStyle = 'red'
ctx.lineWidth = 5

canvas.addEventListener('mousedown', downHandler)

canvas.addEventListener('mousemove', moveHandler)

document.addEventListener('mouseup', upHandler)

canvas.addEventListener('mouseenter', function (e) {
	prevX = e.clientX || e.touches[0].clientX
	prevY = e.clientY || e.touches[0].clientY
})
canvas.addEventListener('touchstart', downHandler)

canvas.addEventListener('touchmove', moveHandler)

document.addEventListener('touchend', upHandler)

clearBtn.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	updateOtherCanvas(canvas.toDataURL())
})

function draw(e) {
	let x = e.clientX || e.touches[0].clientX
	let y = e.clientY || e.touches[0].clientY
	ctx.beginPath()
	ctx.moveTo(prevX + dx, prevY + dy)
	ctx.lineTo(x + dx, y + dy)
	ctx.closePath()
	ctx.stroke()
	prevX = x
	prevY = y
}

function downHandler(e) {
	paint = true
	prevX = e.clientX || e.touches[0].clientX
	prevY = e.clientY || e.touches[0].clientY
}

function moveHandler(e) {
	if (paint) {
		draw(e)
		updateOtherCanvas(canvas.toDataURL())
	}
}

function upHandler() {
	paint = false
}

function updateOtherCanvas(data) {
	socket.emit('image-url', {
		imageUrl: data,
	})
}
