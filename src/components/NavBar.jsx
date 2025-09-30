import WeatherAppIcon from "../assets/meteo-icona.png";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-sm ">
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
            className="navbar-toggler py-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="my-2">
              <i className="bi bi-search"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex py-2 ms-sm-3" role="search">
              <input
                className="form-control me-2 d-inline"
                type="search"
                placeholder="Cerca.."
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success d-inline"
                type="submit"
              >
                Cerca
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
