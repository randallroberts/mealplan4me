import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { data } from './data.js';
import './MealPlan.scss';

const currentDate = new Date(2017, 4, 11);
const views = ['agenda'];

class MealPlan extends React.Component {

  onAppointmentClick (e) {
    console.log(e.appointmentData);
    /* {
        startDate: new Date(2016, 6, 18, 8), 
        endDate: new Date(2016, 6, 18, 9),
        ownerId: [1, 2],
        recurrenceRule: "FREQ=DAILY"
    } */
 
    console.log(e.targetedAppointmentData);
    /* {
        startDate: new Date(2016, 6, 19, 8), 
        endDate: new Date(2016, 6, 19, 9),
        ownerId: 2,
        recurrenceRule: "FREQ=DAILY"
    } */
}

  render() {
    return (
      <Scheduler
        dataSource={data}
        views={views}
        currentView="agenda"
        defaultCurrentDate={currentDate}
        width={500}
        onAppointmentClick={this.onAppointmentClick}
        startDayHour={9} >
        </Scheduler>
    );
  }
}

export default MealPlan;