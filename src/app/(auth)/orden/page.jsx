import 'app/app/css/style.css';
import 'app/app/css/forms.css';
import 'app/app/css/tablas.css';
import 'app/app/css/proveedores.css';
import 'app/app/css/botones.css';

const ordenPage = () => {
    return (
<div className="contenido">
      <h1>Ordenes de Compra</h1>
      <div className="contenido_proveedores">
        <div>
          <div className="filtros">
            <div>
              <img src="/assets/icons/lupa.png" alt="" />
              <input type="text" id="searchTerm" />
              <img src="/assets/icons/agregar.png" alt="" data-toggle="modal" data-target="#create" />
            </div>
            <img src="/assets/icons/excel.png" alt="" />
          </div>
          <div className="tabla">
            <table className="table table-hover table-striped" id="datos">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Calificación</th>
                  <th className="tabla__opcion" scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Empleado</td>
                    <td>21/03/2023</td>

                    <td class="tabla__opcion">
                        <a href="./verVenta.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Administrador</td>
                    <td>15/03/2023</td>
              
                    <td class="tabla__opcion">
                        <a href="./verVenta.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Administrador</td>
                    <td>18/03/2023</td>

                    <td class="tabla__opcion">
                        <a href="./verVenta.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>Empleado</td>
                    <td>17/03/2023</td>

                    <td class="tabla__opcion">
                        <a href="./verVenta.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                    </td>
                </tr>
            </tbody>

            </table>
          </div>
          {/* Aquí incluye el componente de creación de órdenes */}
          {/* <CrearOrden /> */}
        </div>
        <div>
          {/* <img className="calendario" src="/assets/img/calendario.png" alt="" /> */}
        </div>
      </div>
    </div>
    );
  }
  
  export default ordenPage;