"use client"
import React, { useState, useEffect } from "react";
import productosService from "app/services/inventario/productos_service";
import categoriaService from "app/services/inventario/categoria_service";
import "app/css/generales/botones.css"
import "app/css/general/catalogo.css"

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [productosSinFiltrar, setProductosSinFiltrar] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosData = await productosService.getProductos();
                setProductos(productosData);
                setProductosSinFiltrar(productosData);
                const categoriasData = await categoriaService.getcategorias();
                setCategorias(categoriasData);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, []);

    const handleCategoriaClick = (idCategoria) => {
        if (idCategoria === null) {
            setProductos(productosSinFiltrar);
        } else {
            const productosFiltrados = productosSinFiltrar.filter(producto => producto.categoria.id_categoria === idCategoria);
            setProductos(productosFiltrados);
        }
    };

    return (
        <div className="row container-catalogo_new">
            <div className="col-2 container-categories">
                <h3 className="mb-3 text-center title-categoria">Categorias</h3>
                <button className="btn-categoria" onClick={() => handleCategoriaClick(null)}>Todos</button>
                {categorias.filter(categoria => categoria.estado == 1).map(categoria => (
                    <button key={categoria.id_categoria} className="btn-categoria" onClick={() => handleCategoriaClick(categoria.id_categoria)}>{categoria.nombre_categoria}</button>
                ))}
            </div>
            <div className="col-10 container-products">
                    {productos.map(producto => (
                        <div className="card m-2 card-product" key={producto.id_producto}>
                        <div className="card-body card-body-product">
                            <img key={producto.id_producto} src={producto.imagen_producto} alt={producto.nombre_producto} />
                            <h5 className="card-title ml-4">{producto.nombre_producto}</h5>
                            <a href="login" className="btn ml-4">Comprar</a>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    );
}

export default Catalogo;