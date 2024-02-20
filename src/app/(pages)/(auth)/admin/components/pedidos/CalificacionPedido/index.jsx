import React, { useState } from 'react';
import { showAlert } from 'app/app/utilities';
import pedidosService from 'app/app/services/pedidos_service';

const CalificacionPedido = ({pedidoCalificable}) => {

    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
    };

    const calificarPedido = (pedido) => {
        const pedidoActualizado = {
            ...pedido,
            estado: 1,
            calificacion_pedido: rating,
        };
        pedidosService.updatePedido(pedidoActualizado)
            .then(() => {
                showAlert("success", "Gracias por Calificar", "El pedido ha sido actualizado correctamente.");
            })
            .catch(() => {
                showAlert("error", "Error de Actualización", "No se pudo actualizar el pedido.");
            });
    }

    return (
        <div>
            <div style={{ fontSize: '50px' }} className='d-flex justify-content-center'>
                {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                    key={value}
                    selected={value <= rating}
                    onClick={() => handleClick(value)}
                    />
                ))}
            </div>
            <div className='d-flex justify-content-center btn'>
                <button onClick={() => calificarPedido(pedidoCalificable)}>Calificar</button>
            </div>
        </div>
    );
};

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

export default CalificacionPedido;
