const ContactForm = ()=>{
    return (
        <>
            <div className="contactform-div">
                <form>
                    <h2 className="contact-head">Feel Free to Contact Us</h2>
                    <input className="contact-name" type="text" placeholder="Your Name" />
                    <input className="contact-email" type="text" placeholder="Your Email" />
                    <input className="contact-text" type="text" placeholder="Your Request" /><br />
                    <button className="contact-btn">Submit</button>
                </form>


            </div>

        </>
    )
}
export default ContactForm