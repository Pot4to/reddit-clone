import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class CreateSubreddit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendRequest();
    }

    sendRequest() {
        axios.post(`/api/subreddits/${this.state.name}/${this.state.description}/${this.state.image}`)
        .then(() => this.props.fetchSubs());
    }

    render() {
        return (
            <div>
                <h1>Create a new Subreddit</h1>
                <br/>
                <div className="ui input">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input onChange={(event) => this.setState({name: event.target.value})} type="text" placeholder="Subreddit Name" />
                        <input onChange={(event) => this.setState({ description: event.target.value })} type="text" placeholder="Description" />
                        <input onChange={(event) => this.setState({ image: event.target.value })} type="text" placeholder="Image" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateSubreddit;