import 'app/app/css/style.css';
import 'app/app/css/forms.css';
import 'app/app/css/tablas.css';
import 'app/app/css/botones.css';

const inventarioPage = () => {
    return (
        <div className="contenido">
        <h1>Inventario</h1>
        <div className="filtros">
          <div>
            <img src="/assets/icons/lupa.png" alt="" />
            <input type="text" id="searchTerm" />
            <img src="/assets/icons/agregar.png" alt="" data-toggle="modal" data-target="#create" />
          </div>
          <div className="filtros__fecha">
            <input type="date" name="" id="" />
            <input type="date" name="" id="" />
          </div>
          <img src="/assets/icons/excel.png" alt="" />
        </div>
  
        <div className="tablaConTab">
          <div>
            <button className="tablink bg-oscuro">Insumos</button>
            <button className="tablink" >Productos</button>
          </div>
          <div id="Insumos" className="tab_content">
            <div className="tabla">
              <table className="table table-hover table-striped" id="datos">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Insumo</th>
                    <th scope="col">Entradas</th>
                    <th scope="col">Salidas</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Empleado</td>
                        <td>21/03/2023</td>
                        <td>14:15</td>
                        <td>
                        <span class="tabla__total">25.000</span>
                        </td>
                        <td class="tabla__opcion">
                        <a href="./verProducto.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Administrador</td>
                        <td>15/03/2023</td>
                        <td>13:33</td>
                        <td>
                        <span class="tabla__total">5.000</span>
                        </td>
                        <td class="tabla__opcion">
                        <a href="./verProducto.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Administrador</td>
                        <td>18/03/2023</td>
                        <td>12:54</td>
                        <td>
                        <span class="tabla__total">19.000</span>
                        </td>
                        <td class="tabla__opcion">
                        <a href="./verProducto.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Empleado</td>
                        <td>17/03/2023</td>
                        <td>18:01</td>
                        <td>
                        <span class="tabla__total">12.000</span>
                        </td>
                        <td class="tabla__opcion">
                        <a href="./verProducto.html">
                            <img src="../../assets/icons/visualizar.png" alt="Visualizar"/>
                        </a>
                        </td>
                    </tr>
                </tbody>

              </table>
            </div>
            {/* Aquí incluye el componente de creación de inventario */}
            {/* <CrearInventario /> */}
          </div>
  
          <div id="Productos" className="tab_content" style={{ display: 'none' }}>
            {/* ------------------------------------tabla productos */}
          </div>
        </div>
      </div>
    );
  }
  
  export default inventarioPage;