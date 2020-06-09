const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/mealplan', { useNewUrlParser: true })
    .then(() => console.log("Mongo connected"))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db