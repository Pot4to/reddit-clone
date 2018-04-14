import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Post from './post.jsx';

class Subreddit extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
          subPosts: [],
          currentUser: '',
          subscribed: false,
        }
        this.subscribeUser = this.subscribeUser.bind(this);
        this.getSubPost = this.getSubPost.bind(this);
    }
    
    componentWillMount() {
      this.getSubPost(this.props.activeSub._id);
    }

    getSubPost(subredditId) {
        var appThis = this;
        axios.get(`api/subreddit/${subredditId}`, {
            params: {
                id: subredditId //need to change to subredditId
            }
        })
        .then(function (response) {
            appThis.setState({ subPosts: response.data });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    subscribeUser(subRedditId, userId) {
       var appThis = this;
       axios.post(`api/subscription/${userId}`, {
               userId,
               subRedditId
       })
       .then(function(response) {
           console.log('subscribe subreddit inside response: ', response);
       })
       .catch(function(error) {
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
                    {this.state.subPosts.map(post => <Post key={Math.random()} post={post} />)}
                </div>
            </div>
        );
    }
}

export default Subreddit;