# mealplan4me
MealPlan4Me is an automated meal planner and recipe suggestion app, created in one two-week sprint. It was designed to make adulting easier, and promote healthier cooking at home. The application works by breaking the problem down into 4 easy questions:

## 1) What do I have? (Ingredients)

The Ingredients page allows you to enter the various foods you have at home, and categorize them by food types. The default food categories make grocery shopping a breeze, as they're generally defined by the areas of the grocery store you'll find them in. This makes shopping easy, as you can cross items off your list based on where you are in the store, rather than scanning the list up and down for each item.

The New Ingredient form also allows you to optionally track the cost of the ingredient, and where you bought it. Clicking on an ingredient will show more details, including:
* When and where the ingredient was purchased
* The cost of the ingredient
* Nutritional data

Deleting an ingredient is as easy as clicking the trash can next to the ingredient name.

NB: Multiple listings for ingredients is possible, so the user is able to track multiple grocery shops of food, and have an idea as to how old each ingredient is, even when re-purchased later. As the application's feature set increases, quantities of each ingredient will be tracked more closely, and reduced as each meal is made.

## 2) What should I eat? (Recipes)

By default, this page will display previously saved recipes that the user has selected in the past. To search for new recipes, simply click the ingredients, listed on the left, that you are interested in using. De-selecting all ingredients will revert to displaying only the saved recipes.

To add or remove recipes, simply click the name or image of the recipe. Saved recipes will display a blue border.

Recipe details are mostly hidden by design. The goal is to keep things simple, but the ingredients are listed in the teaser section below, which is scrollable.

## 3) What am I making right now? (Meal Plan)

All selected recipes will be automatically listed on the Meal Plan page, allocating 2 meal concepts/day on a scheduled weekly agenda.

Clicking one of the scheduled meals will dynamically display the further details (eg: nutritional data) on the right.

## 4) How am I doing? (Goals)

Currently, MealPlan4Me gives the user the ability to price shop their ingredients based on historical ingredient data, and evaluate the basic nutritional information of their ingredients and meals. Currently, this information comes directly from their respective API's, but as the application matures and mapping between ingredients and recipes are cached and mapped, much more in-depth reporting will become available.

# Technical Info: 

## What Eggs are in this Basket? (Tech stack)

This is a MERN application:
* There is a simple MongoDB implementation which stores Ingredients and Recipes.
* The API is built in Express, which handles most data manipulation and storage, as well as any external API calls.
* The frontend is a React site, which leverages a small handful of Node packages to display the Meal Plan Agenda, Select dropdowns, and more!
* Node serves us the delicious end product.

## Prepwork (Setup)

This git repo is divided into two parts: Client and Server, stored respectively in their own subdirectories.

The client is a typical React install. NPM install and NPM start should be all that is necessary to start the frontend.
The backend server can similarly be run from its own subdirectory with nodemon server.js

## Bigger Fish to Fry (Future Sprints)

The groundwork has been laid for several future featuresets to be included:

* Serving size calculations deducted from ingredient quantities and measurements.
* Bulk ingredient import, by textarea and via receipt scanning OCR.
* Historical scheduling and storage of auto-generated mealplans.
* Pre-fetching and caching of ingredients and recipes, both for auto-suggest dropdowns in the forms, and faster serving time when the external API is unnecessary to query.
* Juicier reports: Per serving nutritional data, tracking deductions to ingredient quantities and expiry dates, and automatic grocery list generation.
