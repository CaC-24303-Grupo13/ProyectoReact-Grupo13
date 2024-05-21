import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Paginador = ({dataActualPage, dataTotalPages, cambiarPagina}) => {

const [paginaActual, setpaginaActual] = useState(dataActualPage)

// Numeracion de botones centrales
let buttonNumers = []           // dependiendo en que pagina nos encontrasmos (paginaActual) generamos un array con valores para cada uno de los botones 
    if (paginaActual <= 3) {
        buttonNumers = [ 1, 2, 3, 4, 5 ]
    } else if (paginaActual >= 4 && paginaActual < dataTotalPages -2) {
        buttonNumers = [ (paginaActual-2), (paginaActual-1), (paginaActual), (paginaActual+1), (paginaActual+2) ]
    } else {
        buttonNumers = [ (dataTotalPages-4), (dataTotalPages-3), (dataTotalPages-2), (dataTotalPages-1), (dataTotalPages) ]
    }    


// Manejador de clicks en los botones de primera anterior numeros siguiente y ultima pagina, al ser presionado captura su valor (numero de pagina a ir)
// y si dicho valor es superior al cero y menor o igual al total de paginas establece la pagina actual (a ir) en dicho valor
const handlerNavigationClicks = (buttonValue) => {
    if (buttonValue > 0 && buttonValue <= dataTotalPages) {
        setpaginaActual(parseInt(buttonValue))
    }    
}

// manejador del boton "ir a" con el input numerico. como es un form prevenimos la recarga de la pagina y luego si el valor ingresado en el input es
// mayor a cero y menor o igual al total de paginas establecemos la pagina actual (a ir) en dicho valor
const handlerGoToClick = (event) => {
    event.preventDefault()
    let inputValue = parseInt(event.target.GoToInputValue.value)
    if (inputValue > 0 && inputValue <= dataTotalPages) {
        setpaginaActual(parseInt(inputValue))
    }    
}

// Cuando el valor de paginaActual cambia por accion de alguna de las dos fx de arriba (handlerNavigationClicks o handlerGoToClick) llamamos a la
// fx "cambiarPagina" que se encuentra en el componente padre del paginador dandole el nuevo valor de paginaActual establecido por alguna de las fx anteriores
 useEffect(() => {
    cambiarPagina(paginaActual);
 }, [paginaActual])


  return (

    <>

        <div className="paginador__container">

            <span className="paginador__pagesInfo">Pagina {paginaActual} de {dataTotalPages}</span>
            
            <button className="paginador__navButtonIcon" 
                    value={1}
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} 
                    title="Primer Pagina">
                    {<iconify-icon icon="fluent:arrow-previous-12-filled"></iconify-icon>}
                </button>
            <button className="paginador__navButtonIcon" 
                    value={paginaActual - 1}
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} 
                    title="Pagina Anterior">
                    {<iconify-icon icon="fluent:chevron-left-12-filled"></iconify-icon>}
                </button>
            <button className="paginador__navButtonNumber" 
                    value={buttonNumers[0]}
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} >
                    {buttonNumers[0]}
                </button>
            <button className="paginador__navButtonNumber" 
                    value={buttonNumers[1]} 
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} >
                    {buttonNumers[1]}
                </button>
            <button className="paginador__navButtonNumber" 
                    value={buttonNumers[2]} 
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} >
                    {buttonNumers[2]}
                </button>
            <button className="paginador__navButtonNumber" 
                    value={buttonNumers[3]} 
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} >
                    {buttonNumers[3]}
                </button>
            <button className="paginador__navButtonNumber" 
                    value={buttonNumers[4]} 
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} >
                    {buttonNumers[4]}
                </button>
            <button className="paginador__navButtonIcon" 
                    value={paginaActual + 1} 
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} 
                    title="Pagina Siguiente">
                    {<iconify-icon icon="fluent:chevron-right-12-filled"></iconify-icon>}
                </button>
            <button className="paginador__navButtonIcon" 
                    value={dataTotalPages} 
                    onClick={(event) => handlerNavigationClicks(event.currentTarget.value)} 
                    title="Ultima Pagina">
                    {<iconify-icon icon="fluent:arrow-next-12-filled"></iconify-icon>}
                </button>



            <form action="" onSubmit={(event) => handlerGoToClick(event)}>   
            <span className="paginador__pagesGoTo">Ir a Pagina:</span> 
                <input  type="number" 
                        className="paginador__goToInput" 
                        name="GoToInputValue"

                        />
                <button className="paginador__navButtonGoTo" 
                        title="Ultima Pagina">
                        {`Ir`}
                    </button>
            </form>

        </div>

    </>
  )
}