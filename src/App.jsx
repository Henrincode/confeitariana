import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/";
import Footer from "./components/Footer";

import Layout from "./pages/layout";
import Home from "./pages/Home/";
import Cardapio from "./pages/Cardapio/";
import Depoimentos from "./pages/Depoimentos/";
import Contato from "./pages/Contato/";
import NotFound from "./pages/NotFound/";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/depoimentos" element={<Depoimentos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
