import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const Buscador = () => {

  // Guardamos Navigate en una constante para poder usarlo
  const navigate = useNavigate();

  // INTENTO 1
  //Capturamos de la URL si existe un criterio de busqueda, luego con un ternario en caso afirmativo lo almacenamos en searchValue y caso negativo le asignamos un null a searchValue
  // const {criteriobusqueda} = useParams()
  // let searchInpunt = ""
  // criteriobusqueda  ?searchInpunt = criteriobusqueda
  //                   :searchInpunt = null
  // console.log(searchInpunt);


  // INTENTO 2
  // const {criteriobusqueda} = useParams()
  // const [searchInpunt, setSearchInput] = useState(criteriobusqueda)
  // console.log(criteriobusqueda);
  // const onInputSearchChange = (event) => {
  //   const valor = event.target.searchInput.value
  //   setSearchInput({
  //       ...searchInpunt,
  //       valor
  //   });
  // };

  const { criteriobusqueda } = useParams();   // Obtenemos desde la URL si existe un criterio de busqueda
  const [searchInput, setSearchInput] = useState(criteriobusqueda || '');   // El criterio lo guardamos en "searchInput" para que si existe se vea en el input, y sino guardamos un null


  useEffect(() => {                           // cuando cambiar la URL (criteriobusqueda), se dispara nuevamente el useEffect para "limpiar" o mantener el inputSearch
    setSearchInput(criteriobusqueda || ''); 
  }, [criteriobusqueda]);                       


  const onInputSearchChange = (event) => {    // como el input tiene un value necesitamos decirle que hacer cuando cambia algo en el input, por ello
    setSearchInput(event.target.value);       // establecemos como value del searchInput el valor que estamos mandando en el evento en el mismo searchInput
  };                                          // Sino seria como que escribimos y vuelve al mismo esta anterior el input (no podriamos escribir)

  
  const onSubmitSearchForm = (event) => {                     // Al ser instanciada esta funcion recibe como parametro la informacion del evento
    event.preventDefault()                                    // preventDefault para prevenir la recarga de la pagina
    navigate(`/buscar/${event.target.searchInput.value}`);    // hacemos que la pagina "navegue" hacia la ruta de busqueda
  }


  return (
    
    
    <div className="buscador__container">

        {/* SPAN que aparecera condicionalmente cuando el usuario este LOGEADO, sino no se ve */}
        {/* <span style={{fontSize: '.8rem', color: 'coral'}}>Magenta: Componente Buscador</span> */}

        {/* Al presionar submit se invoca la funcion "onSubmitSearchForm" dandole como argumento el evento capturado (ir a Linea 44) */}
        <form className="buscador__form" onSubmit={(event) => onSubmitSearchForm(event)}>
            
            <input type="text" name="searchInput" onChange={(event) => onInputSearchChange(event)} value={searchInput} />
            <button type="submit">Buscar</button>
            
        </form>

    </div>
  )
}