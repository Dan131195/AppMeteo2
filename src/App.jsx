import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hompage from "./components/Hompage";
import Settings from "./components/Settings";
import Error from "./components/Error";

function App() {
  return (
    <div id="weatherApp">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
