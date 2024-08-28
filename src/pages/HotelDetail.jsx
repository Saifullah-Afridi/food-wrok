import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "../Details/ImageSlider";
import DishCard from "../Details/DishCard";
import "./HotelDetail.css";

import axios from "axios";

const HotelDetail = ({ hotels }) => {
  const [hotelData, setHotelData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [dishesData, setDishesData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((hotel) => hotel.id === parseInt(id));

  if (!hotel) {
    navigate("/404"); // Handle non-existent hotel
    return null;
  }

  const [selectedCategory, setSelectedCategory] = useState("fish");

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError("");
      console.log("here");

      try {
        const res = await axios.get(`http://localhost:3000/restaurants?${id}`);
        setHotelData(res.data[0]);

        setLoading(false);
        setError(false);
      } catch (error) {
        setError("Failed to fetch hotels");
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);
  useEffect(() => {
    if (hotelData) {
      const filteredDishes = hotelData?.categories?.filter(
        (category) => category.name === "Fish"
      );
      if (filteredDishes) {
        const dishess = filteredDishes[0]?.dishes;
        setDishesData(dishess);
        console.log(filteredDishes);
      }
    }
  }, [hotelData]);

  const filterDishes = (dish) => {
    const filteredDishes = hotelData.categories.filter(
      (category) => category.name === dish
    );
    setDishesData(filteredDishes[0]?.dishes);
  };
  return (
    <div className="hotel-detail">
      <h1
        style={{
          color: "green",
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "10px",
        }}
      >
        {hotelData.name}
      </h1>
      <p
        style={{
          color: "green",
          textAlign: "center",
          fontSize: "1.2rem",
          marginTop: "0",
        }}
      >
        {hotelData.description}
      </p>
      <ImageSlider images={hotel.images} />
      <div className="category-buttons">
        {hotelData.categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(`${category.name}`);
              filterDishes(category.name);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="dishes">
        {loading ? (
          <div>loading.....</div>
        ) : (
          <>
            {dishesData?.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HotelDetail;
