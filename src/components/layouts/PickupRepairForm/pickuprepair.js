


const PickupRepairForm = (()=>{



    return (


        <>
        
        <div className="container">
	
	<div className="form-wra">
   <p id="description" className="text-center">
   Please provide required details for pickup/delivery
   
		</p>	
		<form id="survey-form">
     
			<div className="row">

         <div className="col-md-6">
					<div className="form-group">
               <label>Ipad model</label>
               <input  required  id="name" placeholder="E.g Ipad 1" className="form-control" />
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label id="name-label" for="name">Reservation date and time</label>
						<input type="datetime-local" required  id="name" placeholder="Enter your name" className="form-control" />
					</div>
				</div>
				<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label id="number-label" for="number">Pick up address</label>
						<input type="text" required   placeholder="Enter detailed address" className="form-control" />
					</div>
				</div>
            <div className="col-md-6">
					<div className="form-group">
						<label id="number-label" for="number">Phone number</label>
						<input type="text" required   placeholder="Enter phone number" className="form-control" />
					</div>
				</div>
				
			</div>
       </div>
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label>Details</label>
						<textarea  id="comments" className="form-control" name="comment" placeholder="Please describe your requirement in details, for direct diagnosis and immediate fix" ></textarea>
					</div>
				</div>
			</div>
			
			
		</form>
	</div>	
</div> 
        
        </>
    )
})

export default PickupRepairForm