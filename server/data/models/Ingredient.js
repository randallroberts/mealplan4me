const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Product Schema
const IngredientSchema = new Schema({
    ingredientEdamamId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    measurement: {
        quantity: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        required: true,
        default: "Other"
    },
    image: {
        type: String,
        required: false
    },
    datePurchased: {
        type: Date,
        required: true,
        default: Date.now
    },
    store: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    nutrition: {
        calories: {
            type: Number,
            required: false
        },
        protein: {
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
        }
    }
});

// Export the Schema
module.exports = Ingredient = mongoose.model("Ingredient", IngredientSchema);