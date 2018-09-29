import React from 'react';
import Table from '../components/Table';
import {inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

const recyclingDataArr = [
    {id: 1, zipcode: 30318, recycledItem: 'Paint', dateTime: new Date(2018, 9, 31, 12, 43, 4).toDateString()},
    {id: 2, zipcode: 30309, recycledItem: 'Aluminum', dateTime: new Date(2018, 9, 5, 9, 12, 32).toDateString()},
    {id: 3, zipcode: 30907, recycledItem: 'Glass', dateTime: new Date(2018, 9, 12, 18, 56, 29).toDateString()}
]

@inject("store")
@withRouter
class RecyclingData extends React.Component {

    render() {
        return (
            <Table>
                {recyclingDataArr}
            </Table>
        );
    }
}

export default RecyclingData;