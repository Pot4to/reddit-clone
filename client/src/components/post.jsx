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

    render() {
        return (
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                    <div className="header" onClick={(event) => this.props.changeActivePost(event, this.props.post) } >{this.props.post.title}</div>
                    <div className="meta">{this.props.post.username}</div>
                    <div className="meta">Likes: {this.props.post.likes}
                        <div className="ui large buttons">
                            <button className="ui button" onClick={this.like}>Like</button>
                            <button className="ui button" onClick={this.dislike}>Dislike</button>
                        </div>
                    </div>
                    <a className="meta">Comments</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;