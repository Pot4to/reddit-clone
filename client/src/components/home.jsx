import React from 'react';
import Post from './post.jsx';
import Axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subreddits: [],
            mySubreddits: [],
            posts: []
        }
    }

    fetchPost() {
        
    }

    sendLike() {

    }

    render() {
        return (
            <div>
                <div className="ui grid">
                    <div className="eight column row">
                        <div className="column">Subreddits</div>
                        <div className="column">Subreddit1</div>
                        <div className="column">Subreddit2</div>
                        <div className="column">Subreddit3</div>
                        <div className="column">Subreddit4</div>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="eight column row">
                        <div className="column">My Subreddits</div>
                        <div className="column">MySubreddit1</div>
                        <div className="column">MySubreddit2</div>
                        <div className="column">MySubreddit3</div>
                        <div className="column">MySubreddit4</div>
                    </div>
                </div>
                <div>
                    <h1 className="float-left space-right">Logo</h1>
                    <div className="clear-float"></div>
                    <div class="ui buttons">
                        <button class="ui button">Top</button>
                        <button class="ui button">New</button>
                    </div>
                </div>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        );
    }
}

export default Home;