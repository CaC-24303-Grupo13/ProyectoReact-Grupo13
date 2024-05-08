import { Header } from "../partials/Header"
import PeliculasDetalle from "../partials/PeliculasDetalle"
import { Footer } from "../partials/Footer"

export const DetailsPage = () => {
  
  return (

      <div  className="detailsPage__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'green'}}>VERDE: Vista Detalles de 1 Pelicula</span>
        
          <Header></Header>
          
          <PeliculasDetalle></PeliculasDetalle>

          <Footer></Footer>

      </div>
  )
}