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
  const van = await user.createVan(req.body.type, req.body.location, req.body.price)

  res.send(van)
})

module.exports = router
