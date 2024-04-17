import "./List.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";

const List = () => {
  const [list, setList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
        );
        setList((prevList) => [...prevList, ...response.data]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const addToFavorites = (item) => {
    const newFavorites = [...favorites];
    const existingIndex = newFavorites.findIndex((fav) => fav.id === item.id);

    if (existingIndex !== -1) {
      newFavorites.splice(existingIndex, 1);
    } else {
      newFavorites.push(item);
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <div>
      <h2>List Page</h2>
      <button onClick={() => window.history.back()}>Back</button>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <div>ID: {item.id}</div>
            <div>Title: {item.title}</div>
            <div>
              <button onClick={() => addToFavorites(item)}>
                {favorites.find((fav) => fav.id === item.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
              <img src={item.thumbnailUrl} alt={item.title} />
            </div>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;
