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
  const ozan = await User.create({ firstName: 'ozan', lastName: 'Tasar', age: 24, location: 'Istanbul' })
  const thuan = await User.create({ firstName: 'thuan', lastName: 'Vo', age: 31, location: 'Hannover' })

  await ozan.createVan('PrivateJet', 'Swift', 'Edge', 2018, 3, 'Istanbul', '$150.00')
  await thuan.createBookRequest(ozan.listings[0])

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

router.get('/:userId/:bookRequestId', async (req, res) => {
  const bookRequest = await BookRequest.findById(req.params.bookRequestId)
  res.send(bookRequest)
})

router.get('/:userId/:vanBuddyRequestId', async (req, res) => {
  const vanBuddyRequest = await VanBuddyRequest.findById(req.params.vanBuddyRequestId)
  res.send(vanBuddyRequest)
})

router.patch('/:userId/:bookRequestId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const bookRequest = await BookRequest.findById(req.params.bookRequestId)

  await user.respondToBookRequest(bookRequest, req.body.approvalStatus)

  res.send(bookRequest)
})
router.patch('/:userId/:vanBuddyRequestId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const vanBuddyRequest = await VanBuddyRequest.findById(req.params.vanBuddyRequestId)

  await user.respondToVanBuddyRequest(vanBuddyRequest, req.body.approvalStatus)

  res.send(vanBuddyRequest)
})
module.exports = router
