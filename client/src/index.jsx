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
    this.renderSubs = this.renderSubs.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
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
        });
    }

    componentWillMount() {
        this.fetchSubs();
    }

    fetchSubs() {
        axios.get(`/api/subs`)
            .then((response) => {
                console.log('subs have been fetched', response);
                this.setState({
                    subreddits: response.data,
                    view: 'feed'
                });
            }
        );  
    }

    renderSubs() {
        console.log('Rendering subs, state is now', this.state);
        return this.state.subreddits.map((sub) => {
            return (<div className="ui orange basic button" key={Math.random()} onClick={() => this.setState({ view: 'subreddit', activeSub: sub })}> {sub.name} </div >);
        }).slice(0, 7);
    }

    changeActivePost(event, post) {
        console.log('chnaging active post,', event, post);
        if (event) event.preventDefault();
        this.setState({activePost: post, view: 'comments'});
    }
    
    changeView(event, view) {
        if (event) event.preventDefault();
        this.setState({view: view});
    }

    fetchPosts() {
        console.log('fetching posts', this.state);
        axios.get(`/api/post/${this.state.activePost._id}`)
            .then((response) => {
                console.log('fetch post response', response.data)
                this.setState({ activePost: response.data[0] });
            });
    }

    renderView() {
        const { view } = this.state;

        if (view === 'feed') {
            // home feed with all the top posts
            return (<Home username={this.state.username} changeActivePost={this.changeActivePost} currentView={this.state.view}/>)
        } else if (view === 'subreddit'){
            // view to display an individual subreddit
            return (<Subreddit name={this.state.activeSub.name} changeView={this.changeView} changeActivePost={this.changeActivePost} activeSub={this.state.activeSub} username={this.state.username}/>)
        } else if (view === 'createSubreddit' && this.state.loggedIn === true) {
            // view to create a subreddit
            return <CreateSubreddit changeView={this.changeView} fetchSubs={this.fetchSubs} />
        } else if (view === 'createPost' && this.state.loggedIn === true) {
            // view to create a new post
            if (this.state.activeSub === '') {
                return <div> You must be on a subreddit in order to create a post</div>
            } else {
                return <CreatePost changeView={this.changeView} subreddit={this.state.activeSub === '' ? 'main' : this.state.activeSub} username={this.state.username} />
            }
        } else if (view === 'comments') {
            // view to display comments on a post
            return (
            <div>
                <Post 
                    username={this.state.username} 
                    fetchPosts={this.fetchPosts} 
                    post={this.state.activePost} 
                    changeActivePost={this.changeActivePost} 
                    currentView={this.state.view}
                />
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
                <img className="img-size float-left" src={require('../dist/splashy.png')} alt="reddit whale"/>
            </div>

            <div>
                <h1 className="float-left space-right pointer" onClick={(event) => this.changeView(event, 'feed')} >Reddit</h1>
                <div className="clear-float"></div>
            </div>

            <div className="orange-banner">
                <p className="big-font">Welcome to Reddit</p>
                {this.state.loggedIn === false ? <p className="med-font">login or sign up to start posting</p> : null}
                
                <img className="img-size float-left face" src={require('../dist/icon.png')} alt="reddit face"/>
            </div>

            <div className="login">
                {this.state.loggedIn ? <LoggedIn changeView={this.changeView} logOut={this.logoutHandler.bind(this)} username={this.state.username}/> : <Login logIn={this.loginHandler.bind(this)} />}
            </div>

            <div className='ui buttons posts-pos'>
                {this.renderView()}
            </div>


        </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
