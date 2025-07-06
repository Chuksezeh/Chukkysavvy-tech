import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";

const Receipt = ({ orderData, chukkyLogo }) => {
  const receiptRef = useRef(null);

  const downloadReceipt = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "receipt.png";
      link.click();
    }
  };
  const [copied, setCopied] = useState(false);

  const shareReceipt = async () => {
    if (navigator.share) {
      try {
        const canvas = await html2canvas(receiptRef.current);
        canvas.toBlob(blob => {
          const file = new File([blob], "receipt.png", { type: "image/png" });
          navigator.share({
            files: [file],
            title: "Receipt",
            text: "Here is your repair receipt",
          });
        }, "image/png");
      } catch (error) {
        console.error("Error sharing receipt:", error);
      }
    } else {
      alert("Sharing not supported on this device");
    }
  };

   const scrolltop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      scrolltop();
    }, []);
  

  return (
    <div id="invo" >
      <div id="download-receipt" ref={receiptRef} className="p-3">
        {/* Logo and Header */}
        <div className="loguDiv" style={{ textAlign: "center", margin: "auto" }}>
          <img className="logu" style={{ width: "80px" }} src={chukkyLogo} alt="Company Logo" />
          <h2 className="divHeadvitel">Chukkytech Mobile Solution</h2>
        </div>

        {/* Booking Confirmation */}
        <div style={{ textAlign: "center", color: "white", background: "#376E37", padding: "10px" }}>
          <IoCheckmarkDoneOutline size={25} /> <span>Successfully booked</span>
        </div>

        {/* Order Details */}
        <p className="divHeadetail">Device Repair Order Details</p>
        <div id="bot">
        <div id="table">
  <table>
    <tbody>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Repair Order Code:</p></td>
        <td className="tableitem">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p className="itemtext">{orderData.repairOrderCode}</p>
            <span 
               style={{ cursor: 'pointer', color: '#007bff' }}
              onClick={() => {
                navigator.clipboard.writeText(orderData.repairOrderCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
             
             
              title="Copy to clipboard"  
            >
              <i className="far fa-copy"></i> 
            </span>
            <span style={{ position: 'relative' }}>
              {/* <i className="far fa-copy"></i> */}
              {copied && <span style={{
                position: 'absolute',
                top: '-30px',
                left: '60%',
                transform: 'translateX(-50%)',
                background: '#333',
                color: '#fff',
                padding: '2px 5px',
                borderRadius: '3px',
                fontSize: '12px'
              }}>Copied!</span>}
            </span>

          </div>
        </td>
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Device Type:</p></td>
        <td className="tableitem"><p className="itemtext">{orderData.deviceType}</p></td>
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Device Model:</p></td>
        <td className="tableitem"><p className="itemtext">{orderData.deviceModel}</p></td>
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Order Type:</p></td>
        <td className="tableitem"><p className="itemtext">{orderData.repairOrderType}</p></td>
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Address pickup/center:</p></td>
        <td className="tableitem"><p className="itemtext">{orderData.pickUpAddress}</p></td>
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Due Reserved Date Time:</p></td>
        <td className="tableitem"><p className="itemtext">{moment(orderData.reserveDate).format("lll")}</p></td>
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Booked On:</p></td>
        <td className="tableitem"><p className="itemtext">{moment(orderData.createdDateTime).format("lll")}</p></td>
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Status:</p></td>
        {
          orderData.status === "cancel" ?  
            <td className="tableitem"><p className="itemtext"> <span style={{color:"red"}}>Canceled</span> on  {moment(orderData.createdDateTime).format("lll")}</p></td> :
            <td className="tableitem"><p className="itemtext" style={{fontStyle:''}}> <span style={{color:"green", textTransform:"capitalize"}}> { orderData.status === "irreparable" ? <span style={{color:"red"}}>Cannot be Fixed</span>: <span> {orderData.status} </span> }   </span>  :  {moment(orderData.createdDateTime).format("lll")}</p></td>
        }
      </tr>
      <tr className="service">
        <td className="tableitem"><p className="itemtext">Device Issue Description:</p></td>
        <td className="tableitem"><p className="itemtext">{orderData.details}</p></td>
      </tr>
    </tbody>
  </table>

 <p className="push-preceipt" style={{fontSize:"15px", background:""}}> Note: Please keep a copy of your <span style={{fontWeight:"bold"}}> Repair Order Code </span> , as it serves as your tracking number.
You can use this code at any time to monitor the status and progress of your device repair.
It ensures that you're always informed about every stage of the repair process — from inspection to completion.</p> 
</div>
        </div>
        </div>
        {/* Actions - Download & Share */}
        <div id="legalcopy">
          <div className="backToHome d-flex">
            <div className="saveIconDiv" onClick={downloadReceipt} style={{ cursor: "pointer" }}>
              <span className="shareIconspan"><GiSaveArrow className="saveIcon" /></span>
              <span style={{padding:'"10px'}}>Download Receipt</span>
            </div>
            <div className="shareIconDiv saveIconDiv2" onClick={shareReceipt} style={{ cursor: "pointer" }}>
              <span className="shareIconspan"><IoMdShare className="saveIcon" /></span>
              <span style={{padding:'"10px'}}>Share Receipt</span>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default Receipt;
