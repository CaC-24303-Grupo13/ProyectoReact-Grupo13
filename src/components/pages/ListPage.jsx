import { Header } from "../partials/Header"
import { PeliculasGrilla } from "../partials/PeliculasGrilla"
import { Footer } from "../partials/Footer"

export const ListPage = ({endpointRUTA}) => {
 
  return (

        // Esta es la vista principal que recibe al usuario al entrar al sitio, la que junta todos los componentes que arman una vista

      <div  className="homePage__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'green'}}>VERDE: Vista Tendencia Diaria Page</span>
        
        <Header></Header>
        

        <PeliculasGrilla endpointGRILLA={endpointRUTA}></PeliculasGrilla>

        <Footer></Footer>

      </div>
  )
}