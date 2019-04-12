import React, {Component} from 'react';
import 'react-dates/initialize'
import DatePicker from './DatePicker/DatePicker'
import DateRangePicker from './DatePicker/DateRangePicker'
import moment from 'moment'
import 'moment/locale/ru'

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

        this.settings = {
            ...Calendar.defaultSettings,
            ...props.settings
        }

    }

    componentDidMount() {

        moment.locale(this.settings.locale);

    }

    getDate(dateStr) {
        let dateRes = null;
        if( dateStr === 'now' ) {
            dateRes = moment();
        } else if ( dateStr ) {
            dateRes = moment(dateStr);
        }

        return dateRes;
    }

    renderDatePicker() {
        const pickerConfig = this.props.pickerConfig;

        return (
            <DatePicker
                customStyles = {pickerConfig.customStyles}
                customCSS = {pickerConfig.customCSS}
                placeholder = {pickerConfig.placeholder}
                numberMonths = {pickerConfig.numberMonths}
                disabled = {pickerConfig.disabled}
                enableOutsideDays = {pickerConfig.enableOutsideDays}
                name = {pickerConfig.name}
                id = {pickerConfig.id}
                date = {this.getDate(pickerConfig.date)}
            />
        )
    }

    renderDateRangePicker() {
        const pickerConfig = this.props.pickerConfig;

        return (
            <DateRangePicker
                customStyles = {pickerConfig.customStyles}
                customCSS = {pickerConfig.customCSS}
                id = {pickerConfig.id}
                startDate = {this.getDate(pickerConfig.date)}
                endDate = {this.getDate(pickerConfig.dateEnd)}
            />
        )
    }

    renderCalendar() {
        const { format } = this.settings;

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
