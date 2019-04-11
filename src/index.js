import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar';

const containerClass = 'react-calendar';

const calendarContainers = document.getElementsByClassName(containerClass);

if( calendarContainers.length > 0 ) {
    Array.from(calendarContainers).forEach(container => {

        const id = container.getAttribute('id');
        const settings = {
            format: container.getAttribute('data-format')
        };

        if( id ) {
            ReactDOM.render(<Calendar settings={settings} />, document.getElementById(id));
        }

    });
}




