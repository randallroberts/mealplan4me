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
 * GET /recipes
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
                    "1 tablespoon unsalted butter",
                    "2/3 cup orzo (rice-shaped pasta)",
                    "1 medium onion, finely chopped (1 cup)",
                    "2 carrots, cut into 1/4-inch dice (3/4 cup)",
                    "2 celery ribs, cut into 1/4-inch dice (2/3 cup)",
                    "2 garlic cloves, finely chopped",
                    "1/4 teaspoon salt",
                    "1/4 teaspoon black pepper",
                    "1/2 cup long-grain white rice",
                    "1 3/4 cups chicken broth or vegetable broth (14 fl oz)",
                    "1 cup water",
                    "1 small zucchini or yellow squash, cut into 1/4-inch dice (1 1/4 cups)",
                    "1/4 cup chopped fresh parsley",
                    "1/4 cup slivered almonds, toasted"
                ],
                "ingredients": [
                    {
                        "text": "1 tablespoon olive oil",
                        "weight": 13.5
                    },
                    {
                        "text": "1 tablespoon unsalted butter",
                        "weight": 14.2
                    },
                    {
                        "text": "2/3 cup orzo (rice-shaped pasta)",
                        "weight": 70
                    },
                    {
                        "text": "1 medium onion, finely chopped (1 cup)",
                        "weight": 160
                    },
                    {
                        "text": "2 carrots, cut into 1/4-inch dice (3/4 cup)",
                        "weight": 122
                    },
                    {
                        "text": "2 celery ribs, cut into 1/4-inch dice (2/3 cup)",
                        "weight": 80
                    },
                    {
                        "text": "2 garlic cloves, finely chopped",
                        "weight": 6
                    },
                    {
                        "text": "1/4 teaspoon salt",
                        "weight": 1.5
                    },
                    {
                        "text": "1/4 teaspoon black pepper",
                        "weight": 0.725
                    },
                    {
                        "text": "1/2 cup long-grain white rice",
                        "weight": 97.5
                    },
                    {
                        "text": "1 3/4 cups chicken broth or vegetable broth (14 fl oz)",
                        "weight": 420.00000000000006
                    },
                    {
                        "text": "1 cup water",
                        "weight": 237
                    },
                    {
                        "text": "1 small zucchini or yellow squash, cut into 1/4-inch dice (1 1/4 cups)",
                        "weight": 116.25
                    },
                    {
                        "text": "1/4 cup chopped fresh parsley",
                        "weight": 15
                    },
                    {
                        "text": "1/4 cup slivered almonds, toasted",
                        "weight": 27
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
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 25.601497500000004,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 37.49727125,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 43.13,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 1371.0670000000002,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 277.53975,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 231.5525,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 2096.200125,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 5.996506250000001,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 4.820107500000001,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 648.92975,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 1212.0175000000002,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 62.7643125,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.5732498750000001,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 1.03954425,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 12.753233875000001,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 1.2044738750000004,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 183.62925,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 183.62925,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0.024139999999999998,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0.21299999999999997,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 10.697155,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 302.1886375,
                        "unit": "µg"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 1080.8534712500002,
                        "unit": "g"
                    }
                },
                "totalDaily": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 64.73690625,
                        "unit": "%"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 71.16854615384614,
                        "unit": "%"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 60.741227500000015,
                        "unit": "%"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 61.54102125,
                        "unit": "%"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 58.67119999999999,
                        "unit": "%"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 74.9945425,
                        "unit": "%"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 14.376666666666667,
                        "unit": "%"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 57.127791666666674,
                        "unit": "%"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 27.753975,
                        "unit": "%"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 55.131547619047616,
                        "unit": "%"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 44.600002659574464,
                        "unit": "%"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 33.313923611111115,
                        "unit": "%"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 43.819159090909096,
                        "unit": "%"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 92.70425,
                        "unit": "%"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 134.66861111111112,
                        "unit": "%"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 69.73812500000001,
                        "unit": "%"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 47.77082291666668,
                        "unit": "%"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 79.96494230769231,
                        "unit": "%"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 79.70771171875,
                        "unit": "%"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 92.65183653846157,
                        "unit": "%"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 45.90731250000001,
                        "unit": "%"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 1.0058333333333334,
                        "unit": "%"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 1.4199999999999997,
                        "unit": "%"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 71.31436666666667,
                        "unit": "%"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 251.82386458333337,
                        "unit": "%"
                    }
                },
                "digest": [
                    {
                        "label": "Fat",
                        "tag": "FAT",
                        "schemaOrgTag": "fatContent",
                        "total": 46.25955499999999,
                        "hasRDI": true,
                        "daily": 71.16854615384614,
                        "unit": "g",
                        "sub": [
                            {
                                "label": "Saturated",
                                "tag": "FASAT",
                                "schemaOrgTag": "saturatedFatContent",
                                "total": 12.148245500000002,
                                "hasRDI": true,
                                "daily": 60.741227500000015,
                                "unit": "g"
                            },
                            {
                                "label": "Trans",
                                "tag": "FATRN",
                                "schemaOrgTag": "transFatContent",
                                "total": 0.46952599999999994,
                                "hasRDI": false,
                                "daily": 0,
                                "unit": "g"
                            },
                            {
                                "label": "Monounsaturated",
                                "tag": "FAMS",
                                "schemaOrgTag": null,
                                "total": 24.217877875,
                                "hasRDI": false,
                                "daily": 0,
                                "unit": "g"
                            },
                            {
                                "label": "Polyunsaturated",
                                "tag": "FAPU",
                                "schemaOrgTag": null,
                                "total": 6.993759625000001,
                                "hasRDI": false,
                                "daily": 0,
                                "unit": "g"
                            }
                        ]
                    },
                    {
                        "label": "Carbs",
                        "tag": "CHOCDF",
                        "schemaOrgTag": "carbohydrateContent",
                        "total": 184.62306375,
                        "hasRDI": true,
                        "daily": 61.54102125,
                        "unit": "g",
                        "sub": [
                            {
                                "label": "Carbs (net)",
                                "tag": "CHOCDF.net",
                                "schemaOrgTag": null,
                                "total": 169.95526375,
                                "hasRDI": false,
                                "daily": 0,
                                "unit": "g"
                            },
                            {
                                "label": "Fiber",
                                "tag": "FIBTG",
                                "schemaOrgTag": "fiberContent",
                                "total": 14.667799999999998,
                                "hasRDI": true,
                                "daily": 58.67119999999999,
                                "unit": "g"
                            },
                            {
                                "label": "Sugars",
                                "tag": "SUGAR",
                                "schemaOrgTag": "sugarContent",
                                "total": 25.601497500000004,
                                "hasRDI": false,
                                "daily": 0,
                                "unit": "g"
                            },
                            {
                                "label": "Sugars, added",
                                "tag": "SUGAR.added",
                                "schemaOrgTag": null,
                                "total": 0,
                                "hasRDI": false,
                                "daily": 0,
                                "unit": "g"
                            }
                        ]
                    },
                    {
                        "label": "Protein",
                        "tag": "PROCNT",
                        "schemaOrgTag": "proteinContent",
                        "total": 37.49727125,
                        "hasRDI": true,
                        "daily": 74.9945425,
                        "unit": "g"
                    },
                    {
                        "label": "Cholesterol",
                        "tag": "CHOLE",
                        "schemaOrgTag": "cholesterolContent",
                        "total": 43.13,
                        "hasRDI": true,
                        "daily": 14.376666666666667,
                        "unit": "mg"
                    },
                    {
                        "label": "Sodium",
                        "tag": "NA",
                        "schemaOrgTag": "sodiumContent",
                        "total": 1371.0670000000002,
                        "hasRDI": true,
                        "daily": 57.127791666666674,
                        "unit": "mg"
                    },
                    {
                        "label": "Calcium",
                        "tag": "CA",
                        "schemaOrgTag": null,
                        "total": 277.53975,
                        "hasRDI": true,
                        "daily": 27.753975,
                        "unit": "mg"
                    },
                    {
                        "label": "Magnesium",
                        "tag": "MG",
                        "schemaOrgTag": null,
                        "total": 231.5525,
                        "hasRDI": true,
                        "daily": 55.131547619047616,
                        "unit": "mg"
                    },
                    {
                        "label": "Potassium",
                        "tag": "K",
                        "schemaOrgTag": null,
                        "total": 2096.200125,
                        "hasRDI": true,
                        "daily": 44.600002659574464,
                        "unit": "mg"
                    },
                    {
                        "label": "Iron",
                        "tag": "FE",
                        "schemaOrgTag": null,
                        "total": 5.996506250000001,
                        "hasRDI": true,
                        "daily": 33.313923611111115,
                        "unit": "mg"
                    },
                    {
                        "label": "Zinc",
                        "tag": "ZN",
                        "schemaOrgTag": null,
                        "total": 4.820107500000001,
                        "hasRDI": true,
                        "daily": 43.819159090909096,
                        "unit": "mg"
                    },
                    {
                        "label": "Phosphorus",
                        "tag": "P",
                        "schemaOrgTag": null,
                        "total": 648.92975,
                        "hasRDI": true,
                        "daily": 92.70425,
                        "unit": "mg"
                    },
                    {
                        "label": "Vitamin A",
                        "tag": "VITA_RAE",
                        "schemaOrgTag": null,
                        "total": 1212.0175000000002,
                        "hasRDI": true,
                        "daily": 134.66861111111112,
                        "unit": "µg"
                    },
                    {
                        "label": "Vitamin C",
                        "tag": "VITC",
                        "schemaOrgTag": null,
                        "total": 62.7643125,
                        "hasRDI": true,
                        "daily": 69.73812500000001,
                        "unit": "mg"
                    },
                    {
                        "label": "Thiamin (B1)",
                        "tag": "THIA",
                        "schemaOrgTag": null,
                        "total": 0.5732498750000001,
                        "hasRDI": true,
                        "daily": 47.77082291666668,
                        "unit": "mg"
                    },
                    {
                        "label": "Riboflavin (B2)",
                        "tag": "RIBF",
                        "schemaOrgTag": null,
                        "total": 1.03954425,
                        "hasRDI": true,
                        "daily": 79.96494230769231,
                        "unit": "mg"
                    },
                    {
                        "label": "Niacin (B3)",
                        "tag": "NIA",
                        "schemaOrgTag": null,
                        "total": 12.753233875000001,
                        "hasRDI": true,
                        "daily": 79.70771171875,
                        "unit": "mg"
                    },
                    {
                        "label": "Vitamin B6",
                        "tag": "VITB6A",
                        "schemaOrgTag": null,
                        "total": 1.2044738750000004,
                        "hasRDI": true,
                        "daily": 92.65183653846157,
                        "unit": "mg"
                    },
                    {
                        "label": "Folate equivalent (total)",
                        "tag": "FOLDFE",
                        "schemaOrgTag": null,
                        "total": 183.62925,
                        "hasRDI": true,
                        "daily": 45.90731250000001,
                        "unit": "µg"
                    },
                    {
                        "label": "Folate (food)",
                        "tag": "FOLFD",
                        "schemaOrgTag": null,
                        "total": 183.62925,
                        "hasRDI": false,
                        "daily": 0,
                        "unit": "µg"
                    },
                    {
                        "label": "Folic acid",
                        "tag": "FOLAC",
                        "schemaOrgTag": null,
                        "total": 0,
                        "hasRDI": false,
                        "daily": 0,
                        "unit": "µg"
                    },
                    {
                        "label": "Vitamin B12",
                        "tag": "VITB12",
                        "schemaOrgTag": null,
                        "total": 0.024139999999999998,
                        "hasRDI": true,
                        "daily": 1.0058333333333334,
                        "unit": "µg"
                    },
                    {
                        "label": "Vitamin D",
                        "tag": "VITD",
                        "schemaOrgTag": null,
                        "total": 0.21299999999999997,
                        "hasRDI": true,
                        "daily": 1.4199999999999997,
                        "unit": "µg"
                    },
                    {
                        "label": "Vitamin E",
                        "tag": "TOCPHA",
                        "schemaOrgTag": null,
                        "total": 10.697155,
                        "hasRDI": true,
                        "daily": 71.31436666666667,
                        "unit": "mg"
                    },
                    {
                        "label": "Vitamin K",
                        "tag": "VITK1",
                        "schemaOrgTag": null,
                        "total": 302.1886375,
                        "hasRDI": true,
                        "daily": 251.82386458333337,
                        "unit": "µg"
                    },
                    {
                        "label": "Sugar alcohols",
                        "tag": "Sugar.alcohol",
                        "schemaOrgTag": null,
                        "total": 0,
                        "hasRDI": false,
                        "daily": 0,
                        "unit": "g"
                    },
                    {
                        "label": "Water",
                        "tag": "WATER",
                        "schemaOrgTag": null,
                        "total": 1080.8534712500002,
                        "hasRDI": false,
                        "daily": 0,
                        "unit": "g"
                    }
                ]
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
        axios.get(`${recipeURL}?q=${req.params.ingredients}&app_id=${recipeAppId}&app_key=${recipeAppKey}`)
        .then(response => {
            console.log("Edamam returned:" + JSON.stringify(response.data));
            res.json(response.data);
        })
        .catch(err => {
            console.log("Failed to get recipe data: ", err)
            res.status(400).send(err)
        });
    }
    catch(err){
        console.error("Couldn't connect to Edamam", err);
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
            console.log("Failed to get ingredient data: ", err)
            res.status(400).send(err)
        });
     }
     catch(err){
        console.error("Couldn't connect to Edamam", err);
     }
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));