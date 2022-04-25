import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import DishList from './DishList';
import CreateUser from './CreateUser';
import UserAccount from './UserAccount';
import DishDetail from './DishDetail';
import SearchList from './SearchList';


const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
    <Router>
        <Routes>
            <Route exact path='/' element={<DishList/>} />
            <Route exact path='/dish' element={<DishList/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/createUser' element={<CreateUser/>} />
            <Route exact path='/userAccount/:username' element={<UserAccount/>} />
            <Route exact path='/dish/:dishId' element={<DishDetail/>} />
            <Route exact path='/search/:searchId' element={<SearchList/>} />
        </Routes>
    </Router>
);