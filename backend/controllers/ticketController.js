const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")

// @desc    Get  user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get User using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json(tickets)
})
// @desc    Create New Ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error("Please add a product and description")
  }
  // Get User using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  })
  res.status(200).json(ticket)
})

// @desc    Get User Ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Get User using the id and the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Get ticket
  const ticket = await Ticket.findById(id)
  // Check to see if ticket was found
  if (!ticket) {
    res.status(401)
    throw new Error("Ticket not found")
  }
  // check to see if ticket user matches logged in user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }
  res.status(200).json(ticket)
})

// @desc    Delete User Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Get User using the id and the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Get ticket
  const ticket = await Ticket.findById(id)
  // Check to see if ticket was found
  if (!ticket) {
    res.status(401)
    throw new Error("Ticket not found")
  }
  // check to see if ticket user matches logged in user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }
  // Delete ticket
  await ticket.remove()
  res.status(200).json({ success: true })
})

// @desc    Update User Ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Get User using the id and the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Get ticket
  const ticket = await Ticket.findById(id)
  // Check to see if ticket was found
  if (!ticket) {
    res.status(401)
    throw new Error("Ticket not found")
  }
  // check to see if ticket user matches logged in user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }
  // Update ticket
  const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
}
