import Header from "../layouts/Header"
import iphoneImage from '../images/iphone4.jpg';


const DetailsBookIphone = (()=>{


    return(

<>
<Header/>

<div className="container">
      <h3>Iphones</h3>
    <div className="iphone-detaials-cover">



        <div className="iphone-detaials-cover-image">
             <img className="" src={iphoneImage}/>
        </div>
        <div className="iphone-detaials-cover-text">
               <p>Professional iPhone  Repairs, Premium Parts, and Fair Prices</p>
              <div>Drawing on our many years of experience working with our happy customers, we take
                 great pride in our work and love what we do. Our team 
                thrive on assessing your needs, alleviating your worries, and getting your iPhone 14 
                Pro Max in top working condition as quickly as possible.
               Although we specialize in screen replacement, water damage repair, and more, our focus is 
               providing quality iPhone 14 Pro Max repairs using premium parts to prevent recurring issues – saving you 
               time and money. Rest assured, our prices will always be fair and affordable.</div>
        </div>

    </div>


</div>


</>

    )

})

export default DetailsBookIphone