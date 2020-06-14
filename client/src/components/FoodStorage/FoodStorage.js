import React from 'react';
import './FoodStorage.scss';
import FoodCategory from '../FoodCategory';
import NewIngredient from '../NewIngredient';
import Ingredient from '../Ingredient';
import axios from 'axios';

class FoodStorage extends React.Component {
    constructor () {
      super();
      this.state = {};

      this.categories = [];
      this.addIngredient = this.addIngredient.bind(this);
    }

    updateIngredients (newIngr) {
      //if the category isn't already known, add it
      if (!this.categories.includes(newIngr.category)) {
        console.log("Added new category: ", newIngr.category);
        this.categories.push(newIngr.category);
      }
      
      //add the new ingredient to state
      let newState = this.state.ingredients.slice();
      newState.push(newIngr);
      
      this.setState({
        ingredients: newState
      });
    }

    getIngredients() {
      axios.get("http://localhost:3001/ingredients/Randall")
      .then (response => {
        //make a set of categories
        this.categories = [...new Set(
          response.data.map(ingredient => ingredient.category))];
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        console.error(error);
      });
    }

    addIngredient (e) {
      e.preventDefault();

      axios
      .post(`http://localhost:3001/ingredient/${e.target.ingName.value}`, {
        "userId": "Randall",
        "store": e.target.ingStore.value,
        "category": e.target.ingCategory.value
      })
      .then(response => {
        console.log("POST successful:", response.data);
        this.updateIngredients(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }

    componentDidMount() {
      this.getIngredients();
    }

    render () {
        return (
          <>
            <aside className="ingredient-list">
              <NewIngredient addIngredient={this.addIngredient} />
              {/* If we're displaying simple details */}
              {((this.state.ingredients) && (!this.props.details)) ? 
                  this.state.ingredients.map( (ingredient, key) => {
                    return ( <Ingredient 
                      key={key}
                      data={ingredient}
                      showDetails={false}
                      suggestIngredient={this.props.suggestIngredient}
                    />)
                  }) : "" }
              
            </aside>

            <section className={this.props.details ? "food-categories" : "food-categories--hide"}>
              {/* If we're displaying all details of the ingredients */}
              {this.props.details ?
                (this.categories.map((category, key) => {
                  return ( <FoodCategory
                    key={key}
                    category={category}
                    ingredients={this.state.ingredients
                      .filter(ingredient => ingredient.category === category)}
                  />)
                  
                })) : ""
              }
            </section>
          </>
        )
    }
}

export default FoodStorage;
