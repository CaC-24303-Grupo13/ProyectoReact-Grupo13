import { Header } from "../partials/Header"
import { PeliculasGrilla } from "../partials/PeliculasGrilla"
import { Footer } from "../partials/Footer"

export const ListPage = ({endpointRUTA}) => {
 
  return (

      <div  className="listPage__container">
        
          <Header></Header>

          {/* Aqui recibimos el endpoin desde la Ruta y se lo pasamos a la Grilla */}
          <PeliculasGrilla endpointGRILLA={endpointRUTA}></PeliculasGrilla>

          <Footer></Footer>

      </div>
  )
}