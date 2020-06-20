import React from 'react';
import './Ingredient.scss';
import trashIcon from "../../assets/icons/trash.svg";
import defaultImg from "../../assets/images/mealPlanLogo.PNG";

class Ingredient extends React.Component {
    constructor () {
      super();
      this.state = {
        details: false,
        isSelected: false
      };
      
    }

    toggleSelection (e) {
      e.preventDefault();
      //De-select ingredient
      this.props.suggestIngredient(e.target.innerHTML, !this.state.isSelected);
      this.setState({ isSelected: !this.state.isSelected });
    }

    toggleDetails (e) {
      e.preventDefault();
      this.setState({ details: !this.state.details });
    }

    render () {
        return (
          <>
            <div  className={this.state.isSelected ? "ingredient ingredient--selected" : "ingredient"} >
              <div className="ingredient__overview">
                <p name="ingr" onClick={ this.props.showDetails ? this.toggleDetails.bind(this) : this.toggleSelection.bind(this)}>
                  {this.props.data.name}
                </p>
                <img
                  onClick={this.props.deleteIngredient.bind(this)}
                  id={this.props.data._id}
                  className="ingredient__info-icon"
                  src={trashIcon}
                  alt="Delete this ingredient from the list"
                />
              </div>
              <div className={this.state.details === true ? "ingredient__details ingredient__details--show" : "ingredient__details ingredient__details--hide"}>
                <img className="ingredient__img" src={this.props.data.image ? this.props.data.image : defaultImg } alt={this.props.data.name} />
                <p>
                  Quantity: {this.props.data.measurement.quantity} {this.props.data.measurement.unit}
                </p>
                <p>
                  Purchased: {this.props.data.datePurchased}
                </p>
                <ul>
                  <li>From:{this.props.data.store}</li>
                  <li>For: ${this.props.data.price}</li>
                </ul>
                <ul>
                  <li>Cal: {this.props.data.nutrition.calories}</li>
                  <li>Prot: {this.props.data.nutrition.protein}</li>
                  <li>Fats: {this.props.data.nutrition.fats}</li>
                  <li>Carbs: {this.props.data.nutrition.carbs}</li>
                </ul>
              </div>
            </div>
            
          </>
        )
    }
}

export default Ingredient;
