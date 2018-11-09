import React from 'react'
import Graph from '../components/Graph'
import {Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {PropTypes as MobxPropTypes} from 'mobx-react'
import PropTypes from 'prop-types'

const styles = () => ({
  buttonContainer: {
    float: 'right'
  },
  button: {
    margin: '5px',
    zIndex: '1'
  }
})
class GraphData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graph: 'donut'
    }
  }

    handleGraphChange = (graph) => {
      this.setState({ graph: graph })
    }

    render() {
      const { classes } = this.props
      return (
        <div>
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
          <Graph graph={this.state.graph}/>
        </div>
      )
    }
}

GraphData.propTypes = {
  classes: PropTypes.object.isRequired,
  recyclingStore: MobxPropTypes.observableArray
}

export default withStyles(styles)(GraphData)
