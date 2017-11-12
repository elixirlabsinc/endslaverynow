import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import fire from './fire';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import HeaderNavigation from './HeaderNavigation';
import JumbotronComponent from './JumbotronComponent';
import RankingSystem from './RankingSystem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { map: []}; // <- set up react state
  }
  componentWillMount() {
      var innerThis = this;

      let category1Data = fire.database().ref('/categoryLvl1');
      let category2Data = fire.database().ref('/categoryLvl2');
      let productData = fire.database().ref('/products');

      var cat2toProd = {};

      productData.on("value", snapshot => {
        snapshot.forEach(function(childSnapshot) {
          let childData = childSnapshot.val();
          childData.id = childSnapshot.key;
          if(!(childData.categoryLvl2ID in cat2toProd)) {
            cat2toProd[childData.categoryLvl2ID] = [];
          }
          cat2toProd[childData.categoryLvl2ID].push(childData);
        });
      });

      var cat1tocat2 = {};

      category2Data.on("value", snapshot => {
        snapshot.forEach(function(childSnapshot) {
          let childData = childSnapshot.val();
          childData.id = childSnapshot.key;
          if (childData.id in cat2toProd){
            childData.products = cat2toProd[childData.id];
          }
          else {
            childData.products = [];
          }
          if(!(childData.categoryLvl1ID in cat1tocat2)) {
            cat1tocat2[childData.categoryLvl1ID] = [];
          }
          cat1tocat2[childData.categoryLvl1ID].push(childData);
        })
      })

      category1Data.on("value", snapshot => {
        snapshot.forEach(function(childSnapshot) {
          let childData = childSnapshot.val();
          childData.id = childSnapshot.key;
          if (childData.id in cat1tocat2){
            childData.cat2 = cat1tocat2[childData.id];
          }
          else {
            childData.cat2 = [];
          }
          innerThis.setState({map: [childData].concat(innerThis.state.map)});
        })
      })
  }
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
            <div id="app-body">
              <ul>
                {this.state.map.map(cat1 => <li key = {cat1.id}><br />{cat1.name}
                  <ul>
                    {cat1.cat2.map(cat2 => <li key = {cat2.id}><br />{cat2.name}
                       <ul>
                          {cat2.products.map(products => <li key = {products.id}><br />{products.productName}<br />{products.productDesc}<br />{products.ranking}</li>)}<br />
                       </ul> 
                    </li>)}
                  </ul>
                </li>)}
              </ul>
            </div>

          </div>
        </body>
        );
  };
  }

export default App;
