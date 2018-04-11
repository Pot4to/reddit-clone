import React from 'react';
import ReactDOM from 'react-dom';
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



ReactDOM.render(
    <App />,
    document.getElementById('app')
);
