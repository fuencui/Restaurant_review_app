const mongoose = require('mongoose');
const CommentSchema = require('../schema/comment.schema');
const CommentModel = mongoose.model("Comment", CommentSchema);

function createComment(comment) {
    return CommentModel.create(comment);
}

function getCommentsByUserName(username) {
    return CommentModel.find({username: username}).exec();
}


function getCommentsById(dishId) {
    return CommentModel.find({dishId: dishId}).exec();
}

function deleteAllCommentsByDishId(dishId){
    return CommentModel.deleteMany({dishId: dishId});
}

function deleteSingleCommentByUsernameDishId(username,dishId){
    return CommentModel.deleteOne({username:username, dishId:dishId}).exec();
}

function editSingleCommentByUsernameDishId(username, dishId, update){
    return CommentModel.findOneAndUpdate({username:username, dishId:dishId},
                                        update).exec();
}

module.exports = {
    createComment,
    getCommentsByUserName,
    getCommentsById,
    deleteAllCommentsByDishId,
    deleteSingleCommentByUsernameDishId,
    editSingleCommentByUsernameDishId,
}
