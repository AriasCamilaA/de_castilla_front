import Image from "next/image"
import Link from "next/link"



const configuracionesPage = async () => {

    return (
        <div className="contenido">
            <h1>Configuraciones</h1>
            <div className="opciones menuAdmin">
                <div className="btn_opciones">
                    <Link href="/admin/productos">
                        <Image 
                            src="/assets/icons/waffle.png" 
                            alt='opción menú' 
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Productos</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="/admin/insumos">
                        <Image 
                            src="/assets/icons/Inventario.png" 
                            alt='opción menú' 
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Insumos</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="/admin/proveedores">
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
                    <Link href="/admin/categorias">
                        <Image 
                            src="/assets/icons/Categoria.png" 
                            alt='opción menú'
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '140px', height: 'auto' }}
                        />
                    </Link>
                    <h2>Categorias</h2>
                </div>
                <div className="btn_opciones">
                    <Link href="/admin/usuarios">
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
            </div>
        </div>
    )
}

export default configuracionesPage