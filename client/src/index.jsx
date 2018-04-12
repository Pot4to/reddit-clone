import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/signup.jsx';
require('./css/signUp.css');
class App extends React.Component {
    constructor(props) {
      super(props);
    }

    // componentWillMount() {
    //   store.dispatch()
    // }


    render() {
        return (<div>
          <div>
            <SignUp />
          </div>
        </div>);
    }

}



ReactDOM.render(
    <App />,
    document.getElementById('app')
);
