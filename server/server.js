/*
Start the mongodb daemon by running C:\mongodb\bin\mongod.exe in the Command Prompt. Or by running, C:\Program Files (x86)\MongoDB\Server\4.2\bin\mongod.exe
Connect to MongoDB using the Mongo shell While the MongoDB daemon is running, from a different Command prompt window run C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe
*/

const express = require('express');
const cors = require('cors');
const axios = require("axios");
const db = require('./data/db');
const Ingredient = require("./data/models/Ingredient");
const Recipe = require("./data/models/Recipe");
const app = express();
app.use(express.json());
require('dotenv').config();
const apiPort = process.env.LOCAL_API_PORT;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/**
 * GET recipes/
 * 
 * Returns all recipe objects in MongoDB
 * TBC: by username
 */

app.get("/recipes/", (req, res) => {

    // Use Mongoose to get all recipes
    Recipe.find()
        .then(function(dbRecipe) {
            res.json(dbRecipe);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get recipe/:id
 * 
 * id: string MongoDB autogenerated id
 * 
 * Returns one Recipe object
 */
app.get("/recipe/:id", (req, res) => {

    // Use Mongoose to get all ingredients
    Recipe.findOne({ _id: req.params.id})
        .then(function(dbIngredients) {
            //console.log("All Ingredients:", dbIngredients);
            res.json(dbIngredients);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
});


/**
 * POST /recipes
 * 
 * Stores the recipe in MongoDB so the user has it for later reference
 * 
 * body:
 *  title: {
        type: String,
        required: true
    },
    nutrition: {
        calories: {
            type: Number,
            required: false
        },
        fats: {
            type: Number,
            required: false
        },
        carbs: {
            type: Number,
            required: false
        },
        protein: {
            type: Number,
            required: false
        }
    },
    servings: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    recipeReadable: [
        {   
            text: String,
            weight: Number
        }
    ],
    recipeRaw: [
        {   
            text: String,
            weight: Number
        }
    ]
    
 */

app.post('/recipe/', (req, res) => {
    
    // console.log(req.params);

    // if(!req.body.userId) {
    //     console.error("Missing User ID in Body");
    //     res.status(400).send("Missing User ID in Body");
    //     return;
    // }

    // console.log("I am here: ************", req.body, "***************");

    //Store result in MongoDB
    const newRecipe = new Recipe({
        title: req.body.title,
        nutrition: {
            calories: req.body.nutrition.calories,
            fats: req.body.nutrition.fats,
            carbs: req.body.nutrition.carbs,
            protein: req.body.nutrition.protein
        },
        servings: req.body.servings,
        url: req.body.url,
        image: req.body.image,
        recipeReadable: req.body.recipeReadable
        // recipeRaw: req.body.ingredients
    });

    Recipe.create(newRecipe)
    .then((dbRecipe) => {
        //Send the ingredient back to the front end
        console.log(dbRecipe);
        res.json(dbRecipe);
    })
    .catch(function(err) {
        // If an error occurred, log it
        console.error("Cannot add Recipe to MongoDB:", err);
        res.json(err);
    });
});

/**
 * GET /recipes/chicken+rice+pasta+vegetables
 * 
 * [
        {
            "recipe": {
                "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_78d0f52b45d64f709b12f6eb0479df76",
                "label": "Orzo and Rice Pilaf with Vegetables recipes",
                "image": "https://www.edamam.com/web-img/5cd/5cd7932e309e4abcd986e05cb7440a5b",
                "source": "Epicurious",
                "url": "http://www.epicurious.com/recipes/food/views/orzo-and-rice-pilaf-with-vegetables-107987",
                "shareAs": "http://www.edamam.com/recipe/orzo-and-rice-pilaf-with-vegetables-recipes-78d0f52b45d64f709b12f6eb0479df76/chicken+rice+pasta+vegetables",
                "yield": 6,
                "dietLabels": [
                    "Balanced"
                ],
                "healthLabels": [
                    "Peanut-Free",
                    "Alcohol-Free"
                ],
                "cautions": [
                    "Sulfites",
                    "FODMAP"
                ],
                "ingredientLines": [
                    "1 tablespoon olive oil",
                    "1 tablespoon unsalted butter"
                ],
                "ingredients": [
                    {
                        "text": "1 tablespoon olive oil",
                        "weight": 13.5
                    }
                ],
                "calories": 1294.738125,
                "totalWeight": 1380.675,
                "totalTime": 50,
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 1294.738125,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 46.25955499999999,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 12.148245500000002,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0.46952599999999994,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 24.217877875,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 6.993759625000001,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 184.62306375,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 14.667799999999998,
                        "unit": "g"
                    }
                }
            },
            "bookmarked": false,
            "bought": false
        }
 */
app.get("/recipes/:ingredients", (req, res) => {

    let recipeURL = process.env.RECIPE_URL;
    let recipeAppId = process.env.RECIPE_API_ID;
    let recipeAppKey = process.env.RECIPE_API_KEY;

    //Connect to Edamam Recipe Search API
    try{
        axios.get(`${recipeURL}?q=${req.params.ingredients}&app_id=${recipeAppId}&app_key=${recipeAppKey}&from=0&to=100`)
        .then(response => {
            res.json(response.data);
            console.log("Edamam recipes returned");
        })
        .catch(err => {
            console.log("Failed to get recipe data: ", err)
            res.status(400).send(err)
        });
    }
    catch(err){
        console.error("Couldn't connect to Edamam Recipe Suggestions: ", err);
    }
});


/**
 * GET /ingredients
 * 
 * body: userID <String>
 * 
 *  Returns array of ingredient data. Sample response below:
 *  [
 *      {
            "food": {
                "foodId": "food_a1gb9ubb72c7snbuxr3weagwv0dd",
                "label": "apple",
                "nutrients": {
                    "ENERC_KCAL": 52,
                    "PROCNT": 0.26,
                    "FAT": 0.17,
                    "CHOCDF": 13.81,
                    "FIBTG": 2.4
                },
                "category": "Generic foods",
                "categoryLabel": "food",
                "image": "https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg"
            }
        }
    ]
 */
app.get("/ingredients/:userId", (req, res) => {

    // Use Mongoose to get all ingredients
    Ingredient.find({ owner: req.params.userId})
        .then(function(dbIngredients) {
            //console.log("All Ingredients:", dbIngredients);
            res.json(dbIngredients);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
});

/**
 * GET /ingredient/:ingr
 * parameter: Name of ingredient <String>
 * 
 * body: userID <String>
 * 
 * Returns ingredient data for the first match from Edamam. Sample response below:
 * {
        "food": {
            "foodId": "food_a1gb9ubb72c7snbuxr3weagwv0dd",
            "label": "apple",
            "nutrients": {
                "ENERC_KCAL": 52,
                "PROCNT": 0.26,
                "FAT": 0.17,
                "CHOCDF": 13.81,
                "FIBTG": 2.4
            },
            "category": "Generic foods",
            "categoryLabel": "food",
            "image": "https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg"
        }
    }
 */
app.get("/ingredient/:id", (req, res) => {

    // Use Mongoose to get the Product by the id
    Ingredient.findOne({ _id: req.params.id })
        .then((dbIngredient) => {
            res.json(dbIngredient);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

//Front End adds (POST) new ingredient
/**
 * POST /ingredient/:ingr
 * parameter: Name of ingredient <String>
 * 
 * body: userID <String>
 * store: storeName <String> (optional)
 * category: Type of food <String> (optional)
 * 
 * Returns ingredient data for the first match from Edamam. Sample response below:
 * {
        _id: 5ee17a83b827cd29ec8aab4d,
        ingredientEdamamId: 'food_a1gb9ubb72c7snbuxr3weagwv0dd',
        name: 'apple',
        owner: 'Randall',
        category: "Dairy"
        measurement: { quantity: 1, unit: 'unit' },
        datePurchased: 2020-06-11T00:27:47.013Z,
        store: 'No Frills',
        price: 0,
        nutrition: { calories: 52, protein: 0.26, fats: 0.17, carbs: 13.81 },
        __v: 0
    }

 */
app.post('/ingredient/:ingr', (req, res) => {
    
    // console.log(req.params);

    if(!req.params.ingr) {
        console.error("Missing parameter for food item");
        res.status(400).send("Missing Parameter: Please include ingredient to search for");
        return;
    }
    if(!req.body.userId) {
        console.error("Missing User ID in Body");
        res.status(400).send("Missing User ID in Body");
        return;
    }

    let nutritionURL = process.env.NUTRITION_URL;
    let nutritionAppId = process.env.NUTRITION_API_ID;
    let nutritionAppKey = process.env.NUTRITION_API_KEY;

    //Connect to Edamam Food Database API
    try{
        axios.get(`${nutritionURL}?ingr=${req.params.ingr}&app_id=${nutritionAppId}&app_key=${nutritionAppKey}`)
        .then(response => {
            console.log("Edamam returned:" + JSON.stringify(response.data.parsed[0].food));
            
            //Store result in MongoDB
            const newIngredient = new Ingredient({
                ingredientEdamamId: response.data.parsed[0].food.foodId,
                name: req.params.ingr,
                owner: req.body.userId,
                liked: false,
                category: req.body.category ? req.body.category : "Other",
                measurement: {
                    quantity: 1,
                    unit: "unit"
                },
                datePurchased: Date.now(),
                store: req.body.store ? req.body.store : "Uncategorized",
                price: 0,
                nutrition: {
                    calories: response.data.parsed[0].food.nutrients.ENERC_KCAL,
                    protein: response.data.parsed[0].food.nutrients.PROCNT,
                    fats: response.data.parsed[0].food.nutrients.FAT,
                    carbs: response.data.parsed[0].food.nutrients.CHOCDF
                },
                image: response.data.parsed[0].food.image
            });

            Ingredient.create(newIngredient)
            .then((dbIngredient) => {
                //Send the ingredient back to the front end
                console.log(dbIngredient);
                res.json(dbIngredient);
            })
            .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
                res.json(err);
            });
        })
        .catch(err => {
            console.error("Failed to get ingredient data: ", err)
            res.status(400).send(err)
        });
     }
     catch(err){
        console.error("Couldn't connect to Edamam", err);
     }
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));