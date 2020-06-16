import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './MealPlan.scss';

class MealPlan extends React.Component {
    calendarComponentRef = React.createRef();
    state = {
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { title: 'Event Now', date: new Date() }
      ]
    };

    //Use this event handler to open a modal to view the recipes in detail, and/or override them
    openDayModal = (arg) => {
      // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.setState({  // add new event data
          calendarEvents: this.state.calendarEvents.concat({ // creates a new array
            title: 'New Event',
            start: arg.date,
            allDay: arg.allDay
          })
        })
      // }
    }

    render () {
        return (
          <div className="mealplan">
            <FullCalendar
              //defaultView="dayGridMonth"
              //defaultView="timeGridWeek"
              defaultView="listWeek"
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              height={500}
              contentHeight={450}
              plugins={[ listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin ]}
              ref={ this.calendarComponentRef }
              events={ this.state.calendarEvents }
              dateClick={ this.openDayModal }
            />
          </div>
        )
    }
}

export default MealPlan;
