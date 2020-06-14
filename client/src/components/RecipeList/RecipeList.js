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
      // this.selectedRecipes = [];
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
    getRecipes() {
      //Empty string will retrieve all saved Recipes from database
      let ingrQuery = ""; 
      //If the user has selected ingredients, query Edamam instead of pulling saved Recipes
      if (this.selectedIngredients.length > 0) {
        ingrQuery = this.selectedIngredients;
      }

      //Get recipes from MongoDB or Edamam (depends on query)
      axios.get("http://localhost:3001/recipes/" + ingrQuery)
      .then (response => {
        //if query is empty, get favourite'd meals from MongoDB
        if (ingrQuery === "") {
          this.selectedRecipes = response.data;
          this.setState({
            recipes: response.data
          });
        }

        //when user selects ingredients, query Edamam for new recipe suggestions
        this.setState({
          recipes: response.data.hits.map(hit => { return ({
            "title": hit.recipe.label,
            "nutrition": {
              "calories": hit.recipe.calories,
              "fats": hit.recipe.totalNutrients.FAT.quantity,
              "carbs": hit.recipe.totalNutrients.CHOCDF.quantity,
              "protein": hit.recipe.totalNutrients.PROCNT.quantity
            },
            "servings": hit.recipe.yield,
            "url": hit.recipe.shareAs,
            "image": hit.recipe.image,
            "recipeReadable": hit.recipe.ingredientLines
          })} )
        });
      })
      .catch(error => {
        console.error(error);
      });
    }

    componentDidMount() {
      this.getRecipes();
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
                  console.log(recipe);
                  return <Recipe
                    key={key}
                    isSelected={recipe._id !== undefined ? true : false}
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
