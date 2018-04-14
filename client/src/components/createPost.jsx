import React from 'react';
import axios from 'Axios';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            text: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleSubmit() {
        var username = "aaron123";
        axios.post(`api/create-post/${username}/${this.state.title}/${this.state.url}/${this.state.text}`); // need to access username from props
        // change view prop in index.jsx state to home page view
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
        <div>
            <h1>Create a new Post</h1>
            <div className="ui large form">
                <div className="two fields">
                    <div className="field">
                <label>Title</label>
                <input placeholder="First Name" type="text" name="title" onChange={this.handleChange}></input>
                </div>
                <div className="field">
                <label>URL</label>
                <input placeholder="Last Name" type="text" name="url" onChange={this.handleChange}></input>
                </div>
            </div>
            <div className="ui form">
                <div className="field">
                <label>Text</label>
                <textarea name="text" onChange={this.handleChange}></textarea>
                </div>
            </div>
            <div className="ui submit button" onClick={this.handleSubmit}>Submit</div>
            </div>
        </div>
        );
    }
}


export default CreatePost;