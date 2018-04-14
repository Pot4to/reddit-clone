import React from 'react';
import Post from './post.jsx';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subreddits: [],
            mySubreddits: [],
            posts: [],
            orderedByLikes: false,
            orderedByTime: false
        };

        this.fetchPosts = this.fetchPosts.bind(this);
        this.orderPostsByTimestamp = this.orderPostsByTimestamp.bind(this);
        this.orderPostsByLikes = this.orderPostsByLikes.bind(this);
    }

    componentWillMount() {
        this.fetchPosts(this.orderPostsByLikes);
    }

    fetchPosts(cb) {
        axios.get(`http://localhost:3000/api/home/posts`)
             .then((response) => {
                 this.setState({ posts: response.data });
             })
             .then(() => {
                if (this.state.orderedByLikes) {
                    this.orderPostsByLikes();
                 } else if (this.state.orderedByLikes) {
                    this.orderPostsByTimestamp();
                 }
             });
    }

    orderPostsByLikes() {
        if (this.state.orderedByLikes) { return; }
        const orderedPosts = this.state.posts.sort((a, b) => b.likes - a.likes);
        this.setState({
            posts: orderedPosts,
            orderedByLikes: true,
            orderedByTime: false
        });
    }

    orderPostsByTimestamp() {
        if (this.state.orderedByTime) { return; }
        const postsByTimestamp = this.state.posts.sort((a, b) => {
            return new Date(a.createdAt).getMilliseconds() + new Date(b.createdAt).getMilliseconds();
        });
        this.setState({ 
            posts: postsByTimestamp,
            orderedByTime: true,
            orderedByLikes: false
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div className="ui buttons">
                        <button className="ui button" onClick={this.orderPostsByLikes}>Top</button>
                        <button className="ui button" onClick={this.orderPostsByTimestamp}>New</button>
                    </div>
                </div>
                {this.state.posts.map((post) => <Post key={post._id} post={post} changeActivePost={this.props.changeActivePost} fetchPosts={this.fetchPosts} />)}
            </div>
        );
    }
}

export default Home;