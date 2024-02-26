"use client"
import Link from "next/link";
import "./NavBar.css";
import validateAccessToken from "app/utilities/auth/validateAccessToken";
import { useState, useEffect } from "react";

const NavBar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        validateAccessToken()
            .then((user) => {
            setUser(user);
            })
            .catch((error) => {
            console.error(error);
            });
        }, []);

    const handleLogout = async () => {
        try {
            await cerrarSession(); // Call the cerrarSession function
            window.location.href = "/login"; // Redirect to the login page
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    return (
        <nav className="menuSuperior">
            <div className="logosMenu">
                <div>
                <label htmlFor="menuHam">
                    <img className="icon" src='/assets/icons/Menu Hamburguesa.png'/>
                </label>
                <input type="checkbox" id="menuHam" />
                <div className="menuLateral">
                    <div className="menuLateral__Opcion">
                        <img src='/assets/icons/menuLateral/LogoPedidos.png' alt="icono" />
                        <Link href="cliente/pedidos">Pedidos</Link>
                    </div>
                    <div className="menuLateral__Opcion">
                        <img src='/assets/icons/menuLateral/LogoUsuarios.png' alt="icono" />
                        <Link href="cliente/usuarios">Usuario</Link>
                    </div>
                </div>
                </div>
                {
                    // Aca debo saber en que ruta estoy para mostrar el logo
                    <Link href="/menu_principal">
                        <img className="icon" src='/assets/icons/LogoCasa.png'/>
                    </Link>
                }
                
            </div>
            <div className="menu-logo">
                <img src='/assets/img/logoClaro.png'/>
            </div>
            <div className="dropdown">
                <button className="dropdown-toggle menu-user" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="icon" src='/assets/icons/Logo Usuario.png'/>
                {user && user.nombre_usuario}
                </button>
                <ul className="dropdown-menu user-dropdown">
                <li>
                    <Link className="dropdown-item dropdownNavBar" href="#">
                        <img src='/assets/icons/LogoUserWhite.png' className="px-2"/>
                        <p>
                            Perfil de Usuario
                        </p>
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item dropdownNavBar" href="#">
                        <img src='/assets/icons/LogoOffWhite.png' className="px-2"/>
                        <p onClick={handleLogout}>
                            Cerrar Sesión
                        </p>
                    </Link>
                    <form id="logout-form" action="" method="POST" className="d-none">
                    </form>
                </li>
                </ul>
            </div>
            </nav>

    );
}

export default NavBar;