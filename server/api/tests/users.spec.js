const Promise = require('bluebird')
const { expect } = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../../index')
const User = db.model('user')

describe('[USERS ROUTE]', () => {
    beforeEach(() => {
      return db.sync({ force: true })
    })

    describe('[API] Users Route Tests', () => {
      const codysEmail = 'cody@puppybook.com'
      beforeEach(() => {
        return User.create({
          email: codysEmail
        })
      })

      it('GET request to /api/users/', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].email).to.be.equal(codysEmail)
          })
      })
    })
  })
