import { NavLink } from "react-router-dom"
import './Header.css'


const Header = () => {
  return (
    <header className="header">
        <nav>
            <ul className="navUl">
              <div className="navegador">
                <NavLink to={"/"}>Principal</NavLink>
                <NavLink to={"/products"}>Productos</NavLink>
                <NavLink to={"/carts/:id"}>Carrito</NavLink>
                <NavLink to={"/new-products"}>Crear Productos</NavLink>
              </div>
              <div className="registro">
                <NavLink to={"/register"}>Registro</NavLink>
                <NavLink to={"/login"}>Login</NavLink>
              </div>
            </ul>
        </nav>
    </header>
  )
}

export default Header
