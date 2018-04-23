import React from 'react';
import axios from 'axios';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            text: '',
            imageurl: 'none'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    
    handleSubmit(e) {
        console.log('inside submit handler', this.state.imageurl);
        e.preventDefault();
        axios.post(`/api/create-post/${this.props.username}/${this.state.title}/${this.state.url}/${this.state.text}/${this.props.subreddit._id}/${encodeURIComponent(this.state.imageurl)}`)
        .then((e) => {
            // change view prop in index.jsx state to home page view
            console.log('after the post call')
            this.props.changeView(null, 'feed');
            }).catch(err => {
                console.log(err);
            }); 
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUploadImage(ev) {
        ev.preventDefault();
    
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);
    
        fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
            this.setState({ imageurl: `http://localhost:3000/${body.file}` });
          });
        });
      }

    render() {
        return (
        <div>
            {console.log(this.state.imageURL)}
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
            <form onSubmit={this.handleUploadImage}>
                <div>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <div>
                <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                </div>
                <br />
                <div>
                <button>Upload</button>
                </div>
                <img src={this.state.imageurl} alt="img" />
            </form>
            <div className="ui submit button" onClick={(e) => this.handleSubmit(e)}>Submit</div>
            </div>
        </div>
        );
    }
}


export default CreatePost;