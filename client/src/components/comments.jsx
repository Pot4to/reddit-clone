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

    renderComments() {
        if (this.state.comments.length === 0) {
            return <h5>No Comments</h5>
        } else {
            






        }
    }

    render() {
        return (
            <div>
            {this.renderComments()}
            </div>
        )
    }
}