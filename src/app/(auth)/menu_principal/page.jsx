import Image from "next/image"
import Link from "next/link"

const MenuPrincipalPage = () => {
    return (
        <div className="contenido">
            <h1>Menú Administrador</h1>
            <div className="opciones menuAdmin">
                <div className="btn_opciones">
                    <Link href="ventas/visualizarVenta">
                        <Image src="/assets/icons/ventas.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Ventas</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="inventario/visualizarInventario">
                        <Image src="/assets/icons/Inventario.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Inventario</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="ordenes/visualizar">
                        <Image src="/assets/icons/Proveedores.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Proveedores</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="pedidos">
                        <Image src="/assets/icons/Pedidos.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Pedidos</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="#">
                        <Image src="/assets/icons/Configuracion.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Configuración</h2>
                </div>
            </div>
        </div>

    )
}

export default MenuPrincipalPage