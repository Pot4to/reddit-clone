import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import connect from 'react-redux';

class App extends React.Component {
    constructor(props) {
      super(props);
      state: {
        view: 'feed';
      }
    }

    // mapStateToProps = state => {
    //     return {

    //     }
    // }

    // mapDispatchToProps = () => {
    //     return {
            
    //     }
    // }

    render() {
        return (<div>
            <h1>React App Working</h1>
        </div>);
    }

}



ReactDOM.render(
    <App />,
    document.getElementById('app')
);
