import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast styles
import Header from "./Header";

const AllBookeTicket = () => {
  const [bookedTicket, setBookedTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(false);

  useEffect(() => {
    async function fetchBookedTicket() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const tickets = await axios.post(
          `https://ticket-booking-app-isui.onrender.com/book`,
          {
            userId: user._id,
          },
          config
        );
        setBookedTicket(tickets.data);
        setLoading(true);
        console.log(tickets.data);
      } catch (error) {
        toast.error(error.message); // Use toast.error to show an error notification
      }
    }

    fetchBookedTicket();
  }, [book]);

  async function cancelTicket(id) {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(
        `https://ticket-booking-app-isui.onrender.com/book/${id}`,
        config
      );
      if (book) {
        setBook(false);
      } else {
        setBook(true);
      }
      toast.success("Ticket has been canceled"); // Show a success toast notification
    } catch (error) {
      toast.error(error.message); // Use toast.error to show an error notification
    }
  }

  return (
    <div>
      <Header />
      <div>
        <h1 className="Heading">All Booked Tickets</h1>
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
                <th>BUSNAME</th>
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
              {bookedTicket.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.busId.name.toUpperCase()}</td>
                  <td>{item.busId.from.toUpperCase()}</td>
                  <td>{item.busId.to.toUpperCase()}</td>
                  <td>{item.busId.price}</td>
                  <td>{item.seatNo}</td>
                  <td>
                    <div className="action">
                      <Link to="/pay">
                        <button className="book">Pay Now</button>
                      </Link>
                      <button
                        className="cancel"
                        onClick={() => {
                          cancelTicket(item._id);
                        }}
                      >
                        Cancel
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

export default AllBookeTicket;
