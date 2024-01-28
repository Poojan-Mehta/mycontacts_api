const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { use } = require("../routes/contactsRoutes")

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json({message: `Get all users`, result: users})
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please fill all the mendatory fields.")
    }

    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered with this email")
    }

    //bcrypt password
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username, email, password: hashPassword
    })

    if(user){
        res.status(201) //resource created status code
        res.json({message: `User successfully registered`, data: {_id: user._id, email: user.email}})
    }else{
        res.status(400)
        throw new Error("Something went wrong, data has not stored")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("Please fill all the mendatory fields.")
    }

    const userAvailable = await User.findOne({email})
    
    const password_compare = await bcrypt.compare(password, userAvailable.password)
    if(userAvailable && password_compare){
       //create jwt token
       const accessToken = jwt.sign({
        user: {
            username: userAvailable.username,
            email: userAvailable.email,
            id: userAvailable.id
        }
       }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "15m"
       })

       res.status(200)
       res.json({accessToken: accessToken})
    }else{
        res.status(400)
        throw new Error("User not registered.")
    }

    
    //res.status(200).json({message: `Login`})
})

module.exports = { registerUser, loginUser, getAllUsers}