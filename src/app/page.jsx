import Catalogo from "app/components/Catalogo";
import NavBar from "app/components/Landing/NavBar/NavBar";
import Footer from "app/components/Landing/Footer/Footer";
import "app/css/general/Landing.css";

export default function Home() {
  return (
    // className="flex min-h-screen flex-col items-center justify-between p-24"
    <main>
      <NavBar/>
      <div>
            <section id="banner">
                <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <div className="carrusel">
                        <h1 className="titulo_producto_carrusel">Cheescake de mora</h1>
                        <img src='assets/img/p2.jpeg' className="d-block w-100" />
                    </div>
                    </div>
                    <div className="carousel-item">
                    <div className="carrusel">
                        <h1 className="titulo_producto_carrusel">Postre de Fresas</h1>
                        <img src='assets/img/p3.jpeg' className="d-block w-100" />
                    </div>
                    </div>
                    <div className="carousel-item">
                    <div className="carrusel">
                        <h1 className="titulo_producto_carrusel">Tiramisu</h1>
                        <img src='assets/img/p4.jpeg' className="d-block w-100" />
                    </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </section>
            <img src='assets/img/separador.png' alt='imagen' className="separador" />
            <section id="quienes_somos" className="container d-flex flex-column text-center justify-content-center">
                <h1 className="my-3">Bienvenido a la Reposteria De Castilla</h1>
                <p className="w-75 text-center m-auto">Nos apasiona crear experiencias dulces y memorables para nuestros clientes. Somos más que una simple repostería; somos artesanos de los sabores, dedicados a traer alegría a través de cada bocado. Desde helados artesanales hasta exquisitas cheesecakes, nuestra amplia gama de productos está diseñada para satisfacer los paladares más exigentes.</p>
            </section>
            <section id="especialidades" className="especialidades container">
                <div className="separador" />
                <h1>Nuestras Especialidades</h1>
                <div>
                <div>
                    <img src='assets/icons/cheesecake.png' alt="cheese_cake" />
                    <p>CHEESECAKE</p>
                </div>
                <div>
                    <img src='assets/icons/mantecada.png' alt="mantecada" />
                    <p>MANTECADA</p>
                </div>
                <div>
                    <img src='assets/icons/helado.png' alt="helado" />
                    <p>HELADO</p>
                </div>
                <div>
                    <img src='assets/icons/oblea.png' alt="oblea" />
                    <p>OBLEA</p>
                </div>
                <div>
                    <img src='assets/icons/waffle.png' alt="waffle" />
                    <p>WAFFLE</p>
                </div>
                </div>
            </section>
            <img src='assets/img/separador.png' alt='imagen' className="separador" />
            <section id="galeria" className="catalogo bg-fondo2">
                <h1 className="center-title catalogo_title">Catalogo</h1>
                <div className="container">
                    <Catalogo/>
                </div>
            </section>
            </div>
      <Footer/>
    </main>
  );
}
