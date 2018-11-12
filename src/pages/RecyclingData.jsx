import React from 'react'
import Table from '../components/Table'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {DateRangePicker} from 'react-dates'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import '../assets/styles/RecyclingData.css'
import { when } from 'mobx'
import {PropTypes as MobxPropTypes} from 'mobx-react'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box'
  },
  formControl: {
    minWidth: 120,
    float: 'right',
    margin: 0
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  selection: {
    padding: '0 0 20px 0'
  }
})

@inject('recyclingStore')
@withRouter
@observer
class RecyclingData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      filter: '',
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate: startDate, endDate: endDate }, this.getNewDataByDates)
  }

  getNewDataByDates() {
    this.props.recyclingStore.getDataByDate(this.state.startDate, this.state.endDate)
    when(
      () => this.props.recyclingStore.state === 'done',
      () => this.props.recyclingStore.filteredDataByType(this.state.filter)
    )
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
  }

  componentDidMount() {
    this.props.recyclingStore.getDataByDate()
  }

  handleChange = event => {
    this.setState({ filter: event.target.value }, this.filter)
  }

  filter() {
    this.props.recyclingStore.filteredDataByType(this.state.filter)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.selection}>
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
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="filter-simple">Filter</InputLabel>
            <Select
              value={this.state.filter}
              onChange={this.handleChange}
              inputProps={{
                name: 'filter',
                id: 'filter-simple',
              }}
            >
              <MenuItem value='' key='none'>
                <em>None</em>
              </MenuItem>
              {this.props.recyclingStore.recycledTypes.map(type => {
                return (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <Table>
          {this.props.recyclingStore.recyclingData}
        </Table>
      </div>
    )
  }
}

RecyclingData.propTypes = {
  classes: PropTypes.object.isRequired,
  recyclingStore: MobxPropTypes.observableArray
}

export default withStyles(styles)(RecyclingData)
