const express = require("express")
const dotenv = require('dotenv').config()
const app = express()
const contactsRoutes = require('./routes/contactsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const { errorHandler } = require('./middleware/errorHandler')
const connectDb = require("./config/dbConnection")

connectDb();
const PORT = process.env.PORT

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Express API running on PORT: ${PORT}`)
})

app.use(errorHandler)
app.get('/',(req,res) => {
    res.status(200).json({message: `Hi this is home page`})
});

app.use('/api/contact', contactsRoutes)
app.use('/api/user', usersRoutes)