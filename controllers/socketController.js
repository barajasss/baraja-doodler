const userController = require('./userController')
let toggle = false
let option = ''
// only max two players are allowed

const drawOptions = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
]

// player 1 is the drawer
// player 2 is the guesser

let player1
let player2

module.exports = socket => {
	socket.on('add-user', e => {
		if (userController.getTotalUsers() < 2) {
			userController.addUser(e.from, socket)

			console.log(
				'Users',
				userController.getUsers().map(el => el.name)
			)

			if (userController.getTotalUsers() === 2) {
				// player1 = Math.floor(Math.random() * 2)
				// if (player1 === 1) player2 = 0
				// else player2 = 1
				toggle = !toggle
				if (toggle) {
					player1 = userController.getUsers()[1]
					player2 = userController.getUsers()[0]
				} else {
					player1 = userController.getUsers()[0]
					player2 = userController.getUsers()[1]
				}

				player1.socket.emit('draw-options', {
					options: [
						drawOptions[
							Math.floor(Math.random() * drawOptions.length)
						],
						drawOptions[
							Math.floor(Math.random() * drawOptions.length)
						],
						drawOptions[
							Math.floor(Math.random() * drawOptions.length)
						],
					],
				})
				player2.socket.emit('wait-guess', {
					name: player1.name,
				})
			} else {
				return socket.emit('wait')
			}
		} else {
			return socket.emit('full')
		}
	})

	socket.on('image-url', e => {
		socket.broadcast.emit('image-url', {
			imageUrl: e.imageUrl,
		})
	})

	socket.on('disconnect', () => {
		if (
			userController.getTotalUsers() <= 2 &&
			userController.getTotalUsers() > 0
		) {
			const user = userController
				.getUsers()
				.find(el => el.socket.id === socket.id)
			if (user) {
				socket.broadcast.emit('player-left', {
					name: user.name,
				})
			}
		}
		userController.deleteUser(socket)
		console.log('Total users:', userController.getTotalUsers())
	})
	socket.on('emit-draw', e => {
		option = e.option
		socket.emit('draw', {
			option,
			name: player2.name,
		})
		socket.broadcast.emit('guess', {
			name: player1.name,
			optionLength: option.length,
		})
	})
	socket.on('check-word', e => {
		if (e.word.toLowerCase() === option.toLowerCase()) {
			userController.deleteAllUsers()
			socket.emit('won')
			socket.broadcast.emit('won')
		}
	})
	socket.on('send-message', e => {
		socket.broadcast.emit('message', {
			msg: e.msg,
		})
		socket.emit('message-sent', {
			msg: e.msg,
		})
	})
}
