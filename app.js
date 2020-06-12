const path = require('path')
const express = require('express')
const userController = require('./controllers/userController')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res) => {
	res.render('index')
})

module.exports = app
