import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Post from './post.jsx';

class Subreddit extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
          subPosts: [], 
          subscribed: false, //Need to check on clicking into this sub if the user is subbed and react accordingly
        }
        this.subscribeUser = this.subscribeUser.bind(this);
        this.getSubPost = this.getSubPost.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.name !== nextProps.name) {
            this.getSubPost(nextProps.activeSub._id);
        }
    }

    componentWillMount() {
        this.getSubPost(this.props.activeSub._id);
    }

    getSubPost(subredditId) {
        axios.get(`/api/subreddit/${subredditId}`, {
            params: {
                id: subredditId //need to change to subredditId
            }
        })
        .then((response) => {
            this.setState({subPosts: response.data });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    subscribeUser(subRedditId, userId) {
       var appThis = this;
       axios.post(`/api/subscription/${userId}`, {
               userId,
               subRedditId
       })
       .then((response) => {
           console.log('subscribe subreddit inside response: ', response);
       })
       .catch((error) => {
          console.log(error);
       }); 
    }

    render() {
        return (
            <div>
                <div className="subscribe-button">
                <button onClick={() => {this.subscribeUser(this.props.subreddit._id, this.props.username._id)}}>Subscribe</button>
                </div>

                <div>
                <h2 className="subreddit-header space-left border-dotted-blue" >
                    {this.props.activeSub.name}
                </h2>
                <h5>{this.props.activeSub.description}</h5>
                </div>

                <div>
                    {this.state.subPosts.map(post => <Post key={Math.random()} changeActivePost={this.props.changeActivePost} post={post} />)}
                </div>
            </div>
        );
    }
}

export default Subreddit;