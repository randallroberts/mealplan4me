import React from 'react';
import './FoodCategory.scss';
import Ingredient from "../Ingredient"

class FoodCategory extends React.Component {

    render () {
        return (
          <section className="food-category">
              <h3 className="food-category__title">
                {this.props.category}
              </h3>
              <hr className="food-category__divider" />
              <div className="food-category__details">
                {this.props.ingredients.map((ingr, key) => {
                  return <Ingredient 
                    key={key}
                    data={ingr}
                    showDetails={true} />
                })}
              </div>
          </section>
        )
    }
}

export default FoodCategory;
