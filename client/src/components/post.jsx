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
        axios.post(`http://localhost:3000/api/post/vote/${this.props.post._id}/${this.props.username}/${this.props.post.username}/increment`)
             .then(() => {
                var criteria = this.props.order === 'likes' ? 'likes' : 'time';
                this.props.fetchPosts(criteria);
             });
    }

    dislike() {
        axios.post(`http://localhost:3000/api/post/vote/${this.props.post._id}/${this.props.username}/${this.props.post.username}/decrement`)
            .then(() => {
                var criteria = this.props.order === 'likes' ? 'likes' : 'time';
                this.props.fetchPosts(criteria);
            });
             
    }


    render() {
        return (
            <div className="ui cards border-dotted">
                <div className="card">
                    <div className="content">
                    <div className="header" onClick={(event) => this.props.changeActivePost(event, this.props.post)}>{this.props.post.title}</div>
                    <div className="meta">{this.props.post.username}</div>
                    <div className="float-left space-right">
                        <i className="long arrow alternate up icon likes like-arrows" onClick={this.like}></i>
                        <div className="meta">{this.props.post.likes}</div>
                        <i className="long arrow alternate down icon likes like-arrows" onClick={this.dislike}></i>
                    </div>
                    <a className="meta" onClick={(event) => this.props.changeActivePost(event, this.props.post)}>Comments</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;