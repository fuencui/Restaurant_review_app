import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import NavBar from './NavBar';

export default function UserAccount(props){
    const[user, setUser] = useState(undefined);
    const param = useParams();


    useEffect(() => {
        axios.get('/api/user/' + param.username)
        .then(function(response){
            setUser(response.data);
        })
    }, [param.username]);

    if (!user){
        return (
        <div>
            <NavBar />
            <div>
                User not found
            </div>
        </div>)
    }

    return (
        <div>
            <NavBar />
            <div>
            <h1>Username: {user.username}</h1>
        </div>
        </div>
    )
}