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

    render() {
        return (
            <div className='loginform'>
            <div >Logged in as Username: {this.state.username} </div> <br/>
            <a href='#' onClick={(event) => this.clickHandler(event, 'createSubreddit')} >Create Subreddit</a> <br/>
            <a href='#' onClick={(event) => this.clickHandler(event, 'createPost')} >Create Post</a> <br/>
            </div>
        )
    }
}

export default LoggedIn;