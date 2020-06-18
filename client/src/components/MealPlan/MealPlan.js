import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';
import './MealPlan.scss';

const currentDate = Date.now();
const views = ['agenda'];

class MealPlan extends React.Component {
  constructor () {
    super();
    this.state = {
      meals: [{
        text: 'Breakfast',
        startDate: new Date(2020, 5, 17, 7, 0),
        endDate: new Date(2020, 5, 17, 9, 30)
      }],

    };

    this.meals = [
      {
        text: 'Breakfast',
        startDate: new Date(2020, 5, 17, 7, 0),
        endDate: new Date(2020, 5, 17, 9, 30)
      },
      {
        text: 'Lunch',
        startDate: new Date(2020, 5, 17, 11, 0),
        endDate: new Date(2020, 5, 17, 13, 30)
      },
      {
        text: 'Dinner',
        startDate: new Date(2020, 5, 17, 16, 0),
        endDate: new Date(2020, 5, 17, 20, 0)
      },
      {
        text: 'Snacks',
        startDate: new Date(2020, 5, 17, 20, 30),
        endDate: new Date(2020, 5, 17, 22, 30)
      }
    ];
  }
  
  //Get Meals the user has selected before
  getMeals() {
    axios.get("http://localhost:3001/meals/")
    .then (response => {
      //Re-shape the response.data to match the Scheduler's needs
      // this.setState({
      
      let mealObjs = [];

      response.data.forEach(mealplan => { 
        let mealDate = mealplan.mealplanDate.split('T')[0];
        mealplan.meals.forEach( (meal, key) => {
          mealObjs.push (
            {
              text:      meal.title,
              startDate: new Date(mealDate+ ((key % 2 === 0) ? 'T12:30:00' : 'T17:30:00')),
              endDate:   new Date(mealDate+((key % 2 === 0) ? 'T2:30:00' : 'T19:30:00'))
            }
          );
        })
      });
      this.setState({
        meals: mealObjs
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  onAppointmentClick (e) {
    console.log(e.appointmentData);

    console.log(e.targetedAppointmentData);
  }

  componentDidMount () {
    this.getMeals();
  }

  render() {
    return (
      <Scheduler
        dataSource={this.state.meals}
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