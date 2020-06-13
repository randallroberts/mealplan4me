import React from 'react';
import './Ingredient.scss';
import infoIcon from "../../assets/icons/iconmonstr-info-8.png";
import defaultImg from "../../assets/images/mealPlanLogo.PNG";

class Ingredient extends React.Component {
    constructor () {
      super();
      this.state = {
        details: false
      };
      
    }

    toggleDetails (e) {
      e.preventDefault();
      if (this.state.details === false) {
        this.setState({
          details: true
        });
      } else {
        this.setState({
          details: false
        });
      }
    }

    render () {
        return (
          <>
            <div className="ingredient" onClick={this.toggleDetails.bind(this)}>
              <div className="ingredient__overview">
                <p>{this.props.data.name}</p>
                <img
                  className="ingredient__info-icon"
                  src={infoIcon}
                  alt="Click for more info"
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
