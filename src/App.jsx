import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hompage from "./components/Hompage";
import NavBar from "./components/NavBar";
import Settings from "./components/Settings";
import Error from "./components/Error";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [city, setCity] = useState("Roma");

  return (
    <div id="weatherApp">
      <BrowserRouter>
        <NavBar onSearchCity={setCity} />
        <div id="mainContent">
          <Routes>
            <Route path="/" element={<Hompage city={city} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
