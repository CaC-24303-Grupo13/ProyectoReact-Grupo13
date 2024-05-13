import { Header } from "../partials/Header"
import { Buscador } from "../partials/Buscador"
import { PeliculasGrilla } from "../partials/PeliculasGrilla"
import { Footer } from "../partials/Footer"

export const ListPage = ({endpointRUTA}) => {
 
  return (

      <div  className="listPage__container">


          <Header></Header>
          
          <Buscador></Buscador>

          {/* Aqui recibimos el endpoin desde la Ruta y se lo pasamos a la Grilla */}
          <PeliculasGrilla endpointGRILLA={endpointRUTA}></PeliculasGrilla>

          <Footer></Footer>

      </div>
  )
}