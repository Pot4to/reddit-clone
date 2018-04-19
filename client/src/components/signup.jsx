import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: ''
        }
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    signUpHandler() {
        if (this.state.password === this.state.password2) {
            var user = {
                username: this.state.username,
                password: this.state.password
            }
            axios.post('/api/user/signup', user)
              .then( response => {
                 console.log('Server replied with... ', response);
              })
              .catch( err => {
                  console.log('Server replied with ...', err);
              })
        } else {
            alert('Passwords did not match. Please try again!');
        }
    }


    render() {
        return (
            <div className='loginform'>
                <div>Username: </div>
                <input name='username' onChange={ this.onChangeHandler.bind(this) }/>
                <div>Password: </div>
                <input name='password' type='password' onChange={ this.onChangeHandler.bind(this) }/>
                <div>ReEnter Your Password: </div>
                <input name='password2' type='password' onChange={ this.onChangeHandler.bind(this) }/>
                <br/><br/>
                <button className='signup' onClick={this.signUpHandler.bind(this)} > Sign Up</button>
            </div>
        )
    }
}

export default SignUp