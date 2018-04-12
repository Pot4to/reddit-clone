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
        };

        this.fetchPosts = this.fetchPosts.bind(this);
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

    render() {
        return (
            <div>
                <div>
                    <h1 className="float-left space-right">Logo</h1>
                    <div className="clear-float"></div>
                    <div className="ui buttons">
                        <button className="ui button">Top</button>
                        <button className="ui button">New</button>
                    </div>
                </div>
                {this.state.posts.map((post) => <Post key={post._id} post={post} fetchPosts={this.fetchPosts}/>)}
            </div>
        );
    }
}

export default Home;