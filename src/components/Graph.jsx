import React from 'react';
import {Doughnut} from 'react-chartjs';
import {withRouter} from 'react-router-dom';

@withRouter
class Graph extends React.Component {
    render() {
        var data = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Plastic"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Paint"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Metal"
            }
        ];

        return (
            <Doughnut data={data} width='600 px' height='300 px'/>
        );
    }
}

export default Graph;