
export const Register = () => {


  return (

        <div className="register__container">
            <form className="register__form">
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <br />
                    <input type="text" name="name" id="name" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <br />
                    <input type="text" name="apellido" id="apellido" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="correo">Correo:</label>
                    <br />
                    <input type="email" name="correo" id="correo" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="nacimiento">Cumpleaños:</label>
                    <br />
                    <input type="date" name="nacimiento" id="nacimiento" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="pais">Pais:</label>
                    <br />
                    <input type="text" name="pais" id="pais" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="contrasena">Contraseña:</label>
                    <br />
                    <input type="password" name="contrasena" id="contrasena" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="repitecontrasena">Repite Contraseña:</label>
                    <br />
                    <input type="password" name="repitecontrasena" id="repitecontrasena" className="register__input" required></input>
                </div>
                <div></div>
                <button type="submit" className="register__submit">Registrarme</button>
            </form>
        </div> 

  )
}