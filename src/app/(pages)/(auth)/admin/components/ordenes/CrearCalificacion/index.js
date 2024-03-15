import React, { useState } from 'react';
import { showAlert } from 'app/utilities';
import calificacionesService from 'app/services/calificaciones_service';

const Star = ({ selected, onClick }) => {
    return (
        <span
            style={{ cursor: 'pointer', color: selected ? 'gold' : 'grey' }}
            onClick={onClick}
        >
            &#9733;
        </span>
    );
};

const CrearCalificacion = ({ ordenCalificable, proveedor }) => {
    const [comentario, setComentario] = useState('');
    const [estrellas, setEstrellas] = useState(0);

    const handleComentarioChange = (event) => {
        setComentario(event.target.value);
    };

    const handleClick = (value) => {
        setEstrellas(value);
    };

    const crearCalificacion = () => {
        const nuevaCalificacion = {
            comentario_calificacion: comentario,
            estrellas_calificacion: estrellas,
            estado: true, 
            id_proveedor_fk: proveedor ? proveedor.id_proveedor : null,
        };

        calificacionesService.createCalificacion(nuevaCalificacion)
            .then(() => {
                showAlert("success", "Calificación Creada", "La calificación se ha creado correctamente.");
            })
            .catch(() => {
                showAlert("error", "Error al Crear Calificación", "No se pudo crear la calificación.");
            });
    };

    return (
        <div>
            <div>
                <label>Comentario:</label>
                <textarea value={comentario} onChange={handleComentarioChange} />
            </div>
            <div style={{ fontSize: '50px' }} className='d-flex justify-content-center'>
                {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                        key={value}
                        selected={value <= estrellas}
                        onClick={() => handleClick(value)}
                    />
                ))}
            </div>
            <div className='d-flex justify-content-center btn'>
                <button onClick={() => crearCalificacion()}>Crear Calificación</button>
            </div>
        </div>
    );
};

export default CrearCalificacion;
