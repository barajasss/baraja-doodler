let users = []
let firstUserSet = false

exports.addUser = (name, socket) => {
	users.push({ name, socket })
}

exports.deleteUser = socket => {
	const user = users.find(el => el.socket.id === socket.id)
	if (user) {
		users = users.filter(el => el.socket.id !== socket.id)
		console.log('deleted ', user.name)
		return socket.id
	}
	return null
}

exports.deleteAllUsers = () => {
	users = []
}

exports.getUsers = () => {
	return users
}

exports.getTotalUsers = () => {
	return users.length
}

exports.firstUserSet = firstUserSet
