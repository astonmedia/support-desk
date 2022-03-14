const express = require("express")
const dotenv = require("dotenv").config()
const errorhandler = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const colors = require("colors")
const PORT = process.env.PORT || 8000
const userRoutes = require("./routes/userRoutes")

// Connect to Database
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", userRoutes)

app.use(errorhandler)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
