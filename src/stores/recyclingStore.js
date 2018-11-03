import { observable, flow, action, computed } from 'mobx'
import moment from 'moment'
import 'es6-promise'
import fetch from 'isomorphic-fetch'

export class RecyclingStore {
    @observable recyclingData = [];
    @observable filteredData = [];
    @observable state = 'pending' // "pending" / "done" / "error"

    @observable originalData = [];

    getDataByDate = flow(function * (startDate, endDate) {
      this.recyclingData = []
      if (!startDate && !endDate) {
        startDate = moment().subtract(30, 'days')
        endDate = moment()
      }
      this.state = 'pending'
      try {
        const uri = '/api/recycling?startDate=' + startDate.format('YYYY-MM-DD') + '&endDate=' + endDate.format('YYYY-MM-DD')
        const response = yield fetch(uri)
        const data = yield response.json()
        this.recyclingData = this.originalData = data.recycling
        this.state = 'done'
      } catch (err) {
        this.state = 'error'
      }
    })

    @computed get recycledTypes() {
      let arr = []
      this.originalData.forEach(data => {
        if (!arr.includes(data.type)) arr.push(data.type)
      })
      return arr
    }

    @action filteredDataByType(type) {
      if (type !== '') {
        this.recyclingData = this.originalData.filter(data => data.type === type)
      } else {
        this.recyclingData = this.originalData
      }
    }
}

export default new RecyclingStore()
