import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import AnnouncementBar from "./Components/AnnouncementBar";
import Product from "./Components/Product";
import { useSelector } from "react-redux";
function App() {
  const state = useSelector((state) => state.handleCart);
  return (
    <>
      <AnnouncementBar />

      <header className="bg-gray-800 text-white py-2 px-6 flex items-center justify-between">
        <div></div>
        <div className="flex items-center">
          <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
        </div>
      </header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Header />} />

          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
