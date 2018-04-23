import React from 'react';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        console.log('post.jsx props', this.props);

        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
    }

    like() {
        axios.post(`/api/post/vote/${this.props.post._id}/${this.props.username}/${this.props.post.username}/increment`)
             .then(() => {
                var criteria = this.props.order === 'likes' ? 'likes' : 'time';
                this.props.fetchPosts(criteria);
             });
    }

    dislike() {
        axios.post(`/api/post/vote/${this.props.post._id}/${this.props.username}/${this.props.post.username}/decrement`)
            .then(() => {
                var criteria = this.props.order === 'likes' ? 'likes' : 'time';
                this.props.fetchPosts(criteria);
            });
             
    }


    render() {
        return (
            <div className="border">
                <div className="float-left">
                    <i className="long arrow alternate up icon likes pointer" onClick={this.like}></i>
                    <div className="meta slight-right">{this.props.post.likes}</div>
                    <i className="long arrow alternate down icon likes pointer" onClick={this.dislike}></i>
                </div>
                <div className="pad-left">
                    <a className="header pointer" onClick={(event) => this.props.changeActivePost(event, this.props.post)}>{this.props.post.title}</a>
                    <div className="meta"><span className="light-font">posted by:</span> {this.props.post.username}</div>
                    <p className="meta pointer" onClick={(event) => this.props.changeActivePost(event, this.props.post)}>Comments</p>
                </div>
                <div>
                    {this.props.post.imageurl ? <img src={this.props.post.imageurl} /> : null}
                </div>
            </div>    
        );
    }
}

export default Post;