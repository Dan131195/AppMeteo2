import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherAppIcon from "../assets/meteo-icona.png";

function NavBar({ onSearchCity }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchCity(searchInput.trim());
      navigate("/"); // Reindirizza alla homepage
      setSearchInput(""); // Pulisce l'input
    }
  };

  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid d-flex justify-content-between">
        <p className="navbar-brand m-0 text-light fw-bold">
          <img
            src={WeatherAppIcon}
            id="weatherAppIconNavbar"
            className="me-2 border border-2 rounded-4"
            alt="Weather App Icon"
          />
          WeatherApp
        </p>
        <button
          className="navbar-toggler py-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="my-2">
            <i className="bi bi-search fw-bold"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="d-flex justify-content-center align-items-center justify-content-sm-end w-100 py-2 ms-sm-3"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control me-2 bg-transparent text-light"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn" type="submit">
              <i className="bi bi-search fs-3"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
