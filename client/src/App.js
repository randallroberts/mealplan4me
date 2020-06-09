import React from 'react';
import './App.scss';
import Menu from './components/Menu';
import FoodStorage from './components/FoodStorage';
import RecipeList from './components/RecipeList';
import MealPlan from './components/MealPlan';
import Goals from './components/Goals';

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <header className="header">
          <Menu />
        </header>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/recipes" />
          </Route>
          <Route path="/recipes" component={RecipeList} />
          <Route path="/groceries" component={FoodStorage} />
          <Route path="/meals" component={MealPlan} />
          <Route path="/goals" component={Goals} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
