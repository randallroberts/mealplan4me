import React from 'react';
import './Recipe.scss';

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
      {console.log(this.props.data)}
        return (
          
          <form name="recipeForm" id={this.props.data.id}
            className={this.state.isSelected ? "recipe recipe--selected" : "recipe"}
            onSubmit={this.toggleSelection.bind(this)}>
            <button
              className="recipe__button">
              <h3 className="recipe__title">
                {this.props.data.label}
              </h3>
              {/* <hr className="recipe__divider" /> */}
              <div className="recipe__body">
                <img className="recipe__img" src={this.props.data.image} alt={this.props.data.label} />
              </div>
              {/* <hr className="recipe__divider" /> */}
              <div className="recipe__ingredients">
                {this.props.data.ingredientLines}
              </div>
            </button>
          </form>
        )
    }
}

export default Recipe;
