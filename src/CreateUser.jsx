import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import './CreateUser.css';

export default function CreateUser(props) {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function createNewUser() {
        axios.post('/api/user', {username, password})
            .then(response => {
                console.log("Created user");
                console.log(response.data);
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='CreateUserContainer'>
            <NavBar className='navbar'/>
            <div className='mainContainer'>
                <h1>Sign In</h1>
                <h5>
                    Username
                </h5>
                <input value={username} onChange={e => setUsername(e.target.value)} />
                <h5>
                    Password
                </h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                <button type="button" className="btn btn-warning button" 
                        onClick={createNewUser}>
                        Sign In
                </button>

            </div>
        </div>

    )


} 