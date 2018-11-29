import React from 'react'
import Graph from '../components/Graph'
import {Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {PropTypes as MobxPropTypes, inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {DateRangePicker} from 'react-dates'
import moment from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const styles = () => ({
  buttonContainer: {
    float: 'right'
  },
  button: {
    margin: '5px',
    zIndex: '1'
  },
  graphContainer: {
    width: 'inherit',
    height: '100%',
    position: 'absolute',
    padding: '0 20px 0 0',
    boxSizing: 'border-box'
  },
  container: {
    width: '100%',
    height: '100%'
  }
})

@inject('recyclingStore')
@observer
class GraphData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graph: 'donut',
      focusedInput: null,
      startDate: moment().subtract(30, 'days'),
      endDate: moment()
    }
  }

  componentDidMount() {
    this.props.recyclingStore.getGraphData()
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate: startDate, endDate: endDate }, this.getNewDataByDates)
  }

  getNewDataByDates() {
    this.props.recyclingStore.getGraphData(this.state.startDate, this.state.endDate)
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
  }


  handleGraphChange = (graph) => {
    this.setState({ graph: graph })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="start-input" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="end-input" // PropTypes.string.isRequired,
          onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          isOutsideRange={() => false}
          enableOutsideDays={false}
          minimumNights={0}
        />
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color='secondary'
            onClick={() => this.handleGraphChange('donut')}
            disabled={this.state.graph === 'donut'}
          >
          Donut
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color='secondary'
            onClick={() => this.handleGraphChange('bar')}
            disabled={this.state.graph === 'bar'}
          >
          Bar
          </Button>
        </div>
        <div className={classes.container}>
          <div className={classes.graphContainer}>
            <Graph graph={this.state.graph} data={this.props.recyclingStore.graphData}/>
          </div>
        </div>
      </div>
    )
  }
}

GraphData.propTypes = {
  classes: PropTypes.object.isRequired,
  recyclingStore: MobxPropTypes.observableArray
}

export default withStyles(styles)(GraphData)
