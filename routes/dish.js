const express = require('express');
const router = express.Router();
const DishModel = require('./model/dish.model');

router.get('/', function(request, response) {
    DishModel.getAllDish()
    .then ((allDish) => response.status(200).send(allDish))
    .catch(error => response.status(400).send(error));
})

router.get('/:dishId', function(request, response) {

    const dishId = request.params.dishId
    return DishModel.getDishById(dishId)
        .then(dish => {
                response.status(200).send(dish);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.get('/search/:searchId', function(request, response) {
    const searchId = request.params.searchId;
    return DishModel.getDishBySearch(searchId)
        .then(dish => {
            response.status(200).send(dish);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.post('/', (req, res) => {
    const body = req.body;
    return DishModel.createDish({
        dishName: body.dishName,
        restaurant: body.restaurant,
        description: body.description,
        rank: body.rank,
        address: body.address ? body.address : 'null',
        base64: body.base64 ? body.base64 : 'null',
        username: body.username
    })
    .then(dish => res.status(200).send(dish))
    .catch(error => res.status(400).send(error));
});


router.delete('/deleteDish/:dishId', function(request, response){
    const dishId = request.params.dishId
    return DishModel.deleteDishById(dishId)
        .then(comments => {
                response.status(200).send(comments);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.put('/:dishId', function(request, response){
    const dishId = request.params.dishId;
    const body = request.body;
    return DishModel.updateRateByDishId(dishId, body)
        .then(comments => {
                response.status(200).send(comments);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})




module.exports = router;