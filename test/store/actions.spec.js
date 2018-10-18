import {expect} from 'chai'

const actionsInjector = require('inject-loader!store/actions')

const actions = actionsInjector({}).default

describe('actions', () => {
  it('should be able to provide a promise to get the user profile', () => {
    expect(actions).to.have.a.property('getProfile')
    expect(actions.getProfile).to.be.a('function')
  })

  it('should be able to add events to the state', () => {
    expect(actions).to.have.a.property('addEvent')
    expect(actions.addEvent).to.be.a('function')
  })
})
