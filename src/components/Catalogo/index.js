"use client"
import React, { useState, useEffect } from "react";
import productosService from 'app/services/productos_service';
import categoriaService from 'app/services/categoria_service';
import "./Catalogo.css"
import "app/css/generales/botones.css"

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
                const categoriasData = await categoriaService.getCategoria();
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
        <div className="container-catalogo">
            <div className="flex-categoria-producto">
                <div className="flex-categoria">
                    <button className="btn-categoria" onClick={() => handleCategoriaClick(null)}>Todos</button>
                    {categorias.map(categoria => (
                        <button key={categoria.id_categoria} className="btn-categoria" onClick={() => handleCategoriaClick(categoria.id_categoria)}>{categoria.nombre_categoria}</button>
                    ))}
                </div>
                <div className="flex-producto">
                    {productos.map(producto => (
                    <div className="card m-2">
                        <div className="card-body">
                            <img className="productos" key={producto.id_producto} src={producto.imagen_producto} alt={producto.nombre_producto} />
                            <h5 className="card-title ml-4">{producto.nombre_producto}</h5>
                            <a href="login" className="btn ml-4">Comprar</a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Catalogo;