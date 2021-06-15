const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Van = require('../models/van')

router.post('/', async (req, res) => {
  const van = await Van.findById(req.body.van)
  const customer = await User.findById(req.body.customer)
  const bookRequest = await customer.createBookRequest(van, customer)

  res.send(bookRequest)
})

router.get('/:bookRequestId', async (req, res) => {
  const bookRequest = await BookRequest.findById(req.params.bookRequestId)
  res.send(bookRequest)
})

router.patch('/:bookRequestId', async (req, res) => {
  const bookRequestId = await BookRequest.findById(req.params.bookRequestId)
  const user = await User.findById(bookRequestId.van.owner)
  const van = await Van.findById(bookRequestId.van)

  if (!user.listings.includes(van)) return res.sendStatus(401)

  const bookRequest = await BookRequest.findByIdAndUpdate(req.params.bookRequestId, {
    isApproved: req.body.isApproved,
  })

  if (req.body.isApproved) bookRequest.customer.rentVan(van, bookRequest)

  return res.send(bookRequest)
})

module.exports = router
