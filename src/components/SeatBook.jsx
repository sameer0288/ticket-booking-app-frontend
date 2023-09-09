import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";

import "./SeatBook.css"; // Import your custom CSS file

const SeatBook = () => {
  const [seatsofbus, setSeatsofBus] = useState([]);
  const [chooseSeat, setChooseSeat] = useState();
  const [cart, setCart] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    let user = JSON.parse(localStorage.getItem("item"));
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const seats = await axios.get(
        `https://ticket-booking-app-isui.onrender.com/bus/search/${user._id}`,
        config
      );
      let ob = seats.data.seats;
      let arr = [];
      for (let x in ob) {
        let object = {};
        object["number"] = x;
        object[`${x}`] = ob[x];
        arr.push(object);
      }
      setSeatsofBus(arr);
      setDataLoaded(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to add a seat to the cart and change its color
  async function addToCart(sno) {
    let user = JSON.parse(localStorage.getItem("user"));
    let bus = JSON.parse(localStorage.getItem("item"));
    let token = user.token;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Send the request to the server to add the seat to the cart
      await axios.post(
        "https://ticket-booking-app-isui.onrender.com/cart/add",
        {
          userId: user._id,
          busId: bus._id,
          seatNo: sno,
        },
        config
      );

      // Use toast.success for success message
      toast.success("Ticket is added to the cart");

      // Update the local cart state with the newly added seat
      setCart((prevCart) => [...prevCart, sno]);

      // Update local storage with the new cart data
      localStorage.setItem("cart", JSON.stringify([...cart, sno]));
    } catch (error) {
      // Use toast.error for error message
      toast.error(error.message);
    }
  }

  const divideSeatsIntoRows = () => {
    const seatsInRows = [[], []]; // Two rows

    seatsofbus.forEach((element, index) => {
      const seatNumber = index + 1;
      const isBooked = element[`${index + 1}`];
      const isSeatInCart = cart.includes(seatNumber);

      const seatButton = (
        <button
          key={index + 1}
          className={`seatButton ${
            isBooked ? "booked" : isSeatInCart ? "addedToCart" : "available"
          }`}
          type="button"
          onClick={() => {
            if (!isBooked && !isSeatInCart) {
              setChooseSeat(seatNumber);
              addToCart(seatNumber);
            }
          }}
          disabled={isBooked || isSeatInCart}
        >
          <FontAwesomeIcon icon={faBus} size="2x" />
          <span className="seatNo">Seat No: {seatNumber}</span>
        </button>
      );

      if (index % 10 < 5) {
        seatsInRows[0].push(seatButton); // Add seat to the first row
      } else {
        seatsInRows[1].push(seatButton); // Add seat to the second row
      }
    });

    return seatsInRows;
  };

  if (!dataLoaded) {
    // Display a loading message until data is loaded
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div>
        <h1 className="Heading">Seat Available</h1>
      </div>
      <div className="bus-container">
        {divideSeatsIntoRows().map((row, rowIndex) => (
          <div key={rowIndex} className="bus-row">
            {row}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatBook;
