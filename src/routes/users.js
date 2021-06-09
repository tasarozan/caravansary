const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Van = require('../models/van')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }
  if (req.query.age) {
    query.age = req.query.age
  }
  res.send(await User.find(query))
})

router.get('/initialize', async (req, res) => {
  const ozan = await User.create({ firstName: 'ozan', lastName: 'Tasar', age: 24, location: 'Istanbul' })

  await ozan.createVan('PrivateJet', 'Swift', 'Edge', 2018, 3, 'Istanbul', '$150.00')

  res.send(ozan)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

router.get('/:userId/:vanId', async (req, res) => {
  const van = await Van.findById(req.params.vanId)
  res.send(van)
})

module.exports = router
