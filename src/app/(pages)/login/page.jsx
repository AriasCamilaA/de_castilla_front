import 'app/app/css/style.css';
import 'app/app/css/forms.css';
import 'app/app/css/login.css';
import 'app/app/css/botones.css';

const loginPage = () => {
    return (
        <div className='fondoTranslucido'>
            <section className="container">
                <img className="logo" src="assets/img/logo_letra_oscura.png" alt="logo De Castilla"/>
                <form className="form" method="POST" action="{{ route('login') }}">
                    @csrf
                    <h2 className="title">Iniciar Sesión</h2>
                    <div className="form__inputs">
                        <div className="divLogin">
                            <div className="inputConLogo">
                                <i className="form__icon"><img src="assets/icons/User.png" alt="Logo Usuario"/></i>
                            <input className="form__input" type="email" name="email"
                                placeholder="CorreoElectrónico@micorreo.com" id="email" required autofocus autocomplete="none"
                                data-tipo="email"/>
                                
                            </div>
                            <span className="input-message-error text-danger"></span>
                        </div>
                        <div className="divLogin">
                            <div className="inputConLogo">
                                <i className="form__icon"><img src="assets/icons/Key.png" alt="Logo Llave"/>                </i>
                                <input className="form__input " type="password" name="password"
                                    placeholder="Contraseña" id="password" required
                                    title="Al menos 6 caracteres, máximo 12, debe contener una letra mayúscula, un número y debe contener caracteres especiales."
                                    data-tipo="passwordLogin"/>
                            </div>
                                <span className="input-message-error text-danger"></span>
                        </div>
                        <input className="btn btn_largo" type="submit" value="Iniciar sesión"/>
                    </div>
                    <div className="form__options">
                        <p>¿Olvidaste tu Contraseña? <a href="{{ route('password.request') }}"> Haz click aquí</a></p>
                        <p>No tienes cuenta, <a href="./register">Registrate</a></p>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default loginPage;