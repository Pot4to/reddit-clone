import React from 'react';
import ReactDOM from 'react-dom';
// import connect from 'react-redux';
import Comments from './components/comments.jsx'
import Home from './components/home.jsx';
import CreateSubreddit from './components/createSubreddit.jsx';
import CreatePost from './components/createPost.jsx';
import Post from './components/post.jsx';
import Login from './components/login.jsx';

import axios from 'axios';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        view: 'feed',
        subreddits: [],
        posts: [],
        loggedIn: false,
        activePost: '',
        activeSub: '',
      }

    this.fetchSubs = this.fetchSubs.bind(this);
    this.changeActivePost = this.changeActivePost.bind(this);
    }

    componentWillMount() {
        this.fetchSubs();
    }

    fetchSubs() {
        axios.get(`http://localhost:3000/api/subs`)
            .then((response) => {
                this.setState({
                    subreddits: response.data
                });
            }
        );  
    }

    handleChangePost(event) {

    }

    renderSubs() {
        return this.state.subreddits.map((sub) => {
            return (< div className = "column" key={Math.random()} > {sub.name} </div >);
        }).slice(0, 5);
    }

    changeActivePost(event, post) {
        event.preventDefault();
        this.setState({activePost: post, view: 'comments'});
    }

    renderView() {
        const { view } = this.state;

        if (view === 'feed') {
            // home feed with all the top posts
            return (<Home changeActivePost={this.changeActivePost} />)
        } else if (view === 'subreddit'){
            // view to display an individual subreddit
        } else if (view === 'createSubreddit' && this.state.loggedIn === true) {
            // view to create a subreddit
        } else if (view === 'createPost' && this.state.loggedIn === true) {
            // view to create a new post
        } else if (view === 'logIn') {
            //view to log in
        } else if (view === 'signUp') {
            // view to sign up
        } else if (view === 'comments') {
            // view to display comments on a post
            return (
            <div>
                <Post post={this.state.activePost} />
                <div>
                <Comments post={this.state.activePost}/></div>
            </div>
            )
        } else if (view === 'post') {

        }
    }

    render() {
        return (
            <div>
                <div>
                    {/* THIS IS A TESTING AREA, use this area to try out your features */}
                </div>    



                <div>
                    <h1 className="float-left space-right">Logo</h1>
                    <div className="clear-float"></div>
                    <div className="ui grid">
                        <div className="eight column row">
                            {this.renderSubs()}
                        </div>
                    </div>

                    <div>
                        {this.renderView()}
                    </div>


                </div>

            </div>
        );
    }
}

let x = { _id: '5ace72088ce4a740e83be47e'}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
