import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from '../layouts/Header';
import image3 from "../images/laptop.jpeg"


const BookingPage=(()=>{


    return (
        <>
        <Header/>


        <div className='bookform-div'>
           
        <Form className='booking-form-container'>
        <img src={image3} className='imagebooking'/>
        <Row className="mb-3 " >
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Select Service</Form.Label>
          <Form.Select defaultValue="Choose..." className='h-30'>
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Abuja</option>
          </Form.Select>
        </Form.Group>

        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Service Type</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Service center</option>
            <option>Pickup/deliver</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Full name</Form.Label>
          <Form.Control  placeholder="Enter your name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Phone number</Form.Label>
        <Form.Control placeholder="Enter your correct phone number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address </Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
      
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Reservation Time/date</Form.Label>
          <Form.Control  placeholder="Reservation Time" type='datetime-local' />
        </Form.Group>

        
      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Details </Form.Label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Please describe your requirement in details '></textarea>
      </Form.Group>

      

      <Form.Group className="mb-3" id="formGridCheckbox">
      <Form.Label>Note: Please enter your correct contact details so we can reach you</Form.Label>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>

        
        </>
    )
})
export default BookingPage