"use client"
import Link from "next/link";
import "./NavBar.css";
import validateAccessToken from "app/utilities/auth/validateAccessToken";
import { useState, useEffect } from "react";
import cerrarSession from "app/utilities/auth/cerrarSession";
import inventarioService from "app/services/inventario/Inventario_service";

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        validateAccessToken()
            .then((user) => {
            setUser(user);
            // Llamar a la función para verificar el stock bajo
            checkLowStock();
            // Establecer una validación del inventario cada 30 segundos
            const interval = setInterval(checkLowStock, 10000); // 30 segundos
            return () => clearInterval(interval); // Limpiar el intervalo en caso de que el componente se desmonte
        
            })
            .catch((error) => {
            console.error(error);
            });
        }, []);

      // Función para verificar el stock bajo
  const checkLowStock = async () => {
    try {
      inventarioService.getInventario()
        .then(
          (response) => {
            const inventario = response;
            const lowStock = inventario.filter(item => {
              return item.stock_inventario <= 5; // Filtrar los elementos con stock menor a 5
            });
            setLowStockItems(lowStock);
          }
        )
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  };


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
                        <img src='/assets/icons/menuLateral/LogoVentas.png' alt="icono" />
                        <Link href="/empleado/ventas">Ventas</Link>
                    </div>
                    <div className="menuLateral__Opcion">
                        <img src='/assets/icons/menuLateral/LogoInventario.png' alt="icono" />
                        <Link href="/empleado/inventario">Inventario</Link>
                    </div>
                    <div className="menuLateral__Opcion">
                        <img src='/assets/icons/menuLateral/LogoProveedores.png' alt="icono" />
                        <Link href="/empleado/proveedores">Proveedores</Link>
                    </div>
                    <div className="menuLateral__Opcion">
                        <img src='/assets/icons/menuLateral/LogoUsuarios.png' alt="icono" />
                        <Link href="cliente/usuarios">Usuario</Link>
                    </div>
                </div>
                </div>
                {
                    // Aca debo saber en que ruta estoy para mostrar el logo
                    <Link href="/empleado/">
                        <img className="icon" src='/assets/icons/LogoCasa.png'/>
                    </Link>
                }
                                {
                    lowStockItems.length > 0 && (
                    <div className="dropdown me-5">
                        <button className="icon dropdown-toggle menu-user text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <p>Alertas</p>
                        {lowStockItems.length > 0 && (
                        <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{lowStockItems.length}</div>)
                        }
                        </button>
                        <ul className="dropdown-menu user-dropdown">
                        <li>  
                            {/* Mostrar notificación si hay elementos con stock bajo */}
                            {lowStockItems.length > 0 && (
                                <div className="notification-badge">
                                {lowStockItems.map(item => (
                                    <p key={item.id_inventario} className="text-light m-2 border-bottom border-white">
                                    {item.insumo ? item.insumo.nombre_insumo : item.producto.nombre_producto}: {item.stock_inventario}
                                    </p>
                                ))}
                                </div>
                            )}
                        </li>
                        </ul>
                    </div>
                    )
                }
            </div>
            <div className="menu-logo">
                <img src='/assets/img/logoClaro.png'/>
            </div>
            <div className="dropdown">
                <button className="dropdown-toggle menu-user" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="icon" src='/assets/icons/Logo Usuario.png'/>
                {user && `${user.nombre_usuario} ${user.apellido_usuario}`}
                </button>
                <ul className="dropdown-menu user-dropdown">
                <li>
                    {user && <Link className="dropdown-item dropdownNavBar" href={`/empleado/user/${user.no_documento_usuario}`}>
                        <img src='/assets/icons/LogoUserWhite.png' className="px-2"/>
                        <p>
                            Perfil de Usuario
                        </p>
                    </Link>}
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