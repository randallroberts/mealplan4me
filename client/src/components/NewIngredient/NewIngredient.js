import React from 'react';
import './NewIngredient.scss';
import AddIcon from "../../assets/icons/plus.svg"
import AddImg from "../../assets/icons/uploadImg.svg"

class NewIngredient extends React.Component {
    constructor () {
      super();
      this.state = {
        //showModal: false
      };
    }

    render () {
      return (
        <>
          <section className="new-ingredient">
              <h3 className="new-ingredient__title">
                Add New Ingredient
              </h3>
              <hr className="new-ingredient__divider" />
              <div className="new-ingredient__details">
                <input
                  className="new-ingredient__input"
                  type="text"
                  placeholder="Enter new ingredient"
                />
                <img
                  className="new-ingredient__info-icon"
                  src={AddIcon}
                  alt="Submit Text"
                />
                <img
                  className="new-ingredient__info-icon"
                  src={AddImg}
                  alt="Scan Receipt"
                />
              </div>
          </section>
        </>
      )
    }
}

export default NewIngredient;
