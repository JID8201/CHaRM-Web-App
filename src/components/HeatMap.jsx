import React from 'react'
import ReactDOM from 'react-dom'
import ReactHeatmap from 'react-heatmap-jsx'



class HeatMap extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: []
      }
    }

    /*  30032, 
        30303, 
        30305,
        30306,
        30307,
        30308,
        30309,
        30310,
        30311,
        30312,
        30313,
        30314,
        30315,
        30316,
        30317,
        30318,
        30319,
        30324,
        30326,
        30327,
        30331,
        30332,
        30334,
        30336,
        30342,
        30344,
        30354,
        30363 */

  render() {

    var width = '750px';
    var height= '500px';
    
    this.state.data = [{x:25,y:25,value:100}]
    
    var ziploc = {
        30033: (71,17),
        30305: (43,10),
        30318: (25,25),
    };

    var boxstyle = {
        position:'relative',
        top:'0px',
        left:'0px',
        width:'750px',
        height:height,
    };

    var mapstyle = {
        position:'relative',
        top:'0px',
        left:'0px',
        width:'750px',
        height:height,
    };

    var heatstyle = {
		position: 'absolute',
		top: '0px',
		left: '0px',
        width:'750px',
        height:height,
    };
        
    return (
			<div style={boxstyle}>
                <img style={mapstyle} src="src/assets/images/zipmap.png"></img>
                <div style={heatstyle}><ReactHeatmap max={100} data={this.state.data} /></div>
				<div style={{marginTop:40}}>
					<button>Randomize data</button>
				</div>
            </div>
    )
  }
}

export default HeatMap
