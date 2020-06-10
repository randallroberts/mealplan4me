import React from 'react';
import './Ingredient.scss';
import infoIcon from "../../assets/icons/iconmonstr-info-8.png"

class Ingredient extends React.Component {
    constructor () {
      super();
      this.state = {
        details: false
      };
    }

    toggleDetails (e) {
      e.preventDefault();

      console.log(this.state)
      if (this.state.details === false) {
        console.log("set to true");
        this.setState({
          details: true
        });
      } else {
        console.log("set to false");
        this.setState({
          details: false
        });
      }
    }

    render () {
        return (
          <>
            <div className="ingredient" onClick={this.toggleDetails.bind(this)}>
                <p>Ingredient Name</p>
                <img
                  className="ingredient__info-icon"
                  src={infoIcon}
                  alt="Click for more info"
                />
            </div>
            <div className={this.state.details === true ? "ingredient__details ingredient__details--show" : "ingredient__details ingredient__details--hide"}>
              Extra info
            </div>
          </>
        )
    }
}

export default Ingredient;
