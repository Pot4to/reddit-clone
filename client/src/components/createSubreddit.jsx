import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class CreateSubreddit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendRequest({
            name: this.state.name,
            description: this.state.description,
        })

    }

    sendRequest(data) {
        $.ajax({
            url: 'http://localhost:3000/api/subreddits',
            method: 'POST',
            data: data,
        })
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
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateSubreddit;