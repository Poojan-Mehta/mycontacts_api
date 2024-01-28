const express = require('express')
const { registerUser, loginUser, getAllUsers} = require('../controllers/userController')
const Router = express.Router()

Router.get('/', getAllUsers)

Router.post('/register', registerUser)

Router.post('/login', loginUser)

module.exports = Router