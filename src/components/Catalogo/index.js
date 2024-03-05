import "./Catalogo.css";
import { useEffect, useState } from "react";

const Categoria = ({ categoria }) => {
    const [categoria, setCategoria] =  useState("");

    return (
        <div>
            <div>
                <button>Obleas</button>
                <div className="flex-categoria">
                    <img src=""></img>
                    <img src=""></img>
                    <img src=""></img>
                    <img src=""></img>
                    <img src=""></img>
                </div>
            </div>
        </div>
    )
}

export default Categoria;