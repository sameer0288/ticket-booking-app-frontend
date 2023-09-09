import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"; // Import the CSS file

import { FaShoppingCart } from "react-icons/fa"; // Import a shopping cart icon from a library like react-icons

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const location = useLocation();

  const isAdmin = user?.email === "sameer@gmail.com";

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");

    // Update the state to reflect the user logout
    setUser(null);
    window.location.reload();
  };

  const userInfoStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: user ? "60%" : "auto", // Set the width to 50% if the user is logged in
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo">
          <h1>Ticket Booking System</h1>
        </div>
      </Link>

      <div className="user-info" style={userInfoStyle}>
        {user ? (
          <>
            <h2 className="bouncing-text">Hello {user.name}</h2>

            <Link to="/seatbook">
              <button
                className={`header-button ${
                  location.pathname === "/seatbook" ? "active-link" : ""
                }`}
              >
                Check Seats
              </button>
            </Link>
            <Link to="/bookedticket">
              <button
                className={`header-button ${
                  location.pathname === "/booked-ticket" ? "active-link" : ""
                }`}
              >
                Booked Ticket
              </button>
            </Link>
            <Link to="/cart">
              <button className="header-button">
                <FaShoppingCart /> {/* Add your cart icon here */}
              </button>
            </Link>
            {isAdmin && (
              <Link to="/create">
                <button
                  className={`header-button ${
                    location.pathname === "/create" ? "active-link" : ""
                  }`}
                >
                  Create Bus
                </button>
              </Link>
            )}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="header-button">Login/Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
