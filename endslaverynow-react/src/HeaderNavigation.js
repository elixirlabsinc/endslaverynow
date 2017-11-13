import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';

export default class HeaderNavigation extends React.Component {
  

  render() {
    
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
              <a href="/">
                <img src={require("./logo_endslaverynowH.png")} alt="End Slavery Now"></img>
              </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#ranking">Ranking System</NavItem>
            <NavItem eventKey={2} href="#products">Shop Products</NavItem>
            <NavItem eventKey={1} href="#certifications">Fair Trade Certifications</NavItem>
            <NavItem eventKey={2} href="#contact">Contact Us</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}