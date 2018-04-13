import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Post from './post';

class Subreddit extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
          subPost: [],
          currentUser: '',
          subscribed: false,
        }
        this.subscribeUser = this.subscribeUser.bind(this);
        this.getSubPost = this.getSubPost.bind(this);
    }
    
    componentWillMount() {
      getSubPost(this.props.title);
    }

    getSubPost(subreddit) {
        $.get(`/subreddit/${subreddit}`, function(data) {
            this.setState({ subPost: data});
        });
    }

    subscribeUser() {
      $.get('/subscribe', { username: this.state.currentUser, postId: this.props.id }, function(data) {
        this.setState({ subscribed: true });
      });
    }

    render() {
        return (
            <div>
                <h1>{ this.props.title }</h1>
                <div>
                {this.state.subPost.map(post => <Post post={post}>)}
                </div>
                <button onClick={subscribeUser()}>Subscribe!</button>
            </div>
        )
    }
}

export default Subreddit;