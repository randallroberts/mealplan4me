/*
Start the mongodb daemon by running C:\mongodb\bin\mongod.exe in the Command Prompt. Or by running, C:\Program Files (x86)\MongoDB\Server\4.2\bin\mongod.exe
Connect to MongoDB using the Mongo shell While the MongoDB daemon is running, from a different Command prompt window run C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe
*/

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require("axios");
const db = require('./data/db');
const app = express();
app.use(express.json());
const apiPort = process.env.LOCAL_API_PORT;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

//Front End adds (POST) new ingredient
/**
 * POST /inventory
 * parameter: Name
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


app.post('/ingredient/:ingr', (req, res) => {
    
    // console.log(req.params);

    if(!req.params.ingr){
        console.err("Missing parameter for food item");
        res.status(400).send("Missing Parameter: Please include ingredient to search for");
        return;
    }

    let nutritionURL = process.env.NUTRITION_URL;
    let nutritionAppId = process.env.NUTRITION_API_ID;
    let nutritionAppKey = process.env.NUTRITION_API_KEY;

    //Connect to Edamam Food Database API
    try{
        axios.get(`${nutritionURL}?ingr=${req.params.ingr}&app_id=${nutritionAppId}&app_key=${nutritionAppKey}`)
        .then(response => {
            console.log("edamam returned:" + JSON.stringify(response.data.parsed[0]));
            //Store result in MongoDB


            //Send the ingredient back to the front end
            res.status(200).json(response.data.parsed[0]);
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