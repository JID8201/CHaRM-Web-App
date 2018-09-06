import { observable, action } from "mobx";

export default class AppState {
    @observable authenticated;
    @observable authenticating;
  
  
    constructor() {
      this.authenticated = false;
      this.authenticating = false;
    }

    @action authenticate() {
        return new Promise((resolve, reject) => {
            this.authenticating = true;
            setTimeout(() => {
                this.authenticated = !this.authenticated;
                this.authenticating = false;
                console.log(this.authenticated);
                resolve(this.authenticated);
            }, 0);
        });
    }
}
