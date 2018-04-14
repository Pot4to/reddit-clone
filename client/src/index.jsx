import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './components/comments.jsx'
import Home from './components/home.jsx';
import CreateSubreddit from './components/createSubreddit.jsx';
import Subreddit from './components/subreddit.jsx';
import CreatePost from './components/createPost.jsx';
import Post from './components/post.jsx';
import Login from './components/login.jsx';
import LoggedIn from './components/loggedIn.jsx';
import User from './components/user.jsx';


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
        username: ''
      }

    this.fetchSubs = this.fetchSubs.bind(this);
    this.changeActivePost = this.changeActivePost.bind(this);
    this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        axios.get('/api/user/loggedIn')
        .then(response => {
            if (response.data.user) {
                this.setState({
                    loggedIn: true,
                    username: response.data.user
                })
                console.log(this.state.username);
            }
        })
        .catch(err => {
            console.log(err);
        }) 
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

    renderSubs() {
        return this.state.subreddits.map((sub) => {
            return (< div className = "ui button" key={Math.random()} onClick={() => this.setState({ view: 'subreddit', activeSub: sub })}> {sub.name} </div >);
        }).slice(0, 7);
    }

    changeActivePost(event, post) {
        if (event) event.preventDefault();
        this.setState({activePost: post, view: 'comments'});
    }
    
    changeView(event, view) {
        if (event) event.preventDefault();
        this.setState({view: view});
    }

    renderView() {
        const { view } = this.state;

        if (view === 'feed') {
            // home feed with all the top posts
            return (<Home username={this.state.username} changeActivePost={this.changeActivePost} />)
        } else if (view === 'subreddit'){
            // view to display an individual subreddit
            return (<Subreddit changeView={this.changeView} activeSub={this.state.activeSub} />)
        } else if (view === 'createSubreddit' && this.state.loggedIn === true) {
            // view to create a subreddit
            return <CreateSubreddit />
        } else if (view === 'createPost' && this.state.loggedIn === true) {
            // view to create a new post
            return <CreatePost changeView={this.changeView} subreddit={this.state.activeSub === '' ? 'main' : this.state.activeSub} username={this.state.username} />
        } else if (view === 'logIn') {
            //view to log in
        } else if (view === 'signUp') {
            // view to sign up
        } else if (view === 'comments') {
            // view to display comments on a post
            return (
            <div>
                <Post username={this.state.username} post={this.state.activePost} changeActivePost={this.changeActivePost}/>
                <div>
                <Comments username={this.state.username} post={this.state.activePost}/></div>
            </div>
            )
        } else if ((view === 'createSubreddit' || view === 'createPost') && this.state.loggedIn === false) {
            this.setState({view: 'logIn'});
        } else if (view === 'user') {
            return <User changeActivePost={this.changeActivePost} username={this.state.username} />
        }
    }

    loginHandler(param) {
        console.log('In Log In Handler...');
        this.setState({
            loggedIn: true,
            username: param
         });
        console.log('User changed to ...', this.state.username);
        console.log('State changed to ...', this.state.loggedIn);
    }

    logoutHandler() {
        this.setState({
            loggedIn: false
        });
        console.log('State changed to ...', this.state.loggedIn)
    }

    render() {
        return (
        <div>
            <div>
                {/* THIS IS A TESTING AREA, use this area to try out your features */}
            </div>    

            <div>
                <div className="ui grid subs">
                    <div className="eight column row">
                        {this.renderSubs()}
                    </div>
                </div>
            </div>

            <div>
                <h1 className="float-left space-right" onClick={(event) => this.changeView(event, 'feed')} >Reddit</h1>
                <div className="clear-float"></div>
            </div>

            <div className="login">
                {this.state.loggedIn ? <LoggedIn changeView={this.changeView} logOut={this.logoutHandler.bind(this)} username={this.state.username}/> : <Login logIn={this.loginHandler.bind(this)} />}
            </div>

            <div className='ui buttons border-dotted'>
                {this.renderView()}
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
