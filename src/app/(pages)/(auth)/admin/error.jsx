"use client"
import 'app/css/generales/errores.css'
import Link from 'next/link'

const error500 = () => {
  return (
<div className='contenedorError'>
    <img src="/assets/img/error500.png" alt="Error interno en el servidor" className="errorPagina"/>
    <img src="/assets/img/footerErrors.png" alt="lineas de colores" className="errorFooter"/>
    <Link  className='enlaceError color-oscuro' href="/admin">Volver a la página principal</Link>
</div>
  )
}

export default error500