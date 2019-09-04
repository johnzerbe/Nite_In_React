import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState (
            {[e.currentTarget.name]: e.currentTarget.value}
        )
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const register = await fetch ('http://localhost:9000/auth/register', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedRegister = await register.json();

        console.log(parsedRegister, ' < RESPONSE FROM REGISTER');

        if(parsedRegister.status.message === 'Success'){
            console.log('REGISTERED SUCCESSFULLY');

            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <div>
                Register
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Create Username:
                        <input type='text' name='username' onChange={this.handleChange} />
                    </label>
                    <label>
                        Create Password:
                        <input type='password' name='password' onChange={this.handleChange} />
                    </label>
                    <button type='submit'>
                        Register
                    </button>
                </form>
                <Link to='/'>Back to Login</Link>
            </div>
        )
    }
}

export default Register