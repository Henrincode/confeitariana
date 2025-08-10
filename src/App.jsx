import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/";
import Sobre from "./pages/Sobre/";
import NotFound from "./pages/NotFound/";
import Navbar from "./components/Navbar/";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="layout">
      <Navbar />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
