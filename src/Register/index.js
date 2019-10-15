import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react'

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState (
            {[e.currentTarget.name]: e.currentTarget.value}
        )
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const register = await fetch (process.env.REACT_APP_BACKEND_URL + '/auth/register', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedRegister = await register.json();

        console.log(parsedRegister, ' < RESPONSE FROM REGISTER');

         if(parsedRegister.status.code === 400){
             this.setState({
                message: parsedRegister.status.message
             })
         }

        if(parsedRegister.status.message === 'Success'){
            console.log('REGISTERED SUCCESSFULLY');

            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <div className='loginPage'>
                <h1 className='loginTitle'>Register Account</h1>
                <Form error className='loginForm' onSubmit={this.handleSubmit}>
                    <Form.Input type='text' name='username' placeholder='Create Username' onChange={this.handleChange}/>
                    <Form.Input type='password' name='password' placeholder='Create Password' onChange={this.handleChange}/>
                    { this.state.message !== "" ? <Message
                    error
                    header='Wait a Minute!'
                    content= {this.state.message}
                    /> : null}
                    <Button type='submit' className='bottomBtn'>Register</Button>
                </Form>
                <Link to='/'>Back to Login</Link>
            </div>
        )
    }
}

export default Register