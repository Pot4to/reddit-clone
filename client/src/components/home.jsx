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

    componentWillMount() {
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
                    <div className="ui buttons">
                        <button className="ui button">Top</button>
                        <button className="ui button">New</button>
                    </div>
                </div>
                {this.state.posts.map((post) => <Post key={post._id} post={post} changeActivePost={this.props.changeActivePost} fetchPosts={this.fetchPosts} />)}
            </div>
        );
    }
}

export default Home;