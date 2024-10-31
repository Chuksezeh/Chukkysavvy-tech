


const InstoreRepairForm = (()=>{

    


    return(



        <>
        
        <div className="container">
	
	<div className="form-wra">
   <p id="description" className="text-center">
   Please provide required details and locate our store
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
				<div className="col-md-12">
					<div className="form-group">
						<label id="number-label" for="number">Select service store </label>
						<select id="dropdown" name="role" className="form-control" required>
                   <option disabled>Choose...</option>
                 <option>Main store</option>
                 <option>Branch</option>
                </select>
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
			
			{/* <div className="row">
				<div className="col-md-4">
				 <button className="picckBtn">Submit</button>
				</div>
			</div> */}

		</form>
	</div>	
</div>


        
        </>
    )
})

export default InstoreRepairForm