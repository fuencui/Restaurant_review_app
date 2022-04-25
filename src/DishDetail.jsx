import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import NavBar from './NavBar';
import { Button, Offcanvas ,InputGroup ,FormControl} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './DishDetail.css';

export default function DishDetail(props){
    const[dish, setDish] = useState(undefined);
    const[commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState({
        username: null,
        comment: '',
        rank: '',
        dishId: null,
    })
    const [show, setShow] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = await axios.get('/api/dish/' + param.dishId)
            .then(function(response){
                setDish(response.data);
                setComment({...comment, dishId: param.dishId})
                return param.dishId;
            })
            .catch(error => console.log("cannot find dish"))

            await axios.get('/api/user/isLoggedIn')
            .then(response => setComment({...comment, dishId: id,username:response.data.username}))
            .catch(error => console.log("User is not logged in "))
          }
        fetchData();
        findAllComment();
        } ,[setComment,setCommentList,setDish] );

    function findAllComment() {
        axios.get('/api/comment/Id/' + param.dishId)
            .then(function(response){
                setCommentList(response.data);
            })
            .catch(e => console.log(e));
    }


    async function postComment(){
        try {
            if (comment.username && comment.dishId){
                await axios.post('/api/comment', comment)
                .then((commentResponse) => {
                console.log(commentResponse)})
                .catch(e => console.log(e));
                setShow(false);
            }
        } catch (e) {
            console.log(e);
        } finally{
            averageAllRating();
            findAllComment();
        }
    }

    if (!dish){
        return (<div>
            Dish not found
        </div>)
    }

    function base64ToImage(dish){
        if(dish.base64 !== 'null'){
            return <img className='img' src={dish.base64}></img>
        } else {
            return <h1>Image Not Exists</h1>;
        }
    } 

    async function handleDeleteReview(){
        try {
            await axios.delete('/api/comment/deleteAll/' + param.dishId)
            .then(res => console.log('detele all'))
            .catch(e => console.log(e));
            await axios.delete('/deleteDish/' + param.dishId)
            .then(res => navigate('/dish'))
            .catch(e => console.log(e));

        } catch (e) {
            console.log(e);
        }
    }

    async function handleDeleteComment(){
        try {
            await axios.delete('/api/comment/deleteUsernameAndDishId/' + param.dishId + '/' + dish.username)
            .then(res => console.log(res))
            .catch(e => console.log(e));
        } catch (e){
            console.log(e);
        } finally {
            findAllComment();
        }
    }

    async function handleEdit(){
        try {
            await axios.put('/api/comment/updateComment/' + param.dishId + '/' + dish.username, comment)
            .then(res => console.log(res))
            .catch(e => console.log(e));
        } catch (e){
            console.log(e);
        } finally {
            findAllComment();
            setShowComment(false);
            averageAllRating();
        }
    }

    async function averageAllRating(){
        if (!dish) return
        let numberOfuser = commentList.length + 2;
        let ratingTotal = parseInt(dish.rank) + parseInt(comment.rank);
        let newRate = dish.rank;
        try {
            for (let rate of commentList){
                ratingTotal += rate.rank;
            }
        } catch (e){
            console.log(e);
        } finally {
            newRate = (ratingTotal/numberOfuser);
            axios.put('/api/dish/' + param.dishId, {rank:newRate})
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }
        return setDish({...dish, rank:newRate})
    }

    function ableToDetele(){
        if (comment.username === dish.username){
            return (
                <div>
                    <Button variant="success" size='sm' style={{backgroundColor : '#70a9a1', border : '0px'}}onClick={handleDeleteReview}>
                        Detele This Review
                    </Button>
                </div>
            )
        }
    }

    function ableToDeteleCommentEdit(username){
        if (username === comment.username){
            return (
                <div>
                    <Button variant="success" size='sm' style={{backgroundColor : '#70a9a1', border : '0px'}}onClick={handleDeleteComment}>
                        Detele Comment
                    </Button>
                    
                    <Button variant="success" size='sm' style={{backgroundColor : '#70a9a1', border : '0px'}}onClick={handleShowComment}>
                        Edit Comment
                    </Button>
                    <Offcanvas show={showComment} onHide={handleCloseComment}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title><i className="bi bi-egg-fried"></i>Edit A Comment</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
            
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm" >Comment</InputGroup.Text>
                        <FormControl type='text' value={comment.comment} onChange={e => {setComment({...comment, comment: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
            
                    <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Rank</InputGroup.Text>
                        <FormControl type='number' value={comment.rank} min="0" max="5" step="0.5" onChange={e => {setComment({...comment, rank: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    
                    <Button variant="primary" size="sm" onClick={handleEdit} style={{backgroundColor : '#90be6d', border: '0px'}}>
                        Edit Comment
                    </Button>
                    </Offcanvas.Body>
                    </Offcanvas>
                    </div>
            )
        }
    }

    function abltToReview(){
        if(comment.username != null){
            return (
                <div>
                <Button variant="success" style={{backgroundColor : '#70a9a1', border : '0px'}}onClick={handleShow}>
                Write a Comment
                </Button>
                <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title><i className="bi bi-egg-fried"></i>Write a Comment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
        
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm" >Comment</InputGroup.Text>
                    <FormControl type='text' value={comment.comment} onChange={e => {setComment({...comment, comment: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
        
                <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Rank</InputGroup.Text>
                    <FormControl type='number' value={comment.rank} min="0" max="5" step="0.5" onChange={e => {setComment({...comment, rank: e.target.value})}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                
                <Button variant="primary" size="lg" onClick={postComment} style={{backgroundColor : '#90be6d', border: '0px'}}>
                    Post Comment
                </Button>
                </Offcanvas.Body>
                </Offcanvas>
                </div>
            )
        } else {
            return (
            <div>
            <Button variant="success" style={{backgroundColor : '#70a9a1', border : '0px'}}>
                Login To Write A Review
            </Button>
            </div>
            )
        }
    }

    const dishDetailComponent = [];
    for (let comment of commentList){
        dishDetailComponent.push(
            <div className='commentContainer' key={comment._id}>
                <h3>Username: {comment.username}</h3>
                <h3>Commennt: {comment.comment}</h3>
                <h3>Rank: {comment.rank}</h3> 
                {ableToDeteleCommentEdit(comment.username)} 
            </div>
    )}

    return (
        <div>
            <NavBar/>
            <div className='mainDetailContainer'>
                <div className='buttonMid'>{abltToReview()}</div>
                <div className='reviewContainer' key={dish._id}>
                    {base64ToImage(dish)}
                    <h3>Username: {dish.username}</h3>
                    <h3>Average Rank: {dish.rank}</h3>
                    {ableToDetele()}
                </div>
                {dishDetailComponent}
                
            </div>
            

        
        </div>
    )
}