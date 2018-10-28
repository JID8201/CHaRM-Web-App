import { observable, action, flow } from "mobx"
import moment from 'moment'

export class RecyclingStore {
    @observable recyclingData = [];
    @observable state = "pending" // "pending" / "done" / "error"

    getDataByDate = flow(function * (startDate, endDate) {
        this.recyclingData = []
        if (!startDate && !endDate) {
            startDate = moment().subtract(30, 'days')
            endDate = moment()
        }
        console.log('startDate: ', startDate.format('YYYY-MM-DD'), 'endDate: ', endDate.format('YYYY-MM-DD'))
        this.state = "pending"
        try {
            const uri = 'http://localhost:3001/api/recycling?startDate=' + startDate.format('YYYY-MM-DD') + '&endDate=' + endDate.format('YYYY-MM-DD')
            console.log(uri)
            const response = yield fetch(uri)
            const data = yield response.json()
            console.log('data: ', data)
            this.state = 'done'
            this.recyclingData = data.recycling
        } catch (err) {
            this.state = 'error'
        }
    })
}

export default new RecyclingStore()
