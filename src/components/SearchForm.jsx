import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SearchForm.css"; // Import the CSS file

const SearchForm = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Fetch buses when the component mounts
    fetchBuses("mumbai", "delhi"); // You can change the default values here
  }, []);

  const fetchBuses = async (from, to) => {
    try {
      const response = await axios.post(
        "https://ticket-booking-app-isui.onrender.com/bus/search",
        {
          from,
          to,
        }
      );
      // Convert the data to uppercase
      const uppercaseBuses = response.data.map((item) => ({
        ...item,
        name: item.name.toUpperCase(),
        from: item.from.toUpperCase(),
        to: item.to.toUpperCase(),
      }));
      console.log("API Response:", uppercaseBuses); // Log the API response
      setBuses(uppercaseBuses);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const handleFromCityChange = (e) => {
    setFromCity(e.target.value);
  };

  const handleToCityChange = (e) => {
    setToCity(e.target.value);
  };

  const handleCheckButton = (item) => {
    localStorage.setItem("item", JSON.stringify(item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBuses(fromCity, toCity);
  };

  return (
    <div>
      <form className="searchForm" onSubmit={handleSubmit}>
        <label>
          From:
          <input type="text" value={fromCity} onChange={handleFromCityChange} />
        </label>
        <label>
          To:
          <input type="text" value={toCity} onChange={handleToCityChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <div className="Table">
        {loading && (
          <table>
            <thead>
              <tr>
                <th>BUS NAME</th>
                <th>FROM</th>
                <th>TO</th>
                <th>CHECK</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>
                    <Link to="/seatbook">
                      <button onClick={() => handleCheckButton(item)}>
                        Check
                      </button>
                    </Link>
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

export default SearchForm;
