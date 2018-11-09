import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box'
  },
  formControl: {
    minWidth: 120,
    margin: 0
  },
  button: {
    margin: '5px',
    zIndex: '1'
  }
})
@inject('recyclingStore')
@observer
class Export extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      year: '',
      filter: ''
    }
  }

  onDateChange = ({ date }) => {
    this.setState({ date })
  }

  getYears = () => {
    let year = 2018
    let currYear = new Date().getFullYear()
    let years = []
    while (year <= currYear) {
      years.push(year)
      year++
    }
    return years
  }

  displayYear = (year) => {
    return (
      <MenuItem value={year}>
        {year}
      </MenuItem>
    )
  }

  handleChange = event => {
    this.setState({ year: event.target.value })
  }

  downloadCsv = () => {
    window.open(`api/yearcsv?year=${this.state.year}`, '_self')
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="filter-simple">Year</InputLabel>
          <Select
            value={this.state.year}
            onChange={this.handleChange}
            inputProps={{
              name: 'Year',
              id: 'filter-simple',
            }}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {this.getYears().map(year => {
              return (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              )}
            )}
          </Select>
        </FormControl>
        <Button
          className={classes.button}
          variant="contained"
          color='secondary'
          onClick={this.downloadCsv}
          disabled={!this.state.year}>
        Download {this.state.year} Data
        </Button>
      </div>
    )
  }
}

Export.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Export)
