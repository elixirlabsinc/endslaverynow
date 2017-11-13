import React from 'react';
import './App.css';

export default class RankingSystem extends React.Component {
  
  render() {
    
    return (
      <section class="content-section-a">

      <div class="container">
        <div class="row">
          <div class="col-lg-5 ml-auto">
            <hr class="section-heading-spacer"/>
            <div class="clearfix"></div>
            <h2 class="section-heading">Ranking System</h2>
            <p class="lead">We ranked companies and brands based on their antislavery policies; 
        supply chain transparency; third-party certifications; and engagement 
        around slavery, forced labor and human trafficking. We awarded points 
        for our Good, Better, Best lists for the following:</p>
          </div>
          <div class="col-lg-5 mr-auto">
            <img class="img-fluid" src="img/ipad.png" alt=""/>
          </div>
        </div>

      </div>
    </section>
    );
  }
}