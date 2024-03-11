import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const categoriaService = {
    // _________ Categoria ___________________________________________________________
<<<<<<< HEAD:src/services/categoria_service.js
    getCategoria : async () => {
=======
    getcategorias : async () => {
>>>>>>> Arias:src/services/inventario/categoria_service.js
        try {
            const url_categoria = url + "categorias/";
            const response = await axios.get(url_categoria);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: CATEGORIA: "+error);
            throw error;
        }
        
    },
    getCategoriaById : async (id) => {
        try {
            const url_categoria = url + "categorias/"+id;
            const response = await axios.get(url_categoria);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: INVENTARIO POR ID: "+error);
            throw error;
        }
        
    },
    createCategoria : async (categoria) => {
        try {
            categoria.estado = true;
            const url_categoria = url + "categorias/";
            const response = await axios.post(url_categoria, categoria);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR CATEGORIA: "+error);
            throw error;
        }
        
    },
    updateCategoria : async (categoria) => {
        try {
            const url_categoria = url + "categorias/"+categoria.id_categoria+"/";
            const response = await axios.put(url_categoria, categoria);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR CATEGORIA: "+error);
            throw error;
        }
        
    },

    // _________ PDF ___________________________________________________________
    // getPDF : async () => {
    //     try {
    //         const url_productos = url + "proveedores/generate-pdf/";
    //         // const response = await axios.get(url_productos);
    //         // const data = response.data;
    //         window.open(url_productos);
    //         return null;
    //         // console.log(data)
    //         return data;
    //     } catch (error) {
    //         console.error("API ERROR: ESTADOS PEDIDO: "+error);
    //         throw error;
    //     }
        
    // },
}

export default categoriaService;