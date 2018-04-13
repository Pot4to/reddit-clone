import React from 'react';
import axios from 'Axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
    }

    like() {
        axios.post(`http://localhost:3000/api/post/vote/${this.props.post._id}/${this.props.post.username}/increment`)
             .then(this.props.fetchPosts);
    }

    dislike() {
        axios.post(`http://localhost:3000/api/post/vote/${this.props.post._id}/${this.props.post.username}/decrement`)
             .then(this.props.fetchPosts);
    }

    handleTitleClick() {
        // open this.props.post.url in a new window

    }

    render() {
        return (
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                    <a className="header" href={this.props.post.url} target="_blank">{this.props.post.title}</a>
                    <div className="meta">{this.props.post.username}</div>
                    <div className="meta">Likes: {this.props.post.likes}
                        <div className="ui large buttons">
                            <button className="ui button" onClick={this.like}>Like</button>
                            <button className="ui button" onClick={this.dislike}>Dislike</button>
                        </div>
                    </div>
                    <div className="meta">Comment</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;