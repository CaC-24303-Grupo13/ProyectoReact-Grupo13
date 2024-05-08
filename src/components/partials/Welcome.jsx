import { Login } from "./Login"

export const Welcome = () => {

    const logedUser = false
 
  return (
    

    <div style={{border: 'solid 2px red', padding: '0 1rem 1rem 1rem'}}>
        <span style={{fontSize: '.8rem', color: 'red'}}>ROJO: Componente mensaje de Bienvenida Home</span>

        <h2>Bienvenido</h2>
        <p>En esta App podra encontrar las mejores peliculas</p>


        { logedUser
                      // Si "logedUser" existe mostramos esto  (diseñar alguna pantalla de bienvenida)
                    ?   <></>

                      // Si "logedUser" no existe (esta como null) mostramos esto

                    :   <Login></Login>                  

        }



    </div>
  )
}