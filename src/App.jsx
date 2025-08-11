import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/";
import Footer from "./components/Footer";

import Layout from "./pages/layout";
import Home from "./pages/Home/";
import Sobre from "./pages/Sobre/";
import NotFound from "./pages/NotFound/";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
