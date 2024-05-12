import { Header } from "../partials/Header"
import { Buscador } from "../partials/Buscador"
import { PeliculasFavoritas } from "../partials/PeliculasFavoritas"
import { Footer } from "../partials/Footer"

export const ListPageFavoritas = ({endpointRUTA}) => {
 
  return (

      <div  className="listPage__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'green'}}>VERDE: Vista Tendencia Diaria Page</span>
        
          <Header></Header>
          
          <Buscador></Buscador>

          {/* Aqui recibimos el endpoin desde la Ruta y se lo pasamos a la Grilla */}
          <PeliculasFavoritas></PeliculasFavoritas>

          <Footer></Footer>

      </div>
  )
}