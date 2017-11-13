import React from 'react';
import './App.css';

export default class Certifications extends React.Component {
  
  render() {
    
    return (
      <section class="content-section-a">

      <div class="container">

        <div class="row">
          <div class="col-lg-5 ml-auto">
            <hr class="section-heading-spacer"/>
            <div class="clearfix"></div>
            <h2 class="section-heading">Fair Trade Certifications</h2>
            <p class="lead">There are quite a few fair trade certifications and labels in the marketplace. 
            Organizations that grant these certifications vary in their economic, social, governance
            and environmental standards as well as their inspecting, certifying and auditing policies. However, as a whole,
            fair trade certifications indicate that producers are paid a fair price for their goods; workers receive fair wages
            and work in good conditions; and there are no instances of forced, bonded or child labor throughout their supply 
            chains. Third-party auditors conduct inspections to ensure that members of these fair trade organizations are in
            compliance.
            <br/><br/>Though a food product may be fair trade certified, there are still ingredients such as milk, vegetable fat,
            emulsifiers and flavorings in it that can’t be sourced through fair trade. Some of our product suggestions only
            have one certified ingredient. Products from companies and brands in our Best category have a higher total
            percentage of fair trade sourced ingredients.</p>
          </div>
          <div class="col-lg-5 mr-auto ">
            <img class="img-fluid" src="img/phones.png" alt=""/>
          </div>
        </div>

      </div>
    </section>
    );
  }
}