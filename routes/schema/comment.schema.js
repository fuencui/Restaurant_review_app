const Schema = require('mongoose').Schema;

const CommentSchema = new Schema({
    username: String,
    comment: String,
    dishId: String,
    rank: {type: Number, min: 1, max: 5, default: 5},
}, {
    collection: 'comments',
})

module.exports = CommentSchema;