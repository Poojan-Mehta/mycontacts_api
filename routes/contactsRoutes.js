const express = require('express')
const { getAllContact, getContact, addContact, updateContact, deleteContact } = require('../controllers/contactControllers')
const Router = express.Router()
const validateToken = require("../middleware/validateTokenHandler")

Router.use(validateToken)
Router.get('/', getAllContact)

Router.get('/:id', getContact)

Router.post('/', addContact)

Router.put('/:id', updateContact)

Router.delete('/:id', deleteContact)

module.exports = Router