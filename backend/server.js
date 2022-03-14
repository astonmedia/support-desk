const express = require("express")
const dotenv = require("dotenv").config()
const errorhandler = require("./middleware/errorMiddleware")
const PORT = process.env.PORT || 8000
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", userRoutes)

app.use(errorhandler)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
