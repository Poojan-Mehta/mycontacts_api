const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

const getAllContact = asyncHandler(async (req, res) => {
    console.log(req.user)
    const contacts = await Contact.find({user_id: req.user.id});
    console.log(contacts);
    res.status(200).json({message: `Get all contacts`, result: contacts})
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found..")
    }
    res.status(200).json({message: `Get contact information`, result: contact})
})

const addContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("Something is missing");
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    res.status(200).json({message: `New contact created`, result: contact})
})

const updateContact = asyncHandler(async (req, res) => {
    /** find contact is exists or not */
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({message: `Update contact`, result: updateContact})
})

const deleteContact = asyncHandler(async (req, res) => {
    /** find contact is exists or not */
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    const deleteContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({message: `Delete contact`, result: deleteContact})
})

module.exports = { getAllContact, getContact, addContact, updateContact, deleteContact }