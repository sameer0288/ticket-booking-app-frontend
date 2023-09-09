import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Header from "../components/Header";
import Register from "../components/Register";
import SeatBook from "../components/SeatBook";
import Cart from "../components/Cart";
import AllBookeTicket from "../components/AllBookeTicket";
import CreateBusForm from "../components/CreateBusForm";
import PayNow from "../components/PayNow";

const AllRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuth = user?.email;
  const isAdmin = user?.email === "sameer@gmail.com";
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/seatbook"
          element={isAuth ? <SeatBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isAuth ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/bookedticket"
          element={isAuth ? <AllBookeTicket /> : <Navigate to="/login" />}
        />
        <Route
          path="/pay"
          element={isAuth ? <PayNow /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={isAdmin ? <CreateBusForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
