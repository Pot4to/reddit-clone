import React from 'react';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
    }

    like() {

        if (this.props.username === '') {
            console.log('error, cannot vote without logging in');
        } else {
            axios.post(`/api/post/vote/${this.props.post._id}/${this.props.username}/${this.props.post.username}/increment`)
                .then(() => {
                    var criteria = this.props.order === 'likes' ? 'likes' : 'time';
                    this.props.fetchPosts(criteria);
                });
        }
    }

    dislike() {
        if (this.props.username === '') {
            console.log('error, cannot vote without logging in');
        } else {
            axios.post(`/api/post/vote/${this.props.post._id}/${this.props.username}/${this.props.post.username}/decrement`)
                .then(() => {
                    var criteria = this.props.order === 'likes' ? 'likes' : 'time';
                    this.props.fetchPosts(criteria);
                });
        }
             
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
                    <a className="header pointer" href={`http://${this.props.post.url}`} target="_blank">{this.props.post.title}</a>
                    <div className="meta"><span className="light-font">posted by:</span> {this.props.post.username}</div>
                    <p className="meta pointer" onClick={(event) => this.props.changeActivePost(event, this.props.post)}>Comments</p>
                </div>
                <div>
                    {this.props.currentView === 'comments' ? 
                    <div>
                        <div>{this.props.post.text}</div> 
                        <div>
                        {this.props.post.imageurl !== 'none' ? <img src={this.props.post.imageurl} /> : null}
                        </div>
                    </div> : null}
                    
                </div>
            </div>    
        );
    }
}

export default Post;