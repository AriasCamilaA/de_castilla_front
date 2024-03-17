"use client"
import Link from "next/link";
import "app/css/general/NavBar.css";
import validateAccessToken from "app/utilities/auth/validateAccessToken";
import { useState, useEffect } from "react";
import cerrarSession from "app/utilities/auth/cerrarSession";

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
            <div className="menu-logo">
                <img src='/assets/img/logoClaro.png'/>
            </div>
            <div className="dropdown">
                <button className="dropdown-toggle menu-user" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="icon" src='/assets/icons/Logo Usuario.png'/>
                <p className="hidden_on_mobile">
                    {user && `${user.nombre_usuario} ${user.apellido_usuario}`}
                </p>
                </button>
                <ul className="dropdown-menu user-dropdown">
                <li className="hidden_on_desktop show_in_mobile text-light p-3">
                    {user && (user.nombre_usuario)}
                </li>
                <li> 
                    {user && <Link className="dropdown-item dropdownNavBar" href={`/cliente/user/${user.no_documento_usuario}`}>
                        <img src='/assets/icons/LogoUserWhite.png' className="px-2"/>
                        <p>
                            Perfil de Usuario
                        </p>
                    </Link>}
                </li>
                <li className="px-2">
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