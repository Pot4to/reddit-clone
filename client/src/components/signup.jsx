import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'react-redux';
import { connect } from 'react-redux';
import $ from 'jquery';
// import './signUp.css';

class SignUp extends React.Component {
    constructor(props) {
      super(props);
      state {
         username:
         password: 
      }
    }

    addUser() {
        $.get('/signup', {} function(data) {

        });
    }

    render() {
        return (<div>
            <div className="w3ls-banner">
		        <div className="container">
			        <div className="heading">
				        <h2>Sign up to get your own personalized Reddit 0.5 experience!</h2>
				        <p>By having a Reddit account, you can subscribe, vote, and comment on all your favorite Reddit content. Sign up in just seconds.</p>
			        </div>

			        <div className="agile-form">
				        <form action="/" method="post">
					        <ul className="field-list">
						        <li>
							        <label className="form-label"> 
                                        Username 
                                        <span className="form-required"> * </span>
                                    </label>
                                    <div className="form-input">
                                        <input type="text" name="username" placeholder="" required ></input>
                                    </div>
                                </li>

                                <li>
                                    <label className="form-label">
                                    Password
                                    <span className="form-required"> * </span>
                                    </label>
                                    <div className="form-input">
                                        <input type="password" name="password" placeholder="" required></input>
                                    
                                    </div>
                                </li>
                            </ul>
                            <input type="submit" value="Apply Now"></input>
                        </form>
                    </div>
                </div> 
	        </div>
        </div>);
    }

}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps)(SignUp);