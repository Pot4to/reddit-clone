import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        state: {
            comments: []
        }
    }

    componentWillMount() {
        $.ajax({
            url: `http://localhost:3000/api/comments/${this.props.post._id}`,
            method: 'GET'
        }).done((data) => {
            this.setState({comments: data});
        })
    }

    renderComments(postId, commentObj) {
        if (this.state.comments.length === 0) {
            return <h5>No Comments</h5>
        } else if (commentObj !== undefined && commentObj[postId] === undefined) {
            return <div></div>
        } else {

            if (commentObj === undefined) {
                let commentObj = {};
    
                for (var comment of this.state.comments) {
                    if (!commentObj[comment.parent]) {
                        commentObj[comment.parent] = [];
                    }
                    commentObj[comment.parent].push(comment);
                }
            }

            commentObj[postId].map((child) => {
                return (
                    <div className={child._id} key={child._id}>
                        <h5 className='commentLikes'>{child.likes}</h5>
                        <h5 className='commentText'>{child.text}</h5>
                        <h5 className='commentUsername'>{child.username}</h5>
                        <h5 className='commentReply'>Reply</h5>
                        {renderComments(child._id, commentObj)}
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
            {this.renderComments(this.props.post._id)}
            </div>
        )
    }
}

export default Comments;