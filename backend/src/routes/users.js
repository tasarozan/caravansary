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
  const userToCreate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    location: req.body.location,
  }
  const user = await User.create(userToCreate)

  res.send(user)
})

router.get('/initialize', async (req, res) => {
  const ozan = new User({
    firstName: 'Ozan',
    lastName: 'Tasar',
    age: 24,
    location: 'Istanbul',
    email: 'ozan@whatever.com',
  })
  await ozan.setPassword('test')
  await ozan.save()

  const thuan = new User({
    firstName: 'Thuan',
    lastName: 'Vo',
    age: 31,
    location: 'Hannover',
    email: 'thuan@nonsense.com',
  })
  await thuan.setPassword('password')
  await thuan.save()

  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.send(user)
  else res.sendStatus(404)
})

module.exports = router
