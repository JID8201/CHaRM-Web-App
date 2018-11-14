import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import EnhancedTableHead from './EnhancedTableHead'
import moment from 'moment'
// import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

})


class CenteredGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: 'desc',
      orderBy: 'created_at'
    }
  }

  handleRequestSort = (_, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  // move this logic to MobX
  desc(a, b, orderBy) {
    if (orderBy === 'type' || orderBy === 'amount') {
      if (b.items[orderBy] < a.items[orderBy]) {
        return -1
      }
      if (b.items[orderBy] > a.items[orderBy]) {
        return 1
      }
      return 0
    } else {
      if (b[orderBy] < a[orderBy]) {
        return -1
      }
      if (b[orderBy] > a[orderBy]) {
        return 1
      }
      return 0
    }
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) =>  {
      return [el, index]
    })
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => - this.desc(a, b, orderBy)
  }

  render() {
    const { classes, children } = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <EnhancedTableHead
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {this.stableSort(children, this.getSorting(this.state.order, this.state.orderBy))
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(data => {
                return (
                  <TableRow key={data.items._id}>
                    <TableCell numeric>{data.zip}</TableCell>
                    <TableCell>{data.items.type}</TableCell>
                    <TableCell numeric>{data.items.amount}</TableCell>
                    <TableCell>{moment(data.created_at).format('YYYY-MM-DD')}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Paper>
    )
  }

}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired
}

export default withStyles(styles)(CenteredGrid)
