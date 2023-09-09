import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateBusForm.css";

const CreateBusForm = () => {
  const [busData, setBusData] = useState({
    name: "",
    from: "",
    to: "",
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusData({
      ...busData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ticket-booking-app-isui.onrender.com/bus/create",
        busData
      );
      console.log("Bus created:", response.data);

      // Show a success notification
      toast.success("Bus created successfully");

      // Clear the form data
      setBusData({
        name: "",
        from: "",
        to: "",
        price: 0,
      });
    } catch (error) {
      console.error("Error creating bus:", error);
    }
  };

  return (
    <>
      <Header />

      <div>
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            Bus Name:
            <input
              type="text"
              name="name"
              value={busData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            From:
            <input
              type="text"
              name="from"
              value={busData.from}
              onChange={handleInputChange}
            />
          </label>
          <label>
            To:
            <input
              type="text"
              name="to"
              value={busData.to}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={busData.price}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Create Bus</button>
        </form>
      </div>
    </>
  );
};

export default CreateBusForm;
