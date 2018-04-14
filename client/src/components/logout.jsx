import React from 'react';
import axios from 'axios';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    logoutHandler() {
        axios.get('/api/logout')
          .then(response => {
              console.log('Sucessfully Logged Out', response);
              this.props.logOut();
          })
          .catch( err => {
              console.log('There was an error Logging Out', err);
          });
    }
    
    render() {
        return (
            <div className='ui input'>
                <button className='logout' onClick={this.logoutHandler.bind(this)} >Logout</button>
            </div>
        )
    }
}

export default Logout;