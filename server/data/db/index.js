const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;

mongoose
    .connect(`mongodb://${mongoURL}:${mongoPort}/mealplan`, { useNewUrlParser: true })
    .then(() => console.log("Mongo connected"))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db