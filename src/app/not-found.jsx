import 'app/css/general/errores.css'
import Link from 'next/link'

const error404 = () => {
  return (
<div className='contenedorError'>
    <img src="/assets/img/error404.png" alt="Error interno en el servidor" className="errorPagina"/>
    <img src="/assets/img/footerErrors.png" alt="lineas de colores" className="errorFooter"/>
    <Link className='enlaceError color-oscuro' href="/">Volver a la página principal</Link>
</div>
  )
}

export default error404