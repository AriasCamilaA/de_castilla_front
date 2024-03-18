import Image from "next/image"
import Link from "next/link"


const MenuPrincipalPage = async () => {

    return (
        <div className="contenido">
            <h1>Menú Administrador</h1>
            <div className="opciones menuAdmin">
                <div className="btn_opciones">
                    <Link href="/admin/ventas">
                        <Image 
                            src="/assets/icons/ventas.png" 
                            alt='opción menú' 
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Ventas</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="/admin/inventario">
                        <Image 
                            src="/assets/icons/Inventario.png" 
                            alt='opción menú' 
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Inventario</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="/admin/pedidos">
                        <Image 
                            src="/assets/icons/Pedidos.png" 
                            alt='opción menú'
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Pedidos</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="admin/ordenes">
                        <Image 
                            src="/assets/icons/LogoOrdenes.png" 
                            alt='opción menú'
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Ordenes</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="/admin/configuraciones">
                        <Image 
                            src="/assets/icons/Configuracion.png" 
                            alt='opción menú'
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Otros</h2>
                </div>
            </div>
        </div>
    )
}

export default MenuPrincipalPage