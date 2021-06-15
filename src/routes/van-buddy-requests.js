const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Van = require('../models/van')

router.post('/', async (req, res) => {
  const receiver = await User.findById(req.body.receiver)
  const sender = await User.findById(req.body.sender)
  const vanBuddyRequest = await sender.createVanBuddyRequest(receiver)

  if (vanBuddyRequest) res.send(vanBuddyRequest)
  else res.sendStatus(404)
})

router.get('/:vanBuddyRequestId', async (req, res) => {
  const vanBuddyRequest = await VanBuddyRequest.findById(req.params.vanBuddyRequestId)
  res.send(vanBuddyRequest)
})

router.patch('/:vanBuddyRequestId', async (req, res) => {
  const receiver = await User.findById(req.body.receiver)
  const vanBuddyRequestId = await VanBuddyRequest.findById(req.params.vanBuddyRequestId)

  if (vanBuddyRequestId.receiver != receiver) return res.sendStatus(401)

  const vanBuddyRequest = await VanBuddyRequest.findByIdAndUpdate(req.params.vanBuddyRequestId, {
    isApproved: req.body.isApproved,
  })

  return res.send(vanBuddyRequest)
})

module.exports = router
