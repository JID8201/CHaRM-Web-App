import React from 'react';
import Table from '../components/Table';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import RecyclingStore from '../stores/recyclingStore';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';

const recyclingDataArr = [
    {id: 1, zipcode: 30318, recycledItem: 'Paint', dateTime: new Date(2018, 9, 31, 12, 43, 4).toDateString()},
    {id: 2, zipcode: 30309, recycledItem: 'Aluminum', dateTime: new Date(2018, 9, 5, 9, 12, 32).toDateString()},
    {id: 3, zipcode: 30907, recycledItem: 'Glass', dateTime: new Date(2018, 9, 12, 18, 56, 29).toDateString()}
]

@inject("recyclingStore")
@withRouter
@observer
class RecyclingData extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          focusedInput: null,
          startDate: null,
          endDate: null
        }
    
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }
    
    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate: startDate, endDate: endDate });
        if (startDate && endDate) {
            console.log('startDate: ', this.state.startDate, 'endDate: ', this.state.endDate)
            this.props.recyclingStore.getDataByDate(startDate, endDate)
        }
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    componentDidMount() {
        this.props.recyclingStore.getDataByDate()
    }

    render() {
        return (
            <div>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    isOutsideRange={() => false}
                    enableOutsideDays={false}
                />
                <Table>
                    {this.props.recyclingStore.recyclingData}
                </Table>
            </div>
        );
    }
}

export default RecyclingData;