import { observable, flow, action, computed } from 'mobx'
import moment from 'moment'
import superagent from 'superagent'
import commonStore from './commonStore';

class RecyclingStore {
    @observable recyclingData = [];
    @observable filteredData = [];
    @observable state = 'pending' // "pending" / "done" / "error"
    @observable originalData = [];
    @observable graphData = []

    getDataByDate = flow(function * (startDate, endDate) {
      this.recyclingData = []
      if (!startDate && !endDate) {
        startDate = moment().subtract(30, 'days').utc()
        endDate = moment().utc()
      }
      this.state = 'pending'
      try {
        const req = superagent
          .get('/api/recycling')
          .set({'Authorization': 'Bearer ' + commonStore.token})
          .query({startDate: startDate.format('YYYY-MM-DD')})
          .query({endDate: endDate.format('YYYY-MM-DD')})
        const response = yield req
        const data = response.body.recycling
        this.recyclingData = this.originalData = data
        this.state = 'done'
      } catch (err) {
        console.error(err)
        this.state = 'error'
      }
    })

    getGraphData = flow(function * (startDate, endDate) {
      this.graphData = []
      if (!startDate && !endDate) {
        startDate = moment().subtract(30, 'days').utc()
        endDate = moment().utc()
      }
      this.state = 'pending'
      try {
        const req = superagent
          .get('/api/graph-data')
          .set({'Authorization': 'Bearer ' + commonStore.token})
          .query({startDate: startDate.format('YYYY-MM-DD')})
          .query({endDate: endDate.format('YYYY-MM-DD')})
        const response = yield req
        this.graphData = response.body.recycling
        this.state = 'done'
      } catch (err) {
        console.error(err)
        this.state = 'error' // handle these
      }
    })

    // should probably hard code for effiecency
    @computed get recycledTypes() {
      let arr = []
      this.originalData.forEach(data => {
        if (!arr.includes(data.items.type)) arr.push(data.items.type)
      })
      return arr.sort()
    }


    @action filteredDataByType(type) {
      if (type !== '') {
        this.recyclingData = this.originalData.filter(data => data.items.type === type)
      } else {
        this.recyclingData = this.originalData
      }
    }
}

export default new RecyclingStore()
