const path = require("path")
const express = require("express")
const dotenv = require("dotenv").config()
const errorhandler = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const colors = require("colors")
const PORT = process.env.PORT || 8000
const userRoutes = require("./routes/userRoutes")
const ticketRoutes = require("./routes/ticketRoutes")
const noteRoutes = require("./routes/noteRoutes")
const cors = require("cors")

// Connect to Database
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/tickets", ticketRoutes)
app.use("/api/notes", noteRoutes)

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  )
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" })
  })
}

app.use(errorhandler)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
