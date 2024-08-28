import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

import food from "../images/foodservice.jpg";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="overlay">
        <h2>Welcome to the Food Service Application</h2>
        <p>Explore our services by navigating through the menu.</p>
      </div>

      <div className="centered-card-container">
        <div
          className="card"
          onClick={() => navigate("/services/food")}
          style={{ cursor: "pointer" }}
        >
          <img src={food} alt="Food Services" className="card-image" />
          <div className="card-content">
            <h3>Food Services</h3>
            <p>Explore a variety of food options and services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
