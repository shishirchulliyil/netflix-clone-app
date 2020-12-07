import React, { useState, useEffect } from "react";
import request from "./request";
import axios from "./axios";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(request.fetchNetflixOriginals);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    fetchData();
  }, []);

  function truncateDescription(overview) {
    if (overview?.length > 150) {
      return overview.substring(0, 149) + "...";
    } else {
      return overview;
    }
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      {/* header will have a background image */}
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        {/* div >> two buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        {/* description */}
        <h1 className="banner__description">
          {truncateDescription(movie?.overview)}
        </h1>
      </div>
      {/* div to fade in to Rows */}
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
