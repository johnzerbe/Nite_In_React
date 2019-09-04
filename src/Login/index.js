import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState(
            {[e.currentTarget.name]: e.currentTarget.value}
        )
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const login = await fetch('http://localhost:9000/auth', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedLogin = await login.json();

        console.log(parsedLogin, ' < RESPONSE FROM LOGIN');

        if(parsedLogin.status.message === 'Success') {
            console.log('YOU LOGGED IN SUCCESSFULLY');

            this.props.history.push('/home')
        }
    }

    render() {
        return (
            <div>
                Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type='text' name='username' onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type='password' name='password' onChange={this.handleChange} />
                    </label>
                    <button type='submit'>
                        Login
                    </button>
                </form>
                Don't have an account yet? <Link to='/register'>Register Here!</Link>
            </div>
        )
    }
}

export default Login;