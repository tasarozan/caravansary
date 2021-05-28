class BookVan {
  bookApproval = false

  constructor(van, customer) {
    this.van = van
    this.customer = customer
  }

  bookVan(van) {
    if (!van.availability) throw new Error('Van already booked.')
    console.log('Waiting for the owner approval.')
  }

  bookApproval(van, approval) {
    console.log(this)
    if (this != van.owner) throw new Error('You need to be owner of the van in order to approve booking.')
    this.bookApproval = approval
    return this.bookApproval ? 'Your book request has been approved.' : 'Your book request has been denied.'
  }

  rentVan(van, customer) {
    if (!this.bookApproval) throw new Error('You need owners approval to rent this van.')
    van.changeAvailability()
    customer.rentHistory.push(van)
  }
}

module.exports = BookVan
