import React from 'react';
import './Recipe.scss';
import tempImg from "../../assets/images/mealPlanLogo.PNG";

class Recipe extends React.Component {
    constructor () {
      super();
      this.state = {
        isSelected: false
      };
    }

    toggleSelection (e) {
      e.preventDefault();
      this.setState({ isSelected: !this.state.isSelected });
    }

    render () {
        return (
          <div
            className={this.state.isSelected ? "recipe recipe--selected" : "recipe"}
            onClick={this.toggleSelection.bind(this)}
            >
            <h3 className="recipe__title">
              Recipe Title
            </h3>
            <hr className="recipe__divider" />
            <div className="recipe__body">
              <img className="recipe__img" src={tempImg} alt="Recipe Title" />
            </div>
            <hr className="recipe__divider" />
            <div className="recipe__ingredients">
              Recipe ing1, recipe ing2...
            </div>
          </div>
        )
    }
}

export default Recipe;
