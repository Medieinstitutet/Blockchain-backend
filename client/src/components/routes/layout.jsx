import { Outlet } from "react-router";
import "../../styles/layout.css";
import { NavLink } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="wrapper">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/blockchain"}>Blockchain</NavLink>
            </li>
            <li>
              <NavLink to={"/account"}>Account</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main><Outlet /></main>
    </div>
  )
}
