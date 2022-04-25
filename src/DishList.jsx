import react, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DishList.css';
import NavBar from './NavBar';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function DishList() {
    const [allDish, setAllDish] = useState([]);

    function findAllDish() {
        axios.get('/api/dish')
            .then(response => {
                setAllDish(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findAllDish, []);

    function base64ToImage(dish){
        if(dish.base64 != 'null'){
            return <img className='img' src={dish.base64}></img>
        } else {
            return <h1>Image Not Exists</h1>;
        }
    } 

    const DishListComponent = [];
    for (let dish of allDish){
        DishListComponent.unshift(
            <div className='dishContainer' key={dish._id}>
                <Link className='link' to={'/dish/' + dish._id}></Link>
                 {base64ToImage(dish)}
                <h5>Dish: {dish.dishName}</h5>
                <h5>Restaurant: {dish.restaurant}</h5>
                <h5>Average Rating: {dish.rank}</h5> 
            </div>
        )
    }

    return (
        <div>
            <NavBar onClick={findAllDish()}/>
            <h1>Recent Comments</h1>
            <div className='ListContainer'>
                {DishListComponent}
            </div>
        </div>
    )
}