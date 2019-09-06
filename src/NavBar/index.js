import React from 'react';
import App from '../App.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = (props) => {
    return (
        <div>
            <Link to='/mypage'>My Nites</Link>
            <Link to='/'>Logout</Link>
        </div>
    )
}

export default NavBar