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
      console.log(this.props.activeSub._id, 'props');  
      this.getSubPost(this.props.activeSub._id);
    }

    getSubPost(subredditId) {
        var appThis = this;
       axios.get(`api/subreddit/${subredditId}`, {
           params: {
               id: 'cats' //need to change to subredditId
           }
       })
       .then(function (response) {
            
           console.log('get sub post response: ', response);
           appThis.setState({ subPosts: response.data })
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
                <button onClick={() => {this.subscribeUser('testsubredditId', 'testUserId')}}>Subscribe</button>
                </div>

                <div>
                <h2 className="subreddit-header space-left border-dotted-blue">
                    <img className="subreddit-header-image" src={require("../../dist/defaultsubreddit.png")} />
                    Subreddit Topic {/* { this.props.title } */}
                </h2>
                </div>

                <div>
                    {this.state.subPosts.map(post => <Post post={post} />)}
                </div>
            </div>
        );
    }
}

export default Subreddit;