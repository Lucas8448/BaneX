import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </nav>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/">Home<span className="material-symbols-outlined float-left">
          home
        </span></Link>
        <Link to="/reservations">Reservations<span className="material-symbols-outlined float-left">
          book_online
        </span></Link>
        <Link to="/receipts">Receipts<span className="material-symbols-outlined float-left">
          description
        </span></Link>
      </div>
      <div className={`main-content ${isMenuOpen ? 'shifted' : ''}`}>
        {children}
      </div>
    </>
  );
}