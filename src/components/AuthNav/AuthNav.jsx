import { clsx } from "clsx";
import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const AuthNav = () => {
  return (
    <div>
      <nav className={s.nav}>
        <NavLink className={buildLinkClass} to="/login">
          Login
        </NavLink>
        <NavLink className={buildLinkClass} to="/register">
          Registration
        </NavLink>
      </nav>
    </div>
  );
};

export default AuthNav;