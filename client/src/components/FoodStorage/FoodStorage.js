import React from 'react';
import './FoodStorage.scss';
import FoodCategory from '../FoodCategory';
import NewIngredient from '../NewIngredient';
import axios from 'axios';

class FoodStorage extends React.Component {
    constructor () {
      super();
      this.state = {
        //showModal: false
      };
    }

    addIngredient (e) {
      e.preventDefault();
      // if (!e.target.productName.value) {
      //      alert("Please fill out all the fields before you submit");
      // } else {
      axios
      .post(`http://localhost:3001/ingredient/${e.target.ingName.value}`, {
        "userId": "Randall",
        "store": e.target.ingStore.value
      })
      .then(response => {
        console.log("POST successful:", response.data);
        //this.props.updateProducts();
      })
      .catch(error => {
        console.error(error);
      });
    }

    render () {
        return (
            <section className="food-storage">
                <NewIngredient addIngredient={this.addIngredient} />
                <FoodCategory />
            </section>
        )
    }
}

export default FoodStorage;
