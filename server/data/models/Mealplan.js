const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Product Schema
const MealplanSchema = new Schema({
    mealplanDate: {
        type: Date,
        required: false
    },
    meals: {
        breakfast: {
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
        },
        lunch: {
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
        },
        dinner: {
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
        },
        snacks: {
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
        }
    }
});

// Export the Schema
module.exports = Mealplan = mongoose.model("Mealplan", MealplanSchema);