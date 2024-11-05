

import TrackBtn from "./trackerButton";
import "./trackProgress.css";
import { FaClipboardList, FaTruckPickup, FaTools, FaTruckMoving, FaCheckCircle } from 'react-icons/fa';





const TrackProgress = ({ currentStage })=>{
	const stages = [
		{ name: "Ordered", icon: <FaClipboardList />, date: "09/05/2025" },
		{ name: "Picked", icon: <FaTruckPickup /> },
		{ name: "Fixing", icon: <FaTools /> },
		{ name: "Delivery", icon: <FaTruckMoving /> },
		{ name: "Delivered", icon: <FaCheckCircle /> },
	  ];


    return(


<>
        <h3> Tracking for Samsung A21 repair</h3>
		<p>Order number: 7648B7</p>
<div className="progress-container">
	    
      {stages.map((stage, index) => (
        <div key={index} className={`stage ${index <= currentStage ? 'active' : ''}`}>
          <div className="icon-container">{stage.icon}</div>
          <span>{stage.name}</span>
		  <p> {stage.date} </p>
          {index < stages.length - 1 && <div className="arrow" />}
        </div>
      ))}
      <div className="progress-bar" style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }} />
    </div>
  



	     

{/* <div className="container">
  <div className="row">
						<div className="col-12 col-md-10 hh-grayBox pt40 pb20">
							<div className="row justify-content-between">
								<div className="order-tracking completed">
									<span className="is-complete"></span>
									<p>Ordered<br/><span>Mon, June 24</span></p>
								</div>
								<div className="order-tracking completed">
									<span className="is-complete"></span>
									<p>Shipped<br/><span>Tue, June 25</span></p>
								</div>
								<div className="order-tracking">
									<span className="is-complete"></span>
									<p>Delivered<br/><span>Fri, June 28</span></p>
								</div>
                                
							</div>
						</div>
					</div>
</div> */}
        </>
    )
}

export default TrackProgress