import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import './Login.css';

export default function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function Login() {
        console.log('username= ' + username);
        axios.post('/api/user/authenticate', {username, password})
            .then(response => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <NavBar />
            <div className='mainLoginContainer'>
                <h1>Log In</h1>
                <h5>
                    Username
                </h5>
                <input value={username} onChange={e => setUsername(e.target.value)} />
                <h5>
                    Password
                </h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" className="btn btn-warning button" 
                        onClick={Login}>
                        Log In
                </button>
            </div>
        </div>

    )


} 