import { Header } from "../partials/Header"
import { Register } from "../partials/Register"
import { Footer } from "../partials/Footer"

export const RegisterPage = () => {
  
  return (

      <div  className="registerPage__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'green'}}>VERDE: Vista Register Page</span>
        
          <Header></Header>
          
          <Register></Register>

          <Footer></Footer>

      </div>
  )
}