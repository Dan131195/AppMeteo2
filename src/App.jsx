import "./App.css";
import Hompage from "./components/Hompage";
import NavBar from "./components/NavBar";
import Settings from "./components/Settings";

function App() {
  return (
    <div id="weatherApp">
      <NavBar />
      <Hompage />
      <Settings />
    </div>
  );
}

export default App;
