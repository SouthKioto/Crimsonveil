import { NavLink } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const Navbar = () => {
  return (
    <>
      <header>
        <div className="bg-gradient-to-b from-black">
          <nav className="flex items-center justify-between px-5 h-30">
            <div className="nav-left">
              <div className="logo">
                <img src="public/assets/ui_assets/crimsonveil_150x150.png" />
              </div>
            </div>

            <div className="nav-center flex flex-1 justify-center items-center">
              <ul className="nav-links flex space-x-20">
                <li className="text-3xl text-red-900 font-medium cursor-pointer ">
                  <NavLink to={"/character-classes"}>
                    <button className="cursor-pointer">
                      Character Classes
                    </button>
                  </NavLink>
                </li>
                <li className="text-3xl text-red-900 font-medium">
                  <NavLink to={"/about-game"}>
                    <button className="cursor-pointer">About Game</button>
                  </NavLink>
                </li>
                <li className="text-3xl text-red-900 font-medium">
                  <NavLink to={"/support"}>
                    <button className=" cursor-pointer">Support</button>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="nav-right flex items-center">
              <NavLink to={"/login"}>
                <button className="cursor-pointer">
                  <PersonOutlineIcon
                    fontSize="large"
                    style={{ color: "#8B0000" }}
                  />
                </button>
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
