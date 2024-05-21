import { Header } from "../partials/Header"
import { Welcome } from "../partials/Welcome"
import { Footer } from "../partials/Footer"


export const HomePage = () => {
  
  return (

    <div  className="homePage__container">

          <Header></Header>
          
          <Welcome></Welcome>

          <Footer></Footer>

    </div>
  )
}