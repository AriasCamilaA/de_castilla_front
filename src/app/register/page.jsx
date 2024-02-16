import 'app/app/css/style.css';
import 'app/app/css/botones.css';
import 'app/app/css/login.css';


const registerPage = () => {
  return (
    <div class='fondoTraslucido'>
        <section class="container">
            <a class="logo" href="/landing">
                <img src="assets/img/logo_letra_oscura.png"/>
            </a>
            <form action="{{ route('register') }}" class="form register" method="POST">
                @csrf
                <h2 class="title">Registrar usuario</h2>
                <div>
                    <input class="form__input" type="text" placeholder="Nombre 1" autofocus required autocomplete="none" name="nombre_Usuario1" value="{{old('nombre_Usuario1')}}"/>
                    <input class="form__input" type="text" placeholder="Nombre 2" autocomplete="none" name="nombre_Usuario2" value="{{old('nombre_Usuario2')}}"/>
                </div>
                <div>
                    <input class="form__input" type="text" placeholder="Apellido 1" required autocomplete="none" name="apellido_Usuario1" value="{{old('apellido_Usuario1')}}"/>
                    <input class="form__input" type="text" placeholder="Apellido 2" autocomplete="none" name="apellido_Usuario2" value="{{old('apellido_Usuario2')}}"/>
                </div>
                <div>
                    <input class="form__input" type="number" placeholder="Número de documento" required autocomplete="none" name="noDocumento_Usuario" value="{{old('noDocumento_Usuario')}}"/>
                    <input class="form__input" type="number" placeholder="Número de celular" required autocomplete="none" name="celular_Usuario" value="{{old('celular_Usuario')}}"/>
                </div>
                <div>
                    <input class="form__input" type="email" placeholder="Correo electrónico" required autocomplete="none" name="email" value="{{old('email')}}"/>
                </div>
                <div>
                    <input class="form__input" type="password" placeholder="Contraseña" required autocomplete="none" name="password"/>
                    <input class="form__input" type="password" placeholder="Confirmar contraseña" required autocomplete="none" name="password_confirmation"/>
                </div>
                <div class="form__options">
                    <input class="btn btn_largo" type="submit" value="Registrate"/>
                    <p>Ya tienes cuenta, <a href="/login">Iniciar Sesión</a></p>
                </div>
            </form>
        </section>
    </div>
  );
}

export default registerPage;
