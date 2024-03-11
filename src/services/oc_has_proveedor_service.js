import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const OchasproveedorService = {
    // _________ Inventario ___________________________________________________________
    getOchasproveedor : async () => {
        try {
            const url_ochasproveedor = url + "ochasproveedores//";
            const response = await axios.get(url_ochasproveedor);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: OCHASPROVEEDOR: "+error);
            throw error;
        }
        
    },
    getHasproveedorById : async (id) => {
        try {
            const url_ochasproveedor = url + "ochasproveedores/"+id;
            const response = await axios.get(url_ochasproveedor);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: OCHASPROVEEDOR POR ID: "+error);
            throw error;
        }
        
    },
    // createInventario : async (inventario) => {
    //     try {
    //         inventario.estado = true;
    //         const url_inventario = url + "inventario/";
    //         const response = await axios.post(url_inventario, inventario);
    //         const data = response.data;
    //         return data;
    //     } catch (error) {
    //         console.error("API ERROR: REGISTRAR INVENTARIO: "+error);
    //         throw error;
    //     }
        
    // },
    // updateInventario : async (inventario) => {
    //     try {
    //         const url_inventario = url + "inventario/"+inventario.id_inventario+"/";
    //         const response = await axios.put(url_inventario, inventario);
    //         const data = response.data;
    //         return data;
    //     } catch (error) {
    //         console.error("API ERROR: AL ACTUALIZAR INVENTARIO: "+error);
    //         throw error;
    //     }
        
    // },

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

export default OchasproveedorService;