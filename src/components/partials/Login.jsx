import { Link } from "react-router-dom/dist";

export const Login = () => {


   return (


    <div className="login__container">
        <form className="login__form">
            <div>
                <label htmlFor="user">Usuario:</label>
                <br/>
                <input type="email" name="user" id="user" className="login__form-inputfield"></input>
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <br/>
                <input type="password" name="password" id="password" className="login__form-inputfield"></input>
            </div>

            <button type="submit">Ingresar</button>
            
            <div className="login__register-link">
                <span>¿No eres usuario? </span><Link to="/registrate">¡Haz click y Registrate!</Link>
            </div>
        </form>
    </div>


  )
}