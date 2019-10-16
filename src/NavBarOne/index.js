import React from 'react';
import App from '../App.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Navbar, Nav } from 'react-bootstrap';

const NavBarOne = (props) =>  {

    const handleLogout = (e) => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/auth/logout')
    }

    return (
        <div  className='navbar'>
            
            <Link to='/mypage' className='navLink'>MyNites</Link>
            <Link to='/' onClick={handleLogout} className='navLink'>Logout</Link>
        </div>
    )
}

export default NavBarOne