const request = require('supertest')
const app = require('../src/app')

describe('Users endpoints', () => {
  it('post request to /users should create a user', async () => {
    const userToCreate = {
      firstName: 'SomeName',
      lastName: 'Something',
      age: 27,
      location: 'Istanbul',
    }

    const createdUser = (await request(app).post('/users').send(userToCreate)).body
    expect(createdUser.firstName).toBe(userToCreate.firstName)
    expect(createdUser.age).toBe(userToCreate.age)
    expect(createdUser.bio).toBe(userToCreate.bio)
  })

  it('get request to /users should list users', async () => {
    const userList = (await request(app).get('/users')).body
    const usersExist = userList.length > 0

    expect(usersExist).toBe(true)
  })

  it('user should be able to book a van', async () => {
    // create a user
    const userWithAVan = (
      await request(app).post('/users').send({
        firstName: 'OwnerUser',
        lastName: 'LastName',
        age: 27,
        location: 'Europe',
      })
    ).body
    console.log('-------------userWithAVan--', userWithAVan)

    // create a van
    const van = (
      await request(app).post(`/vans/${userWithAVan._id}`).send({ type: 'van', location: 'Somewhere', price: '100$' })
    ).body
    console.log('-------------van--', van)
    console.log('-------------userWithAVan--', userWithAVan)

    // create another user
    const requesterUser = {
      firstName: 'Requester',
      lastName: 'User',
      age: 36,
      location: 'Europe-West',
    }

    const createdRequesterUser = (await request(app).post('/users').send(requesterUser)).body
    console.log('-------------createdRequesterUser--', createdRequesterUser)

    // send book request with that another user
    await request(app).post(`/book-requests`).send({ van, customer: createdRequesterUser })

    const finalVanOwnerUser = (await request(app).get(`/users/${userWithAVan._id}`)).body
    console.log('-------------finalVanOwnerUser--', finalVanOwnerUser)

    const finalRequesterUser = (await request(app).get(`/users/${createdRequesterUser._id}`)).body
    console.log('-------------finalRequesterUser--', finalRequesterUser)

    expect(finalVanOwnerUser.listings.length).toBe(1)
    expect(finalVanOwnerUser.bookRequests.length).toBe(1)
    expect(finalRequesterUser.bookRequests.length).toBe(1)

    expect(finalRequesterUser.bookRequests[0].van).toBe(finalVanOwnerUser.listings[0]._id)
    expect(finalVanOwnerUser.bookRequests[0].customer).toBe(finalRequesterUser._id)
  })
  it('user should be able to van buddies with another person', async () => {
    // create a user
    const user = {
      firstName: 'Someone',
      lastName: 'something',
      age: 54,
      location: 'Turkey',
    }
    console.log('first user ----------', user)

    // create another user
    const wantsToBeBuddy = {
      firstName: 'Another',
      lastName: 'Person',
      age: 44,
      location: 'Turkey',
    }
    console.log('another user --------------', wantsToBeBuddy)

    const receiver = (await request(app).post('/users').send(user)).body
    console.log('-------------receiver--', receiver)

    const sender = (await request(app).post('/users').send(wantsToBeBuddy)).body
    console.log('-------------sender--', sender)

    // send van buddy request
    await request(app).post(`/van-buddy-requests`).send({ receiver, sender })

    console.log('HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY')
    console.log('receiver.vanBuddyRequests.length', receiver.body)
    console.log('sender.vanBuddyRequests.length', sender.body)

    const finalReceiver = (await request(app).get(`/users/${receiver._id}`)).body
    console.log('-------------finalReceiver--', finalReceiver)

    const finalSender = (await request(app).get(`/users/${sender._id}`)).body
    console.log('-------------finalSender--', finalSender)

    expect(finalReceiver.vanBuddyRequests.length).toBe(1)
    expect(finalSender.vanBuddyRequests.length).toBe(1)
    expect(finalReceiver.vanBuddyRequests[0].finalSender).toBe(finalSender.vanBuddyRequests[0].finalReceiver)
  })
})
