import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import "./Layout.css"

export default function Layout(props: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </nav>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/locations">Lokasjoner</Link>
        <Link to="/spaces">Hensettingsplasser</Link>
        <Link to="/reservations">Reservasjoner</Link>
        <Link to="/reservations/create">Reserver</Link>
      </div>
      <div className={`main-content ${isMenuOpen ? 'shifted' : ''}`}>
        {props.children}
      </div>
    </>
  );
}