const path = require('path')
const express = require('express')
const userController = require('./controllers/userController')

const app = express()
app.enable('trust proxy')
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', 'views')

// render main index file ...

app.get('/', (req, res) => {
	res.render('index')
})

module.exports = app
