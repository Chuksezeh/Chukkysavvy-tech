import { Link } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"
import { useEffect } from "react";



const TermsAndConditions = (()=>{

        const scrolltop = () => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              };
            
              useEffect(() => {
                scrolltop();
              }, []);


    return(



        <>

<Header />
<br/>
            <br/>
            <br/>
            <br/>

<section>

    <article>


        <h2> Terms and Conditions </h2>

        <p>

           

Welcome to Chukkytech! These terms and conditions outline the rules and regulations for the use of our website,
 services, and products. By accessing this website or using our services, you accept these terms
 and conditions in full. If you disagree with any part of these terms, please do not use our website or services.
        </p>

        <br />
 
        <strong> 1.Definitions </strong>

        <p>

        "We," "Us," "Our": Refers to Chukkytech, the owner and operator of this website.

"You," "Your": Refers to the user or customer of our website and services.

"Services": Refers to the offerings provided by us, including gadget repairs, sales, door pickup and delivery, and real-time repair tracking.


        </p>

        <br />

        <strong> 2. Use  of Services
            
        </strong>

        <ul>
        You must be at least 15 years old to use our services.

You agree to provide accurate and complete information when registering or using our services.

Unauthorized use of our website or services, including but not limited to hacking or distributing malware, is strictly prohibited.


        </ul>

        <br />

        <strong> 3. Repairs and Services
        </strong>

        <p>

        Diagnosis and Estimates: All repair work will begin with a diagnosis, and you will be provided with an estimate for approval.
<br/>
<strong>High-Quality Parts: </strong>  We use only high-quality parts for repairs unless otherwise suggested by you.
<br/>
<strong>Real-Time Tracking: </strong>
 Our repair tracking system allows you to monitor the progress of your device repairs in real time.<br/>
<strong>Service Time: </strong>
 Estimated service times are not guaranteed and may vary based on the complexity of the repair.
<br/>
<strong>Warranty: </strong> New gadget sales are covered under a limited warranty of the manufacturer or
 the distributor. Device repairs are not covered under any warranty or guarantee due to the sensitive nature of repair components. Warranty coverage applies only to parts that have not been previously repaired or tested..
        </p>

        <br />

        <strong> 4.  Sales Terms </strong>

        <p>

        All gadget sales are subject to availability and confirmation of the order price.

Warranties on gadgets sold will be provided as per manufacturer policies.

        </p>

        <br />

        <strong> 5. Payment Terms </strong>

        <p>

        Payment for services and products must be made in full before the return of any repaired device or delivery of purchased gadgets.

      We accept cash, credit cards, online payments.
         <br/>
     Refunds are subject to our Refund Policy.
        </p>

        <br />

        <strong> 6.Device Pickup and Delivery </strong>

        <p>

        Door pickup and delivery services are subject to additional fees.
        <br/>

      Devices scheduled for pickup or delivery should be properly packaged to avoid damage.
      <br/>

     We are not liable for delays caused by factors beyond our control, such as weather or third-party delivery services.
        </p>

        <br />

        <strong> 7.Limitation of Liability </strong>

        <p>

        We are not responsible for any data loss or damage to devices unrelated to our repair services.

       Liability is limited to the total cost of the services provided.
        </p>

        <br />

        <strong> 8.  Intellectual Property. </strong>

        <p>

        All content on this website, including but not limited to text and logos, is owned by Chukkytech and is protected under intellectual property laws.

        Unauthorized use of our intellectual property is prohibited.

        </p>

        <br />

        <strong> 9. Privacy Policy </strong>

        <p>

        Your use of this website and services is also governed by our Privacy Policy, which can be found  <Link to="/privacy-policy">privacy policy.</Link> 
        </p>

        <br />

        <strong> 10.  Termination </strong>

        <p>

        We reserve the right to terminate or suspend access to our services without prior notice if these terms are violated..

        </p>

        <br />

        <strong> 11.  Changes to Terms </strong>

        <p>

        We may update these terms and conditions from time to time. Any changes will be effective immediately upon posting on this page.
        </p>

        <br />

        <strong> 12. Governing Law</strong>

        <p>

        These terms are governed by and construed in accordance with the laws of Nigeria.
        </p>

        <br />

       

        

        

        <strong> 13. Changes. </strong>

        <p>

            We may update this Terms and Conditions from time to time. If under any 
            such update we make any material change to the way in which we treat your User 
            Information, we will inform you of such change by posting a notice 
            on relevant areas of the Services. Any updated version of this Terms and Conditions will
             be effective as of the date set forth therein.

        </p>

        <strong> 14. Contact Information
        </strong>

<p>

For questions, concerns, or to exercise your privacy rights, please contact us at:

chukkytech001@gmail.com, 08020653456, Wuse 2 Abuja, Nigeria.

By using our website and services, you acknowledge that you have read and understood this Terms and Conditions and agree to its terms.

</p>

    </article>
</section>
<Footer />




        
        
        </>
    )
})

export default TermsAndConditions