import React from 'react';
import Graph from '../components/Graph';
import {Button} from '@material-ui/core';

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
        return (
            <div>
                <Button onClick={() => this.handleGraphChange('donut')}>Donut</Button>
                <Button onClick={() => this.handleGraphChange('bar')}>Bar</Button>
                <Graph graph={this.state.graph}/>
            </div>
        );
    }
}

export default GraphData;