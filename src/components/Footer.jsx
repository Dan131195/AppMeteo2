function Footer() {
  return (
    <footer className="bg-trasparent text-light mt-5">
      <div className="container py-4">
        {/* Divider */}
        <hr className="my-4 border-white " />

        {/* Copyright */}
        <div className="row">
          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p className=" small mb-0">
              © 2025 WeatherApp. Tutti i diritti riservati.
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <p className=" small me-3">Privacy Policy</p>
            <p className=" small ">Termini di Servizio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
