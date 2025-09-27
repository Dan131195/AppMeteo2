import WeatherAppIcon from "../assets/meteo-icona.png";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid d-flex justify-content-between">
          <p className="navbar-brand m-0">
            <img
              src={WeatherAppIcon}
              id="weatherAppIconNavbar"
              className="me-2"
            ></img>
            WeatherApp
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-inline" role="search">
              <input
                className="form-control me-2 d-inline"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success d-inline"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
