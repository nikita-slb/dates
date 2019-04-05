import React, {Component} from 'react';
import 'react-dates/initialize'
import DatePicker from './DatePicker/DatePicker'
import DateRangePicker from './DatePicker/DateRangePicker'
import moment from 'moment'
import 'moment/locale/ru'

import 'normalize.css'
import './styles/App.scss';

class App extends Component {

    componentDidMount() {

        moment.locale('ru');

    }

    render() {
        return (
            <div className="App">
                <div className="Content">
                    <div className="Container">
                        <DatePicker placeholder="Дата" name="date"/>
                    </div>
                </div>

                <div className="Content">
                    <div className="Container">
                        <DateRangePicker/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
