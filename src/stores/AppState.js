import { observable, action, flow } from "mobx"
import moment from 'moment'

export class AppState {
    @observable authenticated;
    @observable authenticating;
    @observable recyclingData;
    @observable state = "pending" // "pending" / "done" / "error"
  
  
    constructor() {
      this.authenticated = false;
      this.authenticating = false;
    }

    @action
    authenticate() {
        return new Promise((resolve, reject) => {
            this.authenticating = true;
            setTimeout(() => {
                this.authenticated = !this.authenticated;
                this.authenticating = false;
                resolve(this.authenticated);
            }, 0);
        });
    }

    getDataByDate = flow(function * (startDate, endDate) {
        this.recyclingData = []
        if (!startDate && !endDate) {
            startDate = moment().subtract(30, 'days')
            endDate = moment()
        }
        this.state = "pending"
        try {
            const data = yield fetch('localhost:3001/api/recycling?' + startDate.format('YYYY-MM-DD') + '&' + endDate.format('YYYY-MM-DD'))
            this.state = 'done'
            this.recyclingData = data
        } catch (err) {
            this.state = 'error'
        }
    })
}

export default new AppState()