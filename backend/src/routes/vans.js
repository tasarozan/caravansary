const express = require('express')

const router = express.Router()

const Van = require('../models/van')

router.get('/', async (req, res) => {
  res.send(await Van.find({}))
})

router.get('/:vanId', async (req, res) => {
  const van = await Van.findById(req.params.vanId)

  res.send(van)
})

router.post('/', async (req, res) => {
  const { user } = req
  const vanToCreate = {
    type: req.body.type,
    location: req.body.location,
    price: req.body.price,
  }
  const van = await user.createVan(vanToCreate)

  res.send(van)
})

module.exports = router
