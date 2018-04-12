import React from 'react';

const Post = (props) => {
    return (
        <div className="ui cards">
            <div className="card">
                <div className="content">
                <div className="header">{props.post.title}</div>
                <div className="meta">{props.post.username}</div>
                <div className="meta">Likes: {props.post.likes}</div>
                <div className="meta">Comment</div>
                </div>
            </div>
        </div>
    );
};

export default Post;