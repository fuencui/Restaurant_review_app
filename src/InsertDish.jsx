import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Offcanvas ,InputGroup ,FormControl} from "react-bootstrap";



export default function InsertDish() {
    const [dish, setDish] = useState({
        dishName: '',
        restaurant: '',
        description: '',
        rank: '',
        address: '',
        base64: '',
        username: '',
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(function() {
        axios.get('/api/user/isLoggedIn')
        .then(response => setDish({...dish, username:response.data.username}))
        .catch(error => console.log("User is not logged in "));
    }, [])


    async function postDish(){
        const promise = new Promise((resolve, reject) => {
            
            axios.post('/api/dish', dish)
            .then((dish) => {
                resolve(dish.data._id);
                
            })
            .catch(e => console.log(e));
            setShow(false);
        });
        const id = await promise;

        navigate('/dish/' + id)
    }
 
    async function handleImage(e) {
        let promise = new Promise((resolve, reject) => {
            const file = e.target.files[0];
            const filesize = file.size;
            if (filesize > 4100000){
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    resolve(e.target.result);
                }
            }
        });
        let result = await promise;

        setDish({
            ...dish,
            base64: result,
        })
    }

  return (
    <div className="insertdish">
      <Button variant="success" style={{backgroundColor : '#70a9a1', border : '0px'}}onClick={handleShow}>
        Write a Review
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><i className="bi bi-egg-fried"></i> Leave Your Review Here</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/* <div>
            <input type='text' value={dish.dishName} onChange={e => {setDish({...dish, dishName: e.target.value})}}/>
            <input type='text' value={dish.restaurant} onChange={e => {setDish({...dish, restaurant: e.target.value})}}/>
            <input type='text' value={dish.description} onChange={e => {setDish({...dish, description: e.target.value})}}/>
            <input type='number' value={dish.rank} min="0" max="5" step="0.5" onChange={e => {setDish({...dish, rank: e.target.value})}}/>
            <input type='text' value={dish.address} onChange={e => {setDish({...dish, address: e.target.value})}}/>
            <input type='file' accept="image/png, image/jpeg" onChange={e => handleImage(e)}/>
            <button onClick={postDish}>Post Job</button>
        </div> */}
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm" >Dish</InputGroup.Text>
            <FormControl type='text' value={dish.dishName} onChange={e => {setDish({...dish, dishName: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Restaurant</InputGroup.Text>
            <FormControl value={dish.restaurant} onChange={e => {setDish({...dish, restaurant: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Description</InputGroup.Text>
            <FormControl type='text' value={dish.description} onChange={e => {setDish({...dish, description: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Rank</InputGroup.Text>
            <FormControl type='number' value={dish.rank} min="0" max="5" step="0.5" onChange={e => {setDish({...dish, rank: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">address</InputGroup.Text>
            <FormControl type='text' value={dish.address} onChange={e => {setDish({...dish, address: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Image</InputGroup.Text>
            <FormControl type='file' name='file' title='title' accept="image/png, image/jpeg" onChange={e => handleImage(e)}/>
        </InputGroup>
        <Button variant="primary" size="lg" onClick={postDish} style={{backgroundColor : '#90be6d', border: '0px'}}>
            Post Review
        </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
