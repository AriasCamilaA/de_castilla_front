import Image from "next/image"
import Link from "next/link"


const MenuPrincipalPage = async () => {

    return (
        <div className="contenido">
            <h1>Menú Administrador</h1>
            <div className="opciones menuAdmin">
                <div className="btn_opciones">
                    <Link href="admin/ventas">
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
                    <Link href="admin/inventarios">
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
                    <Link href="admin/proveedores">
                        <Image 
                            src="/assets/icons/Proveedores.png" 
                            alt='opción menú'
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}    
                        />
                    </Link>
                    <h2>Proveedores</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="admin/pedidos">
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
                {/* <div className="btn_opciones">
                    <Link href="admin/categorias">
                        <Image 
                            src="/assets/icons/LogoUsuarios.png" 
                            alt='opción menú'
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Categorias</h2>
                </div> */}
                <div className="btn_opciones">
                    <Link href="admin/usuarios">
                        <Image 
                            src="/assets/icons/LogoUsuarios.png" 
                            alt='opción menú'
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Usuarios</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="admin/categorias">
                        <Image src="/assets/icons/Configuracion.png" alt='opción menú' width={140} height={50} />
                    </Link>
                    <h2>Configuración</h2>
                </div>
            </div>
        </div>
    )
}

export default MenuPrincipalPage