import { FaWhatsapp } from "react-icons/fa";
import "./chatComponent.css"
import { BsPhone } from "react-icons/bs";
import { IoCall } from "react-icons/io5";

const ChatComponent = (()=>{




    return(
         <>

         <div>

            <div className="p-1">

            Chat with us on Whatsapp and get instant reply
            </div>
            <div className="whatsapp-btn-tink">
            <a target="blank" className="whatsapp-btnbbt" href="https://api.whatsapp.com/send/?phone=+2348020653456&text=Hi"> <span>08020653456</span>  <FaWhatsapp color="white" size={35}  /> </a>
            <a target="blank" className="whatsapp-btn-call" href="tel:+2348020653456"> <span>08020653456</span>  <IoCall color="white" size={35}  /> </a>
            </div>
           
         </div>

        
        </>
    )
})

export default ChatComponent