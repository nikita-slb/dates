import React from 'react'
import PropTypes from 'prop-types'
import {DateRangePicker as ReactDatesDateRangePicker} from 'react-dates'
import moment from 'moment'


import 'react-dates/lib/css/_datepicker.css'
import './DatePicker.scss'

import arrowLeft from '../images/calendar-arrow-left.png';
import arrowRight from '../images/calendar-arrow-right.png';

/**
 * DateRangePicker - выбор диапазона дат
 */
class DateRangePicker extends React.Component {

    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        focusedInput: null
    };

    // static getDerivedStateFromProps(props, state) {
    //
    //     let {startDate, endDate} = props;
    //
    //     if (startDate !== state.startDate || endDate !== state.endDate) {
    //         return {
    //             startDate,
    //             endDate
    //         }
    //     }
    //
    //     return null;
    //
    // }

    render() {

        let {customCSS, customStyle, name, id} = this.props;
        let {focusedInput, startDate, endDate} = this.state;

        const styleFocused = focusedInput ? 'DatePicker-focused' : '';

        return (
            <div className={`MiniRangePicker ${customCSS} ${styleFocused}`} style={customStyle}>
                <label className="labelStart">с</label>
                <label className="labelEnd">по</label>
                <ReactDatesDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    startDateId={`${id}_start`}
                    endDateId={`${id}_end`}
                    onDatesChange={({startDate, endDate}) => this.dateChange({startDate, endDate})}
                    focusedInput={focusedInput}
                    onFocusChange={focusedInput => this.setState({focusedInput})}
                    readOnly={true}
                    customArrowIcon={(<div className="customArrow"/>)}
                    startDatePlaceholderText=""
                    endDatePlaceholderText=""
                    minimumNights={0}
                    isOutsideRange={this.outsideRange()}
                    daySize={30}
                    navPrev={(<img src={arrowLeft} alt="<" className="navPrev"/>)}
                    navNext={(<img src={arrowRight} alt=">" className="navNext"/>)}
                    renderDayContents={(day) => DateRangePicker.renderDayContents(day)}
                    hideKeyboardShortcutsPanel={true}
                    showClearDates={true}
                    numberOfMonths={document.documentElement.clientWidth > 540 ? 2 : 1}
                />
            </div>
        );
    }

    /**
     * Функция, которая определяет лежит ли дата вне разрешенного диапазона
     *
     * @return {function}
     */
    outsideRange() {

        if (this.props.enableRange === "past") {

            return (date) => {
                return date.isAfter(moment(), 'day')
            }

        } else if (this.props.enableRange === "future") {

            return (date) => {
                return date.isBefore(moment(), 'day')
            }

        } else {
            return () => false
        }

    }

    /**
     * Алгоритм рендера дней в календаре (выходные красим красным)
     *
     * @param day {object} - moment
     * @return {string} - html строка
     */
    static renderDayContents(day) {

        return (day.weekday() !== 5 && day.weekday() !== 6) ?
            <span>{day.format('D')}</span>
            :
            <span className="CalendarDay__day-off">{day.format('D')}</span>

    }

    /**
     * Выбор даты
     *
     * @param startDate
     * @param endDate
     */
    dateChange({startDate, endDate}) {

        this.setState({startDate, endDate});

        this.props.dateChangeHandler({startDate, endDate});

    }
}

DateRangePicker.displayName = "DateRangePicker";

DateRangePicker.defaultProps = {
    startDate: null,
    endDate: null,
    customCSS: "",
    customStyle: null,
    enableRange: "all",
    dateChangeHandler: () => {
    },
    name: "DateRangePicker"
};

DateRangePicker.propTypes = {
    startDate: PropTypes.object, // moment начальная дата
    endDate: PropTypes.object, // moment конечная дата
    customCSS: PropTypes.string, // кастомный класс
    customStyle: PropTypes.object, // кастомные стили
    name: PropTypes.string, // name компонента
    enableRange: PropTypes.oneOf(["future", "past", "all"]), // разрешенный диапазон выбора
    dateChangeHandler: PropTypes.func // обработчик выбора даты
};

export default DateRangePicker;
