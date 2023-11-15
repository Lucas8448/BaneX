import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.svg";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <nav>
        <Link to="/">
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        <Link to="/locations">Lokasjoner</Link>
        <Link to="/spaces">Hensettingsplasser</Link>
        <Link to="/reservations">Reservasjoner</Link>
        <Link to="/reservations/create">Reserver</Link>
      </nav>
      {props.children}
    </>
  );
}
