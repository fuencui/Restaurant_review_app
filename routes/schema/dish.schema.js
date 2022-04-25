const Schema = require('mongoose').Schema;

const DishSchema = new Schema({
    dishName: String,
    restaurant: String,
    description: String,
    rank: {type: Number, min: 0, max: 5, default: 5},
    address: String,
    base64:String,
    username: String,
    builtDate: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'dish',
})


module.exports = DishSchema;