const express = require('express');
const router = express.Router();
const CommentModel = require('./model/comment.model');


router.get('/username/:username', function(request, response) {

    const username = request.params.username
    return CommentModel.getCommentsByUserName(username)
        .then(comments => {
                response.status(200).send(comments);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.get('/Id/:dishId', function(request, response) {
    const dishId = request.params.dishId
    return CommentModel.getCommentsById(dishId)
        .then(comments => {
                response.status(200).send(comments);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.post('/', (req, res) => {
    const body = req.body;
    console.log(CommentModel.createComment({
        username: body.username,
        comment: body.comment,
        dishId: body.dishId,
        rank: body.rank,
    }))
    res.status(200).send('good');
});

router.delete('/deleteAll/:dishId', function(request, response){
    //const dishId = request.body.dishId;
    const dishId = request.params.dishId
    return CommentModel.deleteAllCommentsByDishId(dishId)
        .then(comments => {
                response.status(200).send(comments);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.delete('/deleteUsernameAndDishId/:dishId/:username', function(request, response){
    
    const dishId = request.params.dishId;
    const username = request.params.username;
    return CommentModel.deleteSingleCommentByUsernameDishId(username, dishId)
        .then(comments => {
                response.status(200).send(comments);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.put('/updateComment/:dishId/:username', function(request, response){
    
    const dishId = request.params.dishId;
    const username = request.params.username;
    const body = request.body;
    const update = {
        username: body.username,
        comment: body.comment,
        rank: body.rank,
        dishId: body.dishId
    }
    return CommentModel.editSingleCommentByUsernameDishId(username, dishId, update)
        .then(comments => {
                response.status(200).send(comments);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})




module.exports = router;