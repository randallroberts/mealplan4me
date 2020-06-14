const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Product Schema
const RecipeSchema = new Schema({
    title: {
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
    recipeReadable: {   
        text: String,
        required: false
    }
    // ],
    // recipeRaw: [
    //     {   
    //         text: String,
    //         weight: Number
    //     }
    // ]
});

// Export the Schema
module.exports = Recipe = mongoose.model("Recipe", RecipeSchema);