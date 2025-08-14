import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Layout.module.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Layout() {
  const location = useLocation();

  // Volta para o topo ao trocar de página
  useEffect(() => {
    window.scrollTo({ top: 0});
  }, [location.pathname]);

  return (
    <>
      <div className="layout">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
