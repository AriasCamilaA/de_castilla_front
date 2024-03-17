import "app/css/general/NavBarLanding.css";

const NavBar = () => {
    return (
        <nav className="landingMenu__Superior flex bg-oscuro justify-content-around align-items-center fixed-top">
            <div className="menu-logo nav-landing flex">
                <a href="/landing">
                <img src="assets/img/logoClaro.png" className="imgNav" />
                </a>
                <div className="landingMenu__links">
                <ul>
                    <li><a href="#banner">Inicio</a></li>
                    <li><a href="#quienes_somos">Quienes somos</a></li>
                    <li><a href="#especialidades">Menú</a></li>
                    <li><a href="#galeria">Galería</a></li>
                    <li><a href="#contactanos">Contactanos</a></li>
                </ul>
                </div>
            </div>
            <div className="landingMenu__btns">
                <a href="/login" className="btn">Iniciar Sesión</a>
                <a href="/register" className="btn" name="btn_register">Registrarse</a>
            </div>
        </nav>
    )
}

export default NavBar;