import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Sobre from "./pages/Sobre/Sobre"
import Erro404 from "./pages/Erro404/Erro404"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;