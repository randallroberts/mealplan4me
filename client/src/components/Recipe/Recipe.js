import React from 'react';
import './Recipe.scss';
import axios from 'axios';

class Recipe extends React.Component {
    constructor () {
      super();
      this.state = {
        isSelected: false
      };
    }

    toggleSelection (e) {
      e.preventDefault();
      let request;
      //If we're selecting a recipe, save it to MongoDB
      if (!this.state.isSelected) {
        console.log("Adding recipe to MongoDB: ", e.target.title);
        request = axios
        .post("http://localhost:3001/recipe/", {
            "title": e.target.title.value,
            "nutrition": {
                "calories": e.target.calories.value,
                "fats": e.target.fats.value,
                "carbs": e.target.carbs.value,
                "protein": e.target.protein.value
            },
            "servings": e.target.servings.value,
            "url": e.target.url.value,
            "image": e.target.image.value,
            "recipeReadable": e.target.recipeReadable.value
            // "recipeRaw": [
            //     {
            //         "_id": "5ee67efa6bf22f141840202e",
            //         "text": "sugar",
            //         "weight": 5
            //     },
            //     {
            //         "_id": "5ee67efa6bf22f141840202f",
            //         "text": "salt",
            //         "weight": 12
            //     }
            // ],
            // "__v": 0
        });
      } else {
        console.log("Delete recipe from MongoDB");
        //request = axios.delete()
      }

      if (request) {

        request.then(response => {
          console.log("Recipe POST/DELETE successful:", response.data);
          this.setState({ 
            isSelected: !this.state.isSelected,
            recipeId: response.data._id
          });
        })
        .catch(error => {
          console.error(error);
        });
      }
    }

    render () {
        return (
          
          <form name="recipeForm"
            className={this.state.isSelected ? "recipe recipe--selected" : "recipe"}
            onSubmit={this.toggleSelection.bind(this)}>
            <button
              className="recipe__button">
              <h3 className="recipe__title">
                {this.props.data.title}
              </h3>
              {/* <hr className="recipe__divider" /> */}
              <div className="recipe__body">
                <img className="recipe__img" src={this.props.data.image} alt={this.props.data.title} />
              </div>
              {/* <hr className="recipe__divider" /> */}
              <div className="recipe__ingredients">
                {this.props.data.url}
              </div>
              <input name="title"
                type="hidden"
                value={this.props.data.title}
              />
              <input name="calories"
                type="hidden"
                value={this.props.data.calories}
              />
              <input name="fats"
                type="hidden"
                value={this.props.data.nutrition.fats}
              />
              <input name="carbs"
                type="hidden"
                value={this.props.data.nutrition.carbs}
              />
              <input name="protein"
                type="hidden"
                value={this.props.data.nutrition.protein}
              />
              <input name="servings"
                type="hidden"
                value={this.props.data.servings}
              />
              <input name="url"
                type="hidden"
                value={this.props.data.url}
              />
              <input name="image"
                type="hidden"
                value={this.props.data.image}
              />
              <input name="recipeReadable"
                type="hidden"
                value={this.props.data.recipeReadable}
              />
              {/* <input name="recipeRaw"
                type="hidden"
                value={this.props.data.ingredients}
              /> */}
            </button>
          </form>
        )
    }
}

export default Recipe;
