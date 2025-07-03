import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

export const Navbar = () => {
  return (
    <>
      <header>
        <nav className="bg-gray-800">
          <div className="nav-left">
            <div className="logo">
              <img src="public/assets/ui_assets/crimsonveil_150x150.png" />
            </div>
          </div>

          <div className="nav-center">
            <ul className="nav-links">
              <li>Main Page</li>
              <li>About Game</li>
              <li>Support</li>
            </ul>
          </div>

          <div className="nav-right">
            <NavLink to={"/login"}>
              <button className="bg-blue-500">
                <LoginIcon />
              </button>
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
};
