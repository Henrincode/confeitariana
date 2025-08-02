import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Home from "./pages/Home"
// import Sobre from "./pages/Sobre"
// import Erro404 from "./pages/Erro404"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<Erro404 />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;