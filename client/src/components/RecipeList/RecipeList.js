import React from 'react';
import './RecipeList.scss';
import Recipe from '../Recipe';

class RecipeList extends React.Component {
    constructor () {
      super();
      this.state = {
        //showModal: false
      };
      
      
    }

    render () {
        return (
          <section className="recipe-list">
            <Recipe isSelected={false} />
            <Recipe isSelected={true} />
          </section>
        )
    }
}

export default RecipeList;
