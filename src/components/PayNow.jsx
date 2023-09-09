import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PayNow.css";

const PayNow = () => {
  const [name, setName] = useState("");
  const [cardNum, setNumber] = useState("");
  const [cvv, setCcv] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !cardNum || !cvv) {
      toast.error("Please fill in all fields.");
      return;
    }

    setPaymentStatus("success");
  };

  return (
    <div className="container">
      <div>
        <h1 className="heading">Fill Payment Details</h1>
        <Link to="/">
          <button className="home-button">Home</button>
        </Link>
      </div>

      {paymentStatus === "success" ? (
        <>
          <div className="success-message">Payment successful!</div>
          <Navigate to="/confirmation" />
        </>
      ) : (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNum">Card Number:</label>
            <input
              type="text"
              id="cardNum"
              value={cardNum}
              placeholder="Enter Card Number"
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Cardholder Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter Cardholder Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="password"
              id="cvv"
              value={cvv}
              placeholder="CVV"
              onChange={(e) => setCcv(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="pay-button">
            Pay
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default PayNow;
