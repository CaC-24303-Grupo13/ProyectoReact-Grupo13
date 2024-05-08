import { Header } from "../partials/Header"
import { Register } from "../partials/Register"
import { Footer } from "../partials/Footer"

export const RegisterPage = () => {
  
  return (

        // Esta es la vista principal que recibe al usuario al entrar al sitio, la que junta todos los componentes que arman una vista

      <div  className="registerPage__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'rgb(128, 0, 122)'}}>VIOLETA: Vista Register Page</span>
        
        <Header></Header>
        
        <Register></Register>

        <Footer></Footer>

      </div>
  )
}