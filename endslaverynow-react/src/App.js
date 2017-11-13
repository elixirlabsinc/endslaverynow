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

          <html lang="en">

  <head>

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title>Landing Page - Start Bootstrap Theme</title>
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></link>

    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"></link>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css"></link>

    <link href="css/landing-page.css" rel="stylesheet"></link>

  </head>

  <body>
    <div className = "header">
      <HeaderNavigation />
    </div>
    <div>
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
          
          <div className="footer">
              <FooterComponent />
          </div>

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  </body>

</html>
        );
  };
  }

export default App;
