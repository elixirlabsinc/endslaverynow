import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import './logo_endslaverynow.png';

export default class HeaderNavigation extends React.Component {
  

  render() {
    
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
              <a href="/">
                <img src={require("./logo_endslaverynow.png")} alt="End Slavery Now"></img>
              </a>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav pullRight>
          <NavItem eventKey={1} href="#ranking">Ranking System</NavItem>
          <NavItem eventKey={2} href="#products">Shop Products</NavItem>
          <NavItem eventKey={1} href="#certifications">Fair Trade Certifications</NavItem>
          <NavItem eventKey={2} href="#contact">Contact Us</NavItem>
        </Nav>
      </Navbar>
    );
  }
}