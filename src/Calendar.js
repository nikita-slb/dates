import React, {Component} from 'react';
import 'react-dates/initialize'
import DatePicker from './DatePicker/DatePicker'
import DateRangePicker from './DatePicker/DateRangePicker'
import moment from 'moment'
import 'moment/locale/ru'

//import 'normalize.css'
//import './styles/Calendar.scss';

const FORMATS = {
    DATE_PICKER: 'date_picker',
    DATE_RANGE_PICKER: 'date_range_picker'
};

class Calendar extends Component {

    static get defaultSettings() {
        return {
            format: FORMATS.DATE_PICKER,
            locale: 'ru'
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            settings: {
                ...Calendar.defaultSettings,
                ...props.settings
            }
        }
    }

    componentDidMount() {

        moment.locale(this.state.settings.locale);

    }

    renderDatePicker() {
        return (
            <DatePicker />
        )
    }

    renderDateRangePicker() {
        return (
            <DateRangePicker/>
        )
    }

    renderCalendar() {
        const { format } = this.state.settings;

        switch (format){
            case FORMATS.DATE_PICKER:
                return this.renderDatePicker();
            case FORMATS.DATE_RANGE_PICKER:
                return this.renderDateRangePicker();
        }
    }

    render() {
        return (
            <>
                { this.renderCalendar() }
            </>
        );
    }
}

export default Calendar;
