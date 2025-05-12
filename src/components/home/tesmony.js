import moment from "moment";
import useGetData from "../Utility/getFunction"




const Testmony =(()=>{


  const {data, isPending, error} = useGetData("comment/getAllComments");


  console.log("checking comment>>", data)

    return(
        <>
        <section className="tesmony-container">

          {
            data && data.filter((data)=>(
               data.status !== "suppress"
            )).slice(0, 5).map((data)=>(
<figure className="snip1139">
<blockquote>
  {data.comment}
  {/* I couldn’t be happier with Chukkytech! My phone was repaired quickly, and it’s working
   like new. The real-time tracking feature kept me informed every step of the way. Highly recommend their services! */}
    <div className="arrow"></div>
  </blockquote>
  {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample3.jpg" alt="sample3"/> */}
  <div className="author">
    <h5>{data.firstName} <span>- {data.title}</span></h5>

    <div> 
       {data.createdDateTime} 
      {/* {moment(data.createdDateTime).format("lll")}  */}
      </div>
  </div>

</figure>
            ))
          }

{/* <figure className="snip1139 hover">
  <blockquote>Chukkytech made my life so much easier with their door pickup and delivery service. 
    I didn’t have to leave my home, and my laptop was repaired and returned in no time. Fantastic experience!
    <div className="arrow"></div>
  </blockquote>

  <div className="author">
    <h5>Chukwudi Ezema<span>- Convenient Doorstep Service</span></h5>
  </div>
</figure>
<figure className="snip1139">
  <blockquote>Chukkytech is my go-to for gadget repairs. They’re professional, prompt, 
    and use only high-quality parts. I trust them with all my devices and have never been disappointed.
    <div className="arrow"></div>
  </blockquote>
  
  <div className="author">
    <h5>Muhammad Umar<span>- Reliable and Professional</span></h5>
  </div>
</figure>
<figure className="snip1139 hover">
  <blockquote>From the diagnosis to the repair completion, Chukkytech kept everything transparent. 
    The tracking system is amazing, and their customer support is top-notch. My tablet has never worked better!
    <div className="arrow"></div>
  </blockquote>

  <div className="author">
    <h5>Taiwo Olayinka<span>- Transparent and Trustworthy</span></h5>
  </div>
</figure> */}
</section>
        </>
    )
})
export default Testmony