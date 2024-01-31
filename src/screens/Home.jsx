
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Show List</h1>
      <ul className="row">
        {shows.map((show) => (
          <li key={show.show.id} className="col-md-4 mb-4">
            <Link to={`/show/${show.show.id}`} className="card-link">
              <div className="card">
                <img
                  src={show.show.image && show.show.image.medium}
                  alt={show.show.name}
                  // style={{ width: '50px', height: '75px', marginRight: '10px' }}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{show.show.name}</h5>
                  <p className="card-text">
                    {show.show.network && show.show.network.name}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
