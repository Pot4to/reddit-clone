import React from 'react';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
        <div>
            <div className="ui large form">
                <div className="two fields">
                    <div className="field">
                <label>First Name</label>
                <input placeholder="First Name" type="text"></input>
                </div>
                <div className="field">
                <label>Last Name</label>
                <input placeholder="Last Name" type="text"></input>
                </div>
            </div>
            <div className="ui submit button">Submit</div>
            </div>
        </div>
        );
    }
}


export default CreatePost;