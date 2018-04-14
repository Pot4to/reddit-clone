import React from 'react';
import axios from 'axios';

class LoggedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    clickHandler(event, view) {
        this.props.changeView(event, view);
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
            <div className='loginform'>
            <div >Logged in as Username: <br/>{this.props.username} </div> <br/>
            <a href='#' onClick={(event) => this.clickHandler(event, 'createSubreddit')} >Create Subreddit</a> <br/>
            <a href='#' onClick={(event) => this.clickHandler(event, 'createPost')} >Create Post</a> <br/>
            <a href='#' onClick={this.logoutHandler.bind(this)}>Logout</a>
            </div>
        )
    }
}

export default LoggedIn;