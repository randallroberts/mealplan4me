/*
Start the mongodb daemon by running C:\mongodb\bin\mongod.exe in the Command Prompt. Or by running, C:\Program Files (x86)\MongoDB\Server\4.2\bin\mongod.exe
Connect to MongoDB using the Mongo shell While the MongoDB daemon is running, from a different Command prompt window run C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe
*/

const express = require('express');
const cors = require('cors');
const axios = require("axios");
const db = require('./data/db');
const Ingredient = require("./data/models/Ingredient");
const app = express();
app.use(express.json());
require('dotenv').config();
const apiPort = process.env.LOCAL_API_PORT;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

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
            console.log("All Ingredients:", dbIngredients);
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
                }
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
            console.log("Failed to get ingredient data: ", err)
            res.status(400).send(err)
        });
     }
     catch(err){
        console.error("Couldn't connect to Edamam", err);
     }
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));