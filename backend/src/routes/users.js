const express = require('express')

const router = express.Router()

const User = require('../models/user')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.firstName) {
    query.firstName = req.query.firstName
  }
  if (req.query.location) {
    query.location = req.query.location
  }
  res.send(await User.find(query))
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)

  res.send(user)
})

router.get('/initialize', async (req, res) => {
  const ozan = await User.create({ firstName: 'Ozan', lastName: 'Tasar', age: 24, location: 'Istanbul' })
  const thuan = await User.create({ firstName: 'Thuan', lastName: 'Vo', age: 31, location: 'Hannover' })

  res.send(ozan, thuan)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
