import Image from "next/image"
import Link from "next/link"

const MenuPrincipalPage = () => {
    return (
        <div className="contenido">
            <h1>Menú Cliente</h1>
            <div className="opciones menuAdmin">
                <div className="btn_opciones">
                    <Link href="cliente/pedidos">
                        <Image src="/assets/icons/Pedidos.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Pedidos</h2>
                </div>
            </div>
        </div>

    )
}

export default MenuPrincipalPage