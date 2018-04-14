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

//props: 

//  username
//  changeactivepost(event,post)


    componentWillMount() {
//server call for all of users particular posts
        axios.get(`http://localhost:3000/api/user/${this.props.username}`)
            .then((data) => {
                this.setState({posts: data});
            });
    }

    render() {
        return (
            <div>

                {
                    this.state.posts.map((post) => { 
                        return (
                            <div className="ui cards">
                                <div className="card">
                                    <div className="content">
                                        <div className="header" >{post.title}</div>
                                        <div className='meta'>{post.text}</div>
                                        <div className="meta">Likes: {post.likes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default User;