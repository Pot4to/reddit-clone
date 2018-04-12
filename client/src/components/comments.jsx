import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            comments: [],
            newCommentText: '',
            username: 'nickv',
            activeComment: '0'
        }
        this.renderComments = this.renderComments.bind(this);
        this.formatCommentObject = this.formatCommentObject.bind(this);
    }

    componentWillMount() {
        $.ajax({
            url: `http://localhost:3000/api/comments/${this.props.post._id}`,
            method: 'GET'
        }).done((data) => {
            this.formatCommentObject(data);
        })
    }

    commentOnAComment(event, commentId) {
        event.preventDefault();
        console.log(`username: ${this.state.username}, text: ${this.state.newCommentText}, parent: ${commentId}`);
        this.setState({ activeComment: '0' });
        // $.ajax({
        //     url: `http://localhost:3000/api/comments/${this.props.parent._id}`,
        //     method: 'POST',
        //     data: {
        //         username: `${this.state.username}`,
        //         text: `${this.state.newCommentText}`,
        //         parent: `${commentId}`
        //     }
        // }).done(this.setState({comments: this.state.comments[0], activeComment: 0}))
    }

    formatCommentObject(comments) {
        let commentObj = {};
        for (var comment of comments) {
            if (!commentObj[comment.parent]) {
                commentObj[comment.parent] = [];
            }
            commentObj[comment.parent].push(comment);
        }
        this.setState({ comments: [commentObj] });
    }

    changeVisibleComment (event, id) {
        event.preventDefault();
        this.setState({activeComment: id})
    }

    renderComments(postId) {
        let divArray = [];
        let rank = 0;

        let formatter = (comment) => {
            return (
            <div style={{border: '1px solid black'}} className={`commentLevel_${rank}`} key={comment._id}>
                <h5 className='commentLikes'>Likes: {comment.likes}</h5>
                <h5 className='commentText'>Text: {comment.text}</h5>
                <h5 className='commentUsername'>Username: {comment.username}</h5>

                <div className={this.state.activeComment === comment._id ? 'active' : 'hidden'}>
                    <input onChange={(event) => this.setState({newCommentText: event.target.value})}></input>
                    <a href='#' className='commentReply' onClick={(event) => this.commentOnAComment(event, comment._id)}>Reply</a>
                </div>

                <a href='#' className={this.state.activeComment === comment._id ? 'hidden' : 'active'} onClick={(event) => this.changeVisibleComment(event, comment._id)}> Click to reply </a>
            </div>)
        }
        
        let recursion = (postId) => {
            if (this.state.comments.length === 0) {
                return <h5>No Comments</h5>
            } else if (this.state.comments[0] === undefined || this.state.comments[0][postId] === undefined) {
                return <div>No children</div>
            } else {
                rank++;
                this.state.comments[0][postId].map((comment) => {
                    divArray.push(formatter(comment));
                    recursion(comment._id);
                    return comment;
                })
                rank--;
            }
        }
        
        recursion(postId);
        return divArray;
    }
    
    render() {
        return (
            <div>
                
                <div>{this.renderComments(this.props.post._id)}</div>
            
            </div>
        )
    }
}

export default Comments;