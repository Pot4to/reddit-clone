import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    signUpHandler() {
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
    }

    onLoginHandler() {
        console.log('fired login handler');
        axios.get(`/api/user/login/${this.state.username}/${this.state.password}`)
          .then( response => {
              console.log('Server replied with ... ', response);
              console.log('Is logged in ? ', response.status === 202);
              
          })
          .catch( err => {
              console.log('Server errored out with ', err);
          })
    }
    
    render() {
        return (
            <div>
                <div>Username: </div>
                <input name='username' onChange={ this.onChangeHandler.bind(this) }/>
                <div>Password: </div>
                <input name='password' type='password' onChange={ this.onChangeHandler.bind(this) }/>
                <br/><br/>
                <button onClick={this.signUpHandler.bind(this)} > Sign Up</button>
                <button onClick={this.onLoginHandler.bind(this)} >Login</button>
            </div>
        )
    }
}

export default Login
