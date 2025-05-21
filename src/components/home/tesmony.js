import moment from "moment";
import useGetData from "../Utility/getFunction"




const Testmony = (() => {


  const { data, isPending, error } = useGetData("comment/getAllComments");


  // console.log("checking comment>>", data)



  return (
    <>


    {
   isPending  ? <div className="container"><div className="mzC mz1 mshimmer"></div><div className="mzD mz1 mshimmer"></div></div>:

   <section className="tesmony-container">

   {
     data && data.filter((data) => (
       data.status !== "suppress"
     )).slice(0, 5).map((data) => (
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

 </section>

    }
     
    </>
  )
})
export default Testmony