import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import './Recipe.scss';

class Recipe extends React.Component {
    constructor () {
      super();
      this.state = {
        isSelected: false
      };

      this.meals = [
        { value: "Any", label: "Any" },
        { value: "Breakfast", label: "Breakfast" },
        { value: "Lunch", label: "Lunch" },
        { value: "Dinner", label: "Dinner" },
        { value: "Snacks", label: "Snacks" }
      ];
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
            //"category": e.target.category.value,
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
        });
      //If we're de-selecting a recipe, remove it from MongoDB
      } else {
        console.log("Delete recipe from MongoDB");
        request = axios.delete(`http://localhost:3001/recipe/${this.props.data._id}`, )
      }

      if (request) {
        request.then(response => {
          console.log("Recipe POST/DELETE successful:", response.data);
          this.setState({ 
            recipeId: response.data._id || null,
            isSelected: !this.state.isSelected
          });
        })
        .catch(error => {
          console.error(error);
        });
      }
    }

    componentDidMount () {
      this.setState({
        isSelected: this.props.isSelected
      })
    }

    render () {
        return (
          
          <form name="recipeForm"
            id={this.props.data._id ? this.props.data._id : null}
            className={this.state.isSelected ? "recipe recipe--selected" : "recipe"}
            onSubmit={this.toggleSelection.bind(this)}>
            <button className="recipe__button">
              <h3 className="recipe__title">
                {this.props.data.title}
              </h3>
              {/* <hr className="recipe__divider" /> */}
              <div className="recipe__body">
                <img className="recipe__img"
                  src={this.props.data.image}
                  alt={this.props.data.title}
              />
              </div>
              </button>
              <Select
                className="recipe__select"
                name="recipeCategory"
                options={this.meals}
                defaultOptions={this.meals}
                defaultValue={this.meals.filter(option => option.label === 'Any')}
              />
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
            
          </form>
        )
    }
}

export default Recipe;
