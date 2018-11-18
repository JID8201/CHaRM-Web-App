import { observable, flow, action } from 'mobx'
import commonStore from './commonStore'
import userStore from './userStore'
import superagent from 'superagent'

class AuthStore {
  @observable inProgress = false // true
  @observable errors = undefined
  @observable token

  login = flow(function *(email, password) {
    this.inProgress = true
    this.errors = undefined
    try {
      const req = superagent
        .post('/api/login')
        .send({email: email, password: password})
      const res = yield req
      userStore.setUser(res.body.user)
    } catch (err) {
      this.errors = err.response.body.msg
    }
    this.inProgress = false
  })

  register = flow(function *(firstName, lastName, email, password) {
    this.inProgress = true
    this.errors = undefined
    try {
      const req = superagent
        .post('/api/register')
        .send({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      const res = yield req
      userStore.setUser(res.body.user)
    } catch (err) {
      this.errors = err.response.body.msg
    }
    this.inProgress = false
  })

  @action logout() {
    commonStore.setToken(undefined)
    userStore.forgetUser()
  }
}

export default new AuthStore()
