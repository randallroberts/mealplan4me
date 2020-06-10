import React from 'react';
import './FoodStorage.scss';
import FoodCategory from '../FoodCategory';
import NewIngredient from '../NewIngredient';

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
                <NewIngredient />
                <FoodCategory />
            </section>
        )
    }
}

export default FoodStorage;
