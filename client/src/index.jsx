import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './components/comments.jsx'
// import connect from 'react-redux';
import Home from './components/home.jsx';
import CreateSubreddit from './components/createSubreddit.jsx';

class App extends React.Component {
    constructor(props) {
      super(props);
      state: {
        view: 'feed';
      }
    }

    render() {
        return (
        <div>
            <div className="ui grid">
                <div className="eight column row">
                    <div className="column">Subreddits</div>
                    <div className="column">Subreddit1</div>
                    <div className="column">Subreddit2</div>
                    <div className="column">Subreddit3</div>
                    <div className="column">Subreddit4</div>
                </div>
            </div>
            <div className="ui grid">
                <div className="eight column row">
                    <div className="column">My Subreddits</div>
                    <div className="column">MySubreddit1</div>
                    <div className="column">MySubreddit2</div>
                    <div className="column">MySubreddit3</div>
                    <div className="column">MySubreddit4</div>
                </div>
            </div>
        </div>);
    }

}

let x = { _id: '5ace72088ce4a740e83be47e'}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
