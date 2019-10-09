import React, { Component } from 'react';
import Welcome from '../Welcome';
import { Link } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react'


class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            message: '',
            isLogged: false,
            showJumbo: true
        }
    }

    // componentDidMount

    handleChange = (e) => {
        this.setState(
            {[e.currentTarget.name]: e.currentTarget.value}
        )
    }

    handleJumbo = () => {
        this.setState({
            showJumbo: false
        })
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

        if(parsedLogin.status.code === 400){
            this.setState({
               message: parsedLogin.status.message
            })
        }

        if(parsedLogin.status.message === 'Success') {
            console.log('YOU LOGGED IN SUCCESSFULLY');

            this.setState({
                isLogged: true
            });

            this.props.history.push('/home')
        }
    }

    render() {
        return (
            <div>
            { this.state.showJumbo 
            ?
            <div>
                 <Welcome />
                 <Button onClick={this.handleJumbo} className='bottomBtn'>Got It!</Button>
            </div>
            :
            <div className='loginPage'>
                <h1 className='loginTitle'>Login</h1>
                <Form error className='loginForm' onSubmit={this.handleSubmit}>
                    <Form.Input type='text' className='loginInput' name='username' placeholder='Username' onChange={this.handleChange}/>
                    <Form.Input type='password' className='loginInput' name='password' placeholder='Password' onChange={this.handleChange}/>
                    { this.state.message !== "" ? <Message
                    error
                    header='Wait a Minute!'
                    content= {this.state.message}
                    /> : null}
                    <Button type='submit' className='bottomBtn'>Login</Button>
                </Form>
                Don't have an account yet? <Link to='/register'>Register Here!</Link>
            </div>
            }
            </div>
        )
    }
}

export default Login;