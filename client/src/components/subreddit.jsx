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
        // this.subscribeUser = this.subscribeUser.bind(this);
        this.getSubPost = this.getSubPost.bind(this);
    }
    
    componentWillMount() {
      console.log(this.props);  
      this.getSubPost(this.props.activeSub._id);
    }

    getSubPost(subredditId) {
        var appThis = this;
       axios.get(`api/subreddit/${subredditId}`, {
           params: {
               id: subredditId 
           }
       })
       .then(function (response) {
           appThis.setState({ subPosts: response.data })
           console.log('get sub post response: ', response.data);
       })
       .catch(function(error) {
           console.log(error);
       });
    }

    // subscribeUser() {
    // }

    render() {
        return (
            <div>
                <h1>{ this.props.title }</h1>
                <div>
                {this.state.subPosts.map(post => <Post post={post} />)}
                </div>
                {/* <button onClick={this.subscribeUser()}>Subscribe!</button> */}
            </div>
        )
    }
}

export default Subreddit;

// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });