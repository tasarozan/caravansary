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

router.post('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const vanToCreate = {
    type: req.body.type,
    location: req.body.location,
    price: req.body.price,
  }
  const van = await user.createVan(vanToCreate)

  res.send(van)
})

module.exports = router
