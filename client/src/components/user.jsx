import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentWillMount() {

        //server call for all of users particular posts
        axios.get(`/api/userPosts/${this.props.username}`)
            .then((data) => {
                this.setState({posts: data.data});
            });
    }

    render() {
        return (
            <div>

                { this.state.posts.length > 0 ? 
                    (this.state.posts.map((post) => { 
                        return (
                            <div key={Math.random()} className="ui cards">
                                <div className="card">
                                    <div className="content">
                                        <div className="header" onClick={(event) => this.props.changeActivePost(event, post)} >{post.title}</div>
                                        <div className='meta'>{post.text}</div>
                                        <div className="meta">Likes: {post.likes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : (<div>User has no posts</div>)
                }
            </div>
        )
    }
}

export default User;