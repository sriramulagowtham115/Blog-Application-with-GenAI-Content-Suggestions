import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar">
   
        <h2 className="brand">Inkwell — AI-Powered Blog Platform</h2>


      <div className="nav-right">
        <Link to="/">
          <button
            className={`home-btn ${
              location.pathname === "/" ? "active-home" : ""
            }`}
          >
            Home
          </button>
        </Link>

        <Link to="/write">
          <button className="write-btn">✏ Write</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;