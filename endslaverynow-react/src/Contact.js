import React from 'react';
import './App.css';

export default class Contact extends React.Component {
  
  render() {
    
    return (
      <aside class="banner">

      <div class="container">

        <div class="row">
          <div class="col-lg-6 my-auto">
            
          </div>
          <div class="col-lg-6 my-auto">

            <ul>
            <h2>Contact Us</h2><br/>
            <li>If you need immediate help, contact the human trafficking hotline number 1-888-373-7888. 
            Other countries: Search hotlines in your country here.</li>

            <li>For other requests or for more information, please email info@endslaverynow.org. 
            For information on being added to the Antislavery Directory, see these guidelines.</li>
            <br/><br/>
            <li><h4>Donations</h4></li>
            <li>You may donate online through our parent organization, National Underground Railroad Freedom Center. 
            Please write "End Slavery Now" in the memo box.</li>
            <li>If mailing a check directly to our offices, please send donations to:

                End Slavery Now
                National Underground Railroad Freedom Center
                50 E. Freedom Way
                Cincinnati, Ohio 45202
                USA
            </li>
            </ul>
          </div>
        </div>

      </div>

    </aside>
    );
  }
}