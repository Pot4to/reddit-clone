import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './components/comments.jsx'
// import connect from 'react-redux';
import Home from './components/home.jsx';

class App extends React.Component {
    constructor(props) {
      super(props);
      state: {
        view: 'feed';
      }
    }

    componentDidMount() {

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
        return (
        <div>
          <Home />
        </div>);
    }

}

let x = { _id: '5ace72088ce4a740e83be47e'}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
