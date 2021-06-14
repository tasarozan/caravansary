const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Van = require('../models/van')

router.get('/', async (req, res) => {
  res.send(await Van.find({}))
})

router.get('/:vanId', async (req, res) => {
  const van = await Van.findById(req.params.vanId)

  res.send(van)
})

router.post('/:vanId/book-requests', async (req, res) => {
  const van = await Van.findById(req.params.vanId)
  const customer = await User.findById(req.body.customer)
  const bookRequest = await customer.createBookRequest(van, customer)

  res.send(bookRequest)
})

module.exports = router
