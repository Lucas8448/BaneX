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
        <Link to="/locations">Lokasjoner</Link>
      </div>
      <div className={`main-content ${isMenuOpen ? 'shifted' : ''}`}>
        {children}
      </div>
    </>
  );
}