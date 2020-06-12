const app = require('./app')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socketController = require('./controllers/socketController')

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3000

io.on('connection', socketController)

server.listen(port, '127.0.0.1', () =>
	console.log(`Server listening at port:${port}`)
)
