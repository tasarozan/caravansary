const express = require('express')
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()

/* GET home page. */
router.get('/session', (req, res) => {
  res.send(req.session)
})

router.post('/', async (req, res) => {
  const { firstName, lastName, age, location, email, password } = req.body

  const user = new User({ firstName, lastName, age, location, email })
  await user.setPassword(password)
  await user.save()

  return user
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.user)
})

router.delete('/session', (req, res) => {
  req.logout()
  res.send(true)
})

module.exports = router
