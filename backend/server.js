const express = require("express")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 8000
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use("/api/users", userRoutes)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
