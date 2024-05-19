import { Header } from "../partials/Header"
import { Buscador } from "../partials/Buscador"
import { PeliculasFavoritas } from "../partials/PeliculasFavoritas"
import { Footer } from "../partials/Footer"

export const ListPageFavoritas = ({endpointRUTA}) => {
 
  return (

      <div  className="listPageFavoritas__container">
        
          <Header></Header>
          
          <Buscador></Buscador>

          {/* Aqui recibimos el endpoin desde la Ruta y se lo pasamos a la Grilla */}
          <PeliculasFavoritas></PeliculasFavoritas>

          <Footer></Footer>

      </div>
  )
}