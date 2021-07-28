const express = require('express')

const router = express.Router()

const User = require('../models/user')
const VanBuddyRequest = require('../models/van-buddy-request')

router.post('/', async (req, res) => {
  const { receiver } = req.body
  const { _id } = req.user

  const recipient = await User.findById(receiver)
  const user = await User.findById(_id)
  const vanBuddyRequest = await user.createVanBuddyRequest(recipient)

  if (vanBuddyRequest) res.send(vanBuddyRequest)
  else res.sendStatus(404)
})

router.patch('/', async (req, res) => {
  const { _id } = req.user
  const { vanBuddyAvailability } = req.body
  const user = await User.findByIdAndUpdate(_id, { vanBuddyAvailability }, { new: true })

  res.send(user)
})

router.get('/:vanBuddyRequestId', async (req, res) => {
  const vanBuddyRequest = await VanBuddyRequest.findById(req.params.vanBuddyRequestId)
  res.send(vanBuddyRequest)
})

router.patch('/:vanBuddyRequestId', async (req, res) => {
  const { approval } = req.body
  const vanBuddyRequest = await VanBuddyRequest.findByIdAndUpdate(req.params.vanBuddyRequestId, {
    approval,
  })

  return res.send(vanBuddyRequest)
})

module.exports = router
