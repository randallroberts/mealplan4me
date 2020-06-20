import React from 'react';
import './Menu.scss';
import mealPlanLogo from "../../assets/images/mealPlanLogo.PNG";
import {NavLink} from "react-router-dom";

function Menu() {
  return (
        <nav>
          <ul className="menu">
            <li className="menu__item menu__item--outer">
              <NavLink to="/groceries" className="menu__link" activeClassName="menu__link--active">
                Ingredients
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/recipes" className="menu__link" activeClassName="menu__link--active">
                Recipes
              </NavLink>
            </li>
            <NavLink to="/" className="menu__link">
              <img className="menu__logo" src={mealPlanLogo} alt="Meal Plan 4 Me Logo" />
            </NavLink>
            <li className="menu__item">
              <NavLink to="/meals" className="menu__link" activeClassName="menu__link--active">
                Meal Plan
              </NavLink>
            </li>
            {/* <li className="menu__item menu__item--outer">
              <NavLink to="/goals" className="menu__link" activeClassName="menu__link--active">
                Goals
              </NavLink>
            </li> */}
          </ul>
        </nav>
  );
}

export default Menu;
