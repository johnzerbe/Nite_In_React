import React from 'react';
import App from '../App.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = (props) => {
    return (
        <div>
            <Link to='/profile'>My Nites</Link>
            <Link to='/'>Logout</Link>
        </div>
    )
}

export default NavBar