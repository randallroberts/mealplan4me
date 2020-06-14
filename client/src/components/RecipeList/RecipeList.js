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

      this.selectedIngredients = [];
    }

    //Get all ingredients 
    getIngredients() {
      axios.get("http://localhost:3001/ingredients/Randall")
      .then (response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        console.error(error);
      });
    }
      
    //Get Recipes based on ingredients selected (use + to separate ingredients passed in GET request)
    getRecipes($ingrs) {
      let ingrQuery = "chicken+rice+pasta+vegetables";
      //default: chicken+rice+pasta+vegetables
      if (this.selectedIngredients.length > 0) {
        ingrQuery = this.selectedIngredients;
      }

      axios.get("http://localhost:3001/recipes/" + ingrQuery)
      .then (response => {
        this.setState({
          //ingredients: newIngrListWithSelection
          recipes: response.data.hits.map(hit => hit.recipe )
        });
      })
      .catch(error => {
        console.error(error);
      });
    }

    componentDidMount() {
      this.getRecipes("chicken+rice+pasta+vegetables");
    }

    // Event handler passed to ingredients: 
    suggestIngredient(likedIngr, addRem) {
      //when an ingredient is selected/deselected, add/remove it to the recipe suggestions
      if (addRem) {
        this.selectedIngredients.push(likedIngr);
      } else {
        this.selectedIngredients.splice(this.selectedIngredients.indexOf(likedIngr),1);
      }
      
      this.getRecipes(this.selectedIngredients);
      //setState to update that ingredient being liked. This will fire onUpdate/render
    }
    
    render () {
        return (
          <>
            {/* Display simple version of ingredients list */}
            <FoodStorage details={false} suggestIngredient={this.suggestIngredient.bind(this)} />
            
            {/* Display map of Recipe components based on results */}
            <section className="recipe-list">
              {
                this.state.recipes ? this.state.recipes.map((recipe, key) => {
                  return <Recipe
                    key={key}
                    isSelected={false}
                    data={recipe}
                  />
                }) : ""
              }
            </section>
          </>
        )
    }
}

export default RecipeList;
