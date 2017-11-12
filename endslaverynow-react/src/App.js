import React, { Component } from 'react';
import './App.css';
import fire from './fire';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import HeaderNavigation from './HeaderNavigation';
import JumbotronComponent from './JumbotronComponent';
import RankingSystem from './RankingSystem';
import Products from './Products';
import Certifications from './Certifications';
import Contact from './Contact';
import FooterComponent from './FooterComponent';

class App extends Component {

  render() {
        return (
        <body>
          <div className = "header">
            <HeaderNavigation />
          </div>
    
          <div className = "App">
            <div id="jumbotron-component">
              <JumbotronComponent />
            </div>

            <div id="ranking">
              <RankingSystem />
            </div>

            <div id="products">
              <Products />
            </div>

            <div id="certifications">
              <Certifications />
            </div>

            <div id="contact">
              <Contact />
            </div>
          </div>
          
          <div className="footer">
              <FooterComponent />
          </div>
        </body>
        );
  };
  }

export default App;
