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

      let selectedIngredients = "";

      //default: chicken+rice+pasta+vegetables
      if (!this.state.ingredients) {
        selectedIngredients = "chicken+rice+pasta+vegetables";
      //if isSelected, query those instead
      } else {
        selectedIngredients = this.state.ingredients.filter(ingr => ingr.liked);
      }

      console.log("SelIngr:"+selectedIngredients);
      
      //console.log("Query:", selectedIngredients.map(ingr => ingr + '+'))
      // selectedIngredients = (selectedIngredients.length > 0) ? selectedIngredients.map(ingr => ingr + '+') : `chicken+rice+pasta+vegetables`;

      axios.get("http://localhost:3001/recipes/" + selectedIngredients)
      .then (response => {
        this.setState({
          //ingredients: newIngrListWithSelection
          recipes: response.data.hits.map(hit => hit.recipe )
        })

      })
      .catch(error => {
        console.error(error);
      });
    }

    componentDidMount() {
      this.getRecipes();
    }

    // Event handler passed to ingredients: 
      //when an ingredient is selected
        //this.getRecipes() with new ingredient added to query list
        //setState to update that ingredient being liked. This will fire onUpdate/render

          

    
    render () {
        return (
          <>
            {/* Display simple version of ingredients list */}
            <FoodStorage details={false} />
            
            {/* Display map of Recipe components based on results */}
            <section className="recipe-list">
              {
                this.state.recipes ? this.state.recipes.map(recipe => {
                  return <Recipe isSelected={false} data={recipe}/>
                }) : ""
              }
            </section>
          </>
        )
    }
}

export default RecipeList;
