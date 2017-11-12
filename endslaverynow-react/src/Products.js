import React, { Component } from 'react';
import './App.css';
import fire from './fire';

export default class JumbotronComponent extends React.Component { 

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
          //console.log("Product: " + childData.productName);
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
          console.log("Category 2: " + childData.name + " with products: " + childData.products);
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
          console.log("Category 1: " + childData.name + " with children 2: " + childData.cat2);
          innerThis.setState({map: [childData].concat(innerThis.state.map)});
        })
      })
  }

  render() {
    return (
      <body>
        <h1>Shop Products by Category</h1>
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
      </body>
    )
  }
}