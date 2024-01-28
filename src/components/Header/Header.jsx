import { NavLink } from "react-router-dom"
import './Header.css'


const Header = () => {
  return (
    <header>
        <nav>
            <ul className="navUl">
                <NavLink to={"/"}>Principal</NavLink>
                <NavLink to={"/register"}>Registro</NavLink>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/products"}>Productos</NavLink>
                <NavLink to={"/carts/:id"}>Carrito</NavLink>
                <NavLink to={"/new-products"}>Crear Productos</NavLink>
            </ul>
        </nav>
    </header>
  )
}

export default Header
