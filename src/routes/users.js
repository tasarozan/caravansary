const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Van = require('../models/van')
const BookRequest = require('../models/book-request')
const VanBuddyRequest = require('../models/van-buddy-request')

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
  const ozan = await User.create({ firstName: 'Ozan', lastName: 'Tasar', age: 24, location: 'Istanbul' })
  const thuan = await User.create({ firstName: 'Thuan', lastName: 'Vo', age: 31, location: 'Hannover' })

  await ozan.createVan('PrivateJet', 'Swift', 'Edge', 2018, 3, 'Istanbul', '$150.00')

  res.send(ozan, thuan)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

router.post('/:userId/van-buddy-requests', async (req, res) => {
  const receiver = await User.findById(req.params.userId)
  const sender = await User.findById(req.body.sender)
  const vanBuddyRequest = await sender.createVanBuddyRequest(receiver, sender)

  if (vanBuddyRequest) res.send(vanBuddyRequest)
  else res.sendStatus(404)
})

router.get('/:userId/book-requests/:bookRequestId', async (req, res) => {
  const bookRequest = await BookRequest.findById(req.params.bookRequestId)
  res.send(bookRequest)
})

router.get('/:userId/van-buddy-requests/:vanBuddyRequestId', async (req, res) => {
  const vanBuddyRequest = await VanBuddyRequest.findById(req.params.vanBuddyRequestId)
  res.send(vanBuddyRequest)
})

router.patch('/:userId/book-requests/:bookRequestId/approval', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const bookRequestId = await BookRequest.findById(req.params.bookRequestId)
  const van = await Van.findById(bookRequestId.van)

  if (user.listings.includes(van)) return res.sendStatus(401)

  const bookRequest = await BookRequest.findByIdAndUpdate(req.params.bookRequestId, {
    isApproved: req.body.isApproved,
  })

  if (req.body.isApproved) bookRequest.customer.rentVan(van, bookRequest)

  return res.send(bookRequest)
})

router.patch('/:userId/van-buddy-requests/:vanBuddyRequestId', async (req, res) => {
  const receiver = await User.findById(req.params.userId)
  const vanBuddyRequestId = await VanBuddyRequest.findById(req.params.vanBuddyRequestId)

  if (vanBuddyRequestId.reciver != receiver) return res.sendStatus(401)

  const vanBuddyRequest = await VanBuddyRequest.findByIdAndUpdate(req.params.vanBuddyRequestId, {
    isApproved: req.body.isApproved,
  })

  return res.send(vanBuddyRequest)
})

module.exports = router
