import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Cart.css";
import Header from "./Header";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const seats = await axios.post(
          `https://ticket-booking-app-isui.onrender.com/cart`,
          {
            userId: user._id,
          },
          config
        );
        setCart(seats.data);
        setLoading(true);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchCart();
  }, []);

  async function bookSeat(id) {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the API call to book the seat
      await axios.post(
        `https://ticket-booking-app-isui.onrender.com/book/${id}`,
        { userId: user._id },
        config
      );

      // Remove the booked seat from the cart
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));

      // Retrieve the seat number from the removed bus
      const removedSeat = cart.find((item) => item._id === id);
      const seatNumber = removedSeat ? removedSeat.seatNo : null;

      // Remove the seat number from local storage
      if (seatNumber) {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        const updatedCart = storedCart.filter((sno) => sno !== seatNumber);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      // Show a success toast notification
      toast.success("Ticket has been booked");
    } catch (error) {
      // Show an error toast notification
      toast.error(error.message);
    }
  }

  async function removeFromCart(id) {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Send a request to remove the bus from the cart
      await axios.delete(
        `https://ticket-booking-app-isui.onrender.com/cart/${id}`,
        config
      );

      // Update the cart state to remove the deleted bus
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));

      // Retrieve the seat number from the removed bus
      const removedSeat = cart.find((item) => item._id === id);
      const seatNumber = removedSeat ? removedSeat.seatNo : null;

      // Remove the seat number from local storage
      if (seatNumber) {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        const updatedCart = storedCart.filter((sno) => sno !== seatNumber);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      toast.success("Ticket has been removed from the cart");
    } catch (error) {
      // Use toast.error to show an error notification
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Header />
      <div>
        <h1 className="Heading">Tickets in My Cart</h1>
      </div>

      <div className="Table">
        {loading && (
          <table>
            <thead
              style={{
                background: "blue",
                color: "white",
              }}
            >
              <tr>
                <th>BUS NAME</th>
                <th>FROM</th>
                <th>TO</th>
                <th>PRICE</th>
                <th>SEAT NO</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody
              style={{
                textAlign: "center",
              }}
            >
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.busId.name.toUpperCase()}</td>
                  <td>{item.busId.from.toUpperCase()}</td>
                  <td>{item.busId.to.toUpperCase()}</td>
                  <td>{item.busId.price}</td>
                  <td>{item.seatNo}</td>
                  <td>
                    <div className="action">
                      <button
                        className="book"
                        onClick={() => {
                          bookSeat(item._id);
                        }}
                      >
                        Book
                      </button>
                      <button
                        className="cancel"
                        onClick={() => {
                          removeFromCart(item._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Cart;
