import moment from "moment";
import useGetData from "../Utility/getFunction";
import React, { forwardRef } from "react";

const Testmony = forwardRef((props, ref) => {
  const { data, isPending } = useGetData("comment/getAllComments");

  return (
    <div ref={ref}>

<h1 className="testmony-head">Tesmonies/Feedback on Repairs and Services</h1>
      <div className="line-testmony"></div>
      {isPending ? (
        <div className="container">
          <div className="mzC mz1 mshimmer"></div>
          <div className="mzD mz1 mshimmer"></div>
        </div>
      ) : (
        <section className="tesmony-container" >
      
          {data &&
            data
              .filter((item) => item.status !== "suppress")
              .slice(0, 5)
              .map((item, index) => (
                <figure className="snip1139" key={index}>
                  <blockquote>
                    {item.comment}
                    <div className="arrow"></div>
                  </blockquote>
                  <div className="author">
                    <h5>
                      {item.firstName} <span>- {item.title}</span>
                    </h5>
                    <div>{item.createdDateTime}</div>
                  </div>
                </figure>
              ))}
        </section>
      )}
    </div>
  );
});

export default Testmony;
