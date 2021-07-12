const express = require('express')
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()

/* GET home page. */
router.get('/session', (req, res) => {
  res.send(req.user)
})

router.post('/', async (req, res) => {
  const { firstName, lastName, age, location, email, password } = req.body

  const user = new User({ firstName, lastName, age, location, email })

  await user.setPassword(password)
  await user.save()

  res.send(user)
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.user)
})

router.delete('/session', async (req, res, next) => {
  await req.logout()
  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
