import { Header } from "../partials/Header"
import { Welcome } from "../partials/Welcome"
import { Footer } from "../partials/Footer"

export const HomePage = () => {
  
  return (

        // Esta es la vista principal que recibe al usuario al entrar al sitio, la que junta todos los componentes que arman una vista

      <div  className="homePage__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'green'}}>VERDE: Vista Home Page</span>
        
        <Header></Header>
        
        <Welcome></Welcome>

        <Footer></Footer>

      </div>
  )
}