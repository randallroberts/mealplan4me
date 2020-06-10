import React from 'react';
import './Ingredient.scss';

class Ingredient extends React.Component {
    constructor () {
      super();
      this.state = {
        //showModal: false
      };
      
      
    }

    render () {
        return (
            <div className="ingredient">
                Ingredient Name
            </div>
        )
    }
}

export default Ingredient;
