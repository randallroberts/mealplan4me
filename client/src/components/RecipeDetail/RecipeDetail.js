import React from 'react';
import './RecipeDetail.scss';

class RecipeDetail extends React.Component {

    render () {
        return (
          <div className="recipe-detail">
            <h2 className="recipe-detail__title">
              {this.props.data.title}
            </h2>
            <img 
              className="recipe-detail__img"
              alt={this.props.data.title}
              src={this.props.data.image} 
            />
            <h3 className="recipe-detail__title recipe-detail__title--left">
              Total Nutritional Data:
            </h3>
            <ul className="recipe-detail__list">
              <li>
                { this.props.data.nutrition ? this.props.data.nutrition.calories.toFixed(1) : ""} calories
              </li>
              <li>
                {this.props.data.nutrition ? this.props.data.nutrition.carbs.toFixed(1) : ""} grams
              </li>
              <li>
                {this.props.data.nutrition ? this.props.data.nutrition.fats.toFixed(1) : ""} grams
              </li>
              <li>
                {this.props.data.nutrition ? this.props.data.nutrition.protein.toFixed(1) : ""} grams
              </li>
            </ul>
            <h3 className="recipe-detail__title recipe-detail__title--left">
              Ingredients:
            </h3>
            <p>
              {this.props.data.recipeReadable}
            </p>
            
          </div>
        )
    }
}

export default RecipeDetail;
