import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/ContextProviders";
import "./Header.css";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { jwt, decodeToken } = useContext(Context);

  useEffect(() => {
    if (jwt) {
      const token = decodeToken(jwt);

      if (token.user.rol === "user") setIsAdmin(true);
    }
  }, [jwt, decodeToken]);

  return (
    <header className="header">
      <nav>
        <ul className="navUl">
          <div className="navegador">
            <NavLink to={"/"}>PRINCIPAL</NavLink>
            <NavLink to={"/products"}>PRODUCTOS</NavLink>
            <NavLink to={"/carts/:id"}>MI BOLSA</NavLink>
          </div>
          <div className="registro">
            <NavLink to={"/register"}>REGISTRARME</NavLink>
            <NavLink to={"/login"}>LOGIN</NavLink>
            {isAdmin && <NavLink to={"/panel-admin"}>Panel Admin</NavLink>}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
