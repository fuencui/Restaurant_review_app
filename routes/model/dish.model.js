const mongoose = require('mongoose');

const DishSchema = require('../schema/dish.schema');

const DishModel = mongoose.model("Dish", DishSchema);

function createDish(dish) {
    return DishModel.create(dish);
}

function getAllDish() {
    return DishModel.find().exec();
}

function getDishById(id) {
    return DishModel.findById(id).exec();
}

function deleteDishById(dishId){
    return DishModel.deleteOne({dishId:dishId});
}

function updateRateByDishId(dishId, update){
    return DishModel.updateOne({_id:dishId}, update).exec();
}

function getDishBySearch(search){
    return DishModel.find({
        $or: [
            {username: {'$regex' : search, '$options': 'i'}},
            {dishName: {'$regex' : search, '$options': 'i'}},
            {restaurant: {'$regex' : search, '$options': 'i'}},
            {description: {'$regex' : search, '$options': 'i'}},
            {address: {'$regex' : search, '$options': 'i'}}
          ]
        }).exec();

}

module.exports = {
    createDish,
    getAllDish,
    getDishById,
    deleteDishById,
    updateRateByDishId,
    getDishBySearch,
}
