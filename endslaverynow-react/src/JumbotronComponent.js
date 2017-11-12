import React from 'react';
import './App.css';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

export default class JumbotronComponent extends React.Component {
  
  render() {
    
    return (
      <Jumbotron>
        <p><img src={require("./buyingguide.png")} alt="Slave Free Buying Guide"></img></p>
        <p><img src={require("./learningtoshopresponsibly.png")} alt="Learning To Shop Responsibly" id="learningtoshopresponsibly"></img></p>
        <p>One of the most impactful ways everyday people can get involved in the fight against modern-day slavery and human trafficking is to begin purchasing slavery-free goods. When scaled, these purchases create demand for goods produced with audited, slavery-free labor; simultaneously, this shift also shrinks the market for goods produced with forced or slave labor. Search for products below or browse by category.</p>
      </Jumbotron>
    );
  }
}