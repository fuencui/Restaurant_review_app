import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button, Form, FormControl} from "react-bootstrap"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './NavBar.css';
import InsertDish from './InsertDish';


export default function NavBar(props) {
    const [formInput, setFormInput] = useState('');
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(function() {
        axios.get('/api/user/isLoggedIn')
        .then(response => setUsername(response.data.username))
        .catch(error => console.log("User is not logged in " + username));
    }, [username])

    async function logout(){
        let promise = new Promise((resolve, reject) => {
            axios.post('/api/user/logout')
            .then(reponse => {
                resolve(null);
            })
            .catch(error => reject('Error logging out'));
        });
        let result = await promise;
        if (result === null){
            setUsername(result);
            navigate('/')
        }
    }

    function handleSearch(){
        navigate('/search/' + formInput)
        
    }


    function underDropDown(){
        if (username){
            return (
                <NavDropdown title={<i className="bi bi-person-check-fill">{username}</i>} id="navbarScrollingDropdown">
                <NavDropdown.Item href={"/userAccount/" + username} >User Account</NavDropdown.Item>
                <NavDropdown.Item href="#action4">My Reviews</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
                
            )
        } else {
            return (
                <NavDropdown title='Register Or Log In' id="navbarScrollingDropdown">
                <NavDropdown.Item href='/createUser'>Create New Account</NavDropdown.Item>
                <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                </NavDropdown>
            )
        }
    }

    function ableToReviews(){
        if (username){
            return <Nav.Item><InsertDish/></Nav.Item>
        }
    }

    function handleKeyPress(event) {
        if(event.key === 'Enter'){
            navigate('/search/' + formInput)
        }
      }

    return (
        <div className='navBar'>
        <Navbar bg="light" expand="lg" >
        <Container fluid className="nana">
            <Navbar.Brand href="/"><i className="bi bi-camera-fill"></i> FoodReviewApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/"><i className="bi bi-shop">Home</i></Nav.Link>
                {underDropDown()}
                {ableToReviews()}
            </Nav>
            
            <Form className="d-flex">
                <FormControl
                type="text"
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                
                />
                <Button onClick={handleSearch}
                variant="outline-success"
                >
                Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>
    )
}