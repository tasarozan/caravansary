const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Van = require('../models/van')
const BookRequest = require('../models/book-request')

router.post('/', async (req, res) => {
  const van = await Van.findById(req.body.van)
  const customer = req.user

  const bookRequest = await customer.createBookRequest(van)

  res.send(bookRequest)
})

router.get('/:bookRequestId', async (req, res) => {
  const bookRequest = await BookRequest.findById(req.params.bookRequestId)
  res.send(bookRequest)
})

router.patch('/:bookRequestId', async (req, res) => {
  const bookRequest = await BookRequest.findById(req.params.bookRequestId)
  const user = req.user
  const van = await Van.findById(bookRequest.van._id)

  if (!user._id.equals(van.owner._id)) return res.sendStatus(401)

  await bookRequest.update({ approval: req.body.approval })
  await bookRequest.save()

  if (req.body.approval) bookRequest.customer.rentVan(van, bookRequest)

  res.send(bookRequest)
})

module.exports = router
