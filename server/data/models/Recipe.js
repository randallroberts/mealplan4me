const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Product Schema
const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "Any"
    },
    dateToMake: {
        type: Date,
        required: false
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
        type: String,
        required: false
    }
});

// Export the Schema
module.exports = Recipe = mongoose.model("Recipe", RecipeSchema);