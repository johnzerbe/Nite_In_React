import React from 'react';
import App from '../App.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Navbar, Nav } from 'react-bootstrap';

const NavBarOne = (props) =>  {
    console.log(props.location)
    return (
        <div  className='navbar'>
            
            <Link to='/mypage' className='navLink'>MyNites</Link>
            <Link to='/' className='navLink'>Logout</Link>
        </div>
    )
}

export default NavBarOne