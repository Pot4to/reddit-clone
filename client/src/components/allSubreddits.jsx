import React from 'react';

class AllSubreddits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    changeSubreddit(sub) {
        this.props.changeView(null, 'subreddit');
        this.props.changeSub(sub);
    }

    render() {
        return (
            <div className="left-center">
                <h1>Subreddits</h1>
                {this.props.subreddits.map((sub) => {
                    return <a className="pointer" key={Math.random()} onClick={() => this.changeSubreddit(sub)}>{'r/' + sub.name}<br/><br/></a>
                })}
            </div>
        );
    }
}

export default AllSubreddits;