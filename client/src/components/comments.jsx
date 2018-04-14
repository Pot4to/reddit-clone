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
        this.commentOnAComment = this.commentOnAComment.bind(this);
        this.changeVisibleComment = this.changeVisibleComment.bind(this);
        this.getAndRenderComments = this.getAndRenderComments.bind(this);
    }

    componentWillMount() {
        this.getAndRenderComments();
    }

    getAndRenderComments() {
        $.ajax({
            url: `http://localhost:3000/api/comments/${this.props.post._id}`,
            method: 'GET'
        }).done((data) => {
            this.formatCommentObject(data);
        });
    }

    commentOnAComment(event, commentId) {
        event.preventDefault();
        $.ajax({
            url: `http://localhost:3000/api/comments/${commentId}`,
            method: 'POST',
            data: {
                username: `${this.state.username}`,
                text: `${this.state.newCommentText}`,
                parent: `${commentId}`
            }
        }).done((response) => {
            this.setState({activeComment: '0', }, () => this.getAndRenderComments());
        })
    }

    formatCommentObject(comments) {
        let commentObj = {};
        for (var comment of comments) {
            if (!commentObj[comment.parent]) {
                commentObj[comment.parent] = [];
            }
            commentObj[comment.parent].push(comment);
        }
        for (var key in commentObj) {
            commentObj[key].sort((a, b) => {
                return b.likes - a.likes;
            });
        }
        this.setState({ comments: [commentObj] });
    }

    changeVisibleComment (event, id) {
        event.preventDefault();
        this.setState({activeComment: id})
    }

    cancelCommentOnComment(event) {
        event.preventDefault();
        this.setState({activeComment: '0'}, );
    }

    renderComments(postId) {
        let divArray = [];
        let rank = 0;

        let formatter = (comment) => {
            return (
                <div className={`ui cards commentLevel_${rank}`} key={comment._id}>
                    <div className="card">
                        <div className="content">

                            <div className="header" >{comment.text}</div>
                            <div className="meta">{comment.username}</div>
                            <div className="meta">Likes: {comment.likes}
                            <br/>

                                <div className="ui small buttons">

                                    <button className="ui button" onClick={this.like}>Like</button>
                                    <button className="ui button" onClick={this.dislike}>Dislike</button>
                                </div>
                            </div>
                            
                            <div className={this.state.activeComment === comment._id ? 'active' : 'hidden'}>
                                <input onChange={(event) => this.setState({ newCommentText: event.target.value })}></input>
                                <a href='#' className='commentReply' onClick={(event) => this.commentOnAComment(event, comment._id)}>/_Reply_</a>
                                <a href='#' onClick={(event) => this.cancelCommentOnComment(event)}>/_Cancel_/</a>
                            </div>
                            <a href='#' className={this.state.activeComment === comment._id ? 'hidden' : 'active'} onClick={(event) => this.changeVisibleComment(event, comment._id)}> Click to reply </a>
                        </div>
                    </div>
                </div>
            )
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

                <form onSubmit={(event) => this.commentOnAComment(event, this.props.post._id)}>
                    <textarea onChange={(event) => this.setState({newCommentText: event.target.value})} rows="4" cols="50" placeholder='No Trolling Please' />
                    <button>Send</button>
                </form>
                
                <div>{this.renderComments(this.props.post._id)}</div>
            
            </div>
        )
    }
}

export default Comments;