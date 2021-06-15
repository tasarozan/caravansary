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

module.exports = router
