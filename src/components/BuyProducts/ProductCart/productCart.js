import Header from "../../layouts/Header";
import img1 from "../../images/laptop.jpeg";
import "./productCart.css";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";



const ProductCart = (()=>{


    return(

         <>
<Header/>

<div className="small-container cart-page container ">
  <table>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Subtotal</th>
    </tr>

    <tr>
      <td>
        <div className="cart-info">
          <img className="carT-Image" src={img1} alt="" />
          <div>
            <p className="cartPP">Red Printed T-Shirt</p>
            <small>Price ₹500.00</small>
            <br />
            <a href="#">Remove</a>
          </div>
        </div>
      </td>
      <td className="coVerTd">
      <div className="controlcounter">
                                  <button
                                    className="tractminus"
                                    
                                  >
                                    <i>
                                        
                                      <AiOutlineMinus size={30} />
                                    </i>
                                  </button>
                                  <div className="incrementnum">
                                    {' '}
                                    <span> 1 </span>
                                  </div>
                                  {}

                                  <button
                                    className="trackplus"
                                   
                                  >
                                    {' '}
                                    <i>
                                        
                                      <BsPlus size={30} />
                                    </i>
                                  </button>
                                </div>
      
      </td>
      <td>₹500.00</td>
    </tr>

    {/* <tr>
      <td>
        <div className="cart-info">
          <img src="https://i.ibb.co/qmSHWx7/buy-2.jpg" alt="" />
          <div>
            <p>HRX Shoes</p>
            <small>Price ₹1500.00</small>
            <br />
            <a href="#">Remove</a>
          </div>
        </div>
      </td>
      <td><input type="number" value="1" /></td>
      <td>₹1500.00</td>
    </tr>
    <tr>
n      <td>
        <div className="cart-info">
          <img src="https://i.ibb.co/NyYtY31/buy-3.jpg" alt="" />
          <div>
            <p>Reebok Tracksuit</p>
            <small>Price ₹1500.00</small>
            <br />
            <a href="#">Remove</a>
          </div>
        </div>
      </td>
      <td><input type="number" value="1" /></td>
      <td>₹1500.00</td>
    </tr> */}
  </table>

  <div className="total-price">
    <table>
      <tr>
        <td>Subtotal</td>
        <td>₹3500.00</td>
      </tr>
      <tr>
        <td>Tax</td>
        <td>₹15.00</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>₹3515.00</td>
      </tr>
    </table>
    <button className="button-43" role="button">Checkout</button>
  </div>
  
  
</div>
        
        
         </>
    )
})

export default ProductCart