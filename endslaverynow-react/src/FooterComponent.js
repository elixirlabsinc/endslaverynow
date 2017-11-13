import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';

export default class FooterComponent extends React.Component {
  
  render() {
    return (
      <footer>
      <div class="container">
        <p><a href="http://www.freedomcenter.org/">
                <img src={require("./logo_urfc.png")} alt="Underground Railroad Freedom Center"></img>
              </a></p>
        <p>End Slavery Now is brought to you in proud partnership with the National Underground Railroad Freedom Center.</p>
        <p class="copyright text-muted small">Copyright &copy; Your Company 2017. All Rights Reserved</p>
      </div>
    </footer>
    );
  }
}