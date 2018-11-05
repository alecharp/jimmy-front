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

export const CSRF_TOKEN = 'CSRF_TOKEN'
export const EVENTS = 'EVENTS'
export const USER_PROFILE = 'USER_PROFILE'

export default {
  [CSRF_TOKEN](state, csrfToken) {
    state.csrfToken = csrfToken
  },
  [EVENTS](state, events) {
    state.events = events
  },
  [USER_PROFILE](state, profile) {
    state.profile = profile
  },
}
