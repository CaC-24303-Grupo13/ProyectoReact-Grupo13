import { Header } from "../partials/Header"
import PeliculasDetalle from "../partials/PeliculasDetalle"
import { Footer } from "../partials/Footer"
 
export const DetailsPage = () => {
  
  return (

      <div  className="detailsPage__container">


          <Header></Header>
          
          <PeliculasDetalle></PeliculasDetalle>

          <Footer></Footer>

      </div>
  )
}