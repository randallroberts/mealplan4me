import React from 'react';
import './RecipeList.scss';
import Recipe from '../Recipe';
import FoodStorage from '../FoodStorage';
import axios from 'axios';

class RecipeList extends React.Component {
    constructor () {
      super();
      this.state = {
        ingredients: this.getIngredients()
      };
    }

    //Get all ingredients 
    getIngredients() {
      axios.get("http://localhost:3001/ingredients/Randall")
      .then (response => {
        console.log(response.data)
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        console.error(error);
      });
    }
      
    //Get Recipes based on ingredients selected (use + to separate ingredients passed in GET request)
    getRecipes() {

      //default: chicken+rice+pasta+vegetables
      //if isSelected, query those instead
      let selectedIngredients = this.state.ingredients.filter(ingr => ingr.isSelected);
      console.log("SelIngr:", selectedIngredients);
      console.log("Query:", selectedIngredients.map(ingr => ingr + '+'))
      selectedIngredients = (selectedIngredients.length > 0) ? selectedIngredients.map(ingr => ingr + '+') : `chicken+rice+pasta+vegetables`;

      axios.get("http://localhost:3001/ingredients/" + selectedIngredients)
      .then (response => {
        console.log(response.data)
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        console.error(error);
      });
    }

    //Select ingredients (re-use code from selecting recipes)
      //add "isSelected" to MongoDB schema?
      //SetState with new Recipe axios call as ingredients selected

    render () {
        return (
          <>
            {/* Display simple version of ingredients list */}
            <FoodStorage details={false} />
            
            {/* Display map of Recipe components based on results */}
            <section className="recipe-list">
              <Recipe isSelected={false} />
              <Recipe isSelected={true} />
            </section>
          </>
        )
    }
}

export default RecipeList;
