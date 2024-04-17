import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);
  return (
    <div>
      <h2>Dashboard Page</h2>
      <Link to="/list">Go to List Page</Link>
      <ul>
        {favorites.map((favorite) => (
          <>
            <div>ID: {favorite.id}</div>
            <li key={favorite.id}>{favorite.title}</li>
            <img src={favorite.thumbnailUrl} alt={favorite.title} />
          </>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
