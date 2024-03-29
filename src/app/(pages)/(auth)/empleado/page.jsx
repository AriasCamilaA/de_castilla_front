import Image from "next/image"
import Link from "next/link"

const MenuPrincipalPage = () => {
    return (
        <div className="contenido">
            <h1>Menú Empleado</h1>
            <div className="opciones menuAdmin">
            <div className="btn_opciones">
                    <Link href="empleado/ventas">
                        <Image src="/assets/icons/ventas.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Ventas</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="empleado/inventario">
                        <Image src="/assets/icons/Inventario.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Inventario</h2>
                </div>
                {/* <div className="btn_opciones">
                    <Link href="empleado/proveedores">
                        <Image src="/assets/icons/Proveedores.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Proveedores</h2>
                </div> */}
                <div className="btn_opciones">
                    <Link href="empleado/pedidos">
                        <Image src="/assets/icons/Pedidos.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Pedidos</h2>
                </div>
            </div>
        </div>

    )
}

export default MenuPrincipalPage