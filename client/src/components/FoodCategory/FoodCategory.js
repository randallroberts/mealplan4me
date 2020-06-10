import React from 'react';
import './FoodCategory.scss';
import Ingredient from "../Ingredient"

class FoodCategory extends React.Component {
    constructor () {
      super();
      this.state = {
        //showModal: false
      };
      
      
    }

    render () {
        return (
            <section className="food-category">
                <h3 className="food-category__title">
                  Category
                </h3>
                <hr className="food-category__divider" />
                <div className="food-category__list">
                  <Ingredient />
                </div>

            </section>
        )
    }
}

export default FoodCategory;
