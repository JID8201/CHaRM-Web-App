import { observable, flow, action } from 'mobx'
import superagent from 'superagent'
import commonStore from './commonStore'

class UserStore {
  @observable currentUser;
  @observable errors = undefined
  @observable userLoading = false

  getUser = flow(function *() {
    this.userLoading = true
    try {
      const req = superagent
        .get('/api/user')
        .set({'Authorization': 'Bearer ' + commonStore.token})
      const res = yield req
      this.currentUser = res.body.user
    } catch (err) {
      console.error(err)
      this.errors = err.response.body.msg
    }
    this.userLoading = false
  })

  @action forgetUser() {
    this.currentUser = undefined
  }

  @action setUser(user) {
    this.currentUser = user
    commonStore.setToken(this.currentUser.token)
  }
}

export default new UserStore()
