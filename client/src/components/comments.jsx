import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            comments: []
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

    renderComments(postId) {
        let divArray = [];
        let rank = 0;

        let formatter = (comment) => {
            console.log(rank);
            return (
            <div style={{border: '1px solid black'}} className={`commentLevel_${rank}`} key={comment._id}>
                <h5>{comment._id}</h5>
                <h5 className='commentLikes'>Likes: {comment.likes}</h5>
                <h5 className='commentText'>Text: {comment.text}</h5>
                <h5 className='commentUsername'>Username: {comment.username}</h5>
                <h5 className='commentReply'>LEVEL: {rank}</h5>
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

        // let leveler = (comment, rank) => {
        //     console.log(this.state.comments);
        //     console.log('comment is ', comment, 'about to check if', this.state.comments[0][comment.parent], ' is undefined');

        //     if (this.state.comments[0][comment.parent] !== undefined) {
        //         console.log('not undefined, calling again with ', comment.parent, rank);
        //         if (rank > 5) return 'dsfasdf'
        //         rank++;
        //         leveler( rank);
        //     } else {

        //         store = rank;
        //     }

        //     return store;
        // }