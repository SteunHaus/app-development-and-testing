import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import './App.css'

function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: 20 }}>
        <Link to="/" className="btn">Home</Link>
        <Link to="/search" className="btn">Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App
