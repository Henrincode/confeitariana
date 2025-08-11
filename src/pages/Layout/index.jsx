import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Layout() {
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
