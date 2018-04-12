import React from 'react';
import Post from './post.jsx';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subreddits: [],
            mySubreddits: [],
            posts: []
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts(postId) {
        axios.get(`http://localhost:3000/api/home/posts`)
             .then((response) => {
                 this.setState({
                     posts: response.data
                 });
             });
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
                    <div className="ui buttons">
                        <button className="ui button">Top</button>
                        <button className="ui button">New</button>
                    </div>
                </div>
                {this.state.posts.map((post) => <Post key={post._id} post={post} />)}
            </div>
        );
    }
}

export default Home;