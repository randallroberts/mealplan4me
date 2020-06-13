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
              {this.props.data.label}
            </h3>
            <hr className="recipe__divider" />
            <div className="recipe__body">
              <img className="recipe__img" src={this.props.data.image} alt={this.props.data.label} />
            </div>
            <hr className="recipe__divider" />
            <div className="recipe__ingredients">
              {this.props.data.ingredientLines}
            </div>
          </div>
        )
    }
}

export default Recipe;
