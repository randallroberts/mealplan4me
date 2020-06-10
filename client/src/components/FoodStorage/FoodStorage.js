import React from 'react';
import './FoodStorage.scss';
import FoodCategory from '../FoodCategory/FoodCategory';

class FoodStorage extends React.Component {
    constructor () {
      super();
      this.state = {
        //showModal: false
      };
      
      
    }

    render () {
        return (
            <section className="food-storage">
                <FoodCategory />
            </section>
        )
    }
}

export default FoodStorage;
