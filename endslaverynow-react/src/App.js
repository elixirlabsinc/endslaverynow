import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { childData: []}; // <- set up react state
  }
  componentWillMount() {
      let data = fire.database().ref('/products');
      var realThis = this;
        data.on("value", snapshot => {
          snapshot.forEach(function(childSnapshot) {
            realThis.setState({childData: realThis.state.childData.concat([childSnapshot.val()])});
          });
        });
  }
  render() {
        return (
          <div className = "App">
            <ul>
              {this.state.childData.map(childData => <li>{childData}</li>)}
            </ul>
          </div>
        );
  };
  }

export default App;
