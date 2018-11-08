/*
 * Copyright 2018 Jimmy, Adrien Lecharpentier and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from 'chai'

import * as MUTATIONS from 'store/mutations'

const actionsInjector = require('inject-loader!store/actions')
const actions = actionsInjector({}).default

describe('actions', () => {
  describe('getEvents', () => {
    it('should be a function', () => {
      expect(actions.getEvents).to.be.a('function')
    })
    it('should change the state', () => {
      const state = {events: []}
      const commit = (type, events) => {
        expect(type).to.be.equal.to(MUTATIONS.EVENTS)
      }
      actions.getEvents({commit, state})
    })
  })

  describe('addEvent', () => {
    it('should be a function', () => {
      expect(actions.addEvent).to.be.a('function')
    })
  })

  describe('getEvent', () => {
    it('should be a function', () => {
      expect(actions.getEvent).to.be.a('function')
    })
  })

  describe('updateEvent', () => {
    it('should be a function', () => {
      expect(actions.updateEvent).to.be.a('function')
    })
  })

  describe('getProfile', () => {
    it('should be a function', () => {
      expect(actions.getProfile).to.be.a('function')
    })
  })

  describe('getCsrfToken', () => {
    it('should be a function', () => {
      expect(actions.getCsrfToken).to.be.a('function')
    })
  })
})
