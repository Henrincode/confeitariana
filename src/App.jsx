import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Sobre from "./pages/Sobre/Sobre"
import NotFound from "./pages/NotFound/NotFound"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <strong>Footer</strong>
      </footer>
    </div>
  )
}

export default App;