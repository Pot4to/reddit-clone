import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './components/comments.jsx'
// import connect from 'react-redux';

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
        return (<div>
            <div className="w3-top">
  <div className="w3-bar w3-theme w3-top w3-left-align w3-large">
    <a className="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" href="javascript:void(0)" ><i className="fa fa-bars"></i></a>
    <a href="#" className="w3-bar-item w3-button w3-theme-l1">Reddit 0.5</a>
    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-hover-white">trending</a>
    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-hover-white">new</a>
  </div>
  
</div>
<h1>COMMENTS</h1>
          <Comments post={{_id: '5ace72088ce4a740e83be47e'}}/>
        </div>);
    }

}

let x = { _id: '5ace72088ce4a740e83be47e'}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
