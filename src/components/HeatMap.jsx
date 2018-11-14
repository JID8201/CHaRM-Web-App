import React from 'react'
import ReactHeatmap from 'react-heatmap-jsx'
import { withStyles } from '@material-ui/core'

const styles = () => ({
  box: {
    position: 'relative',
    top: '0px',
    left: '0px',
    width: '750px',
    height: '500px',
  },
  map: {
    position: 'relative',
    top: '0px',
    left: '0px',
    width: '750px',
    height: '500px',
  },
  heat: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width:'750px',
    height: '500px',
  }
})

class HeatMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{x:25,y:25,value:100}]
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.box}>
        <img className={classes.map} src={require('../assets/images/zipmap.png')}/>
        <div className={classes.heat}>
          <ReactHeatmap max={100} data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(HeatMap)
