import { observable, action } from 'mobx'

export class AppState {
    @observable authenticated;
    @observable authenticating;
    @observable recyclingData;
    @observable state = 'pending' // "pending" / "done" / "error"

    constructor() {
      this.authenticated = false
      this.authenticating = false
    }

    @action
    authenticate() {
      return new Promise((resolve, reject) => {
        this.authenticating = true
        setTimeout(() => {
          this.authenticated = !this.authenticated
          this.authenticating = false
          resolve(this.authenticated)
        }, 0)
      })
    }
}

export default new AppState()
