import { useState, useEffect } from "react"

export const Paginador = ({dataActualPage, dataTotalPages, cambiarPagina}) => {

const [paginaActual, setpaginaActual] = useState(dataActualPage)

// Numeracion de botones centrales
let buttonNumers = []
    if (paginaActual <= 3) {
        buttonNumers = [ 1, 2, 3, 4, 5 ]
    } else if (paginaActual >= 4 && paginaActual < dataTotalPages -2) {
        buttonNumers = [ (paginaActual-2), (paginaActual-1), (paginaActual), (paginaActual+1), (paginaActual+2) ]
    } else {
        buttonNumers = [ (dataTotalPages-4), (dataTotalPages-3), (dataTotalPages-2), (dataTotalPages-1), (dataTotalPages) ]
    }    



const handlerNavigationClicks = (buttonValue) => {
    if (buttonValue > 0 && buttonValue <= dataTotalPages) {
        setpaginaActual(parseInt(buttonValue))
    }    
}

const handlerGoToClick = (event) => {
    event.preventDefault()
    let inputValue = parseInt(event.target.GoToInputValue.value)
    if (inputValue > 0 && inputValue <= dataTotalPages) {
        setpaginaActual(parseInt(inputValue))
    }    
}


 useEffect(() => {
    cambiarPagina(paginaActual);
 }, [paginaActual])


  return (
    <div style={{border: 'solid 2px magenta', padding: '0 1rem 1rem 1rem', marginTop: '1rem'}}>
        <span style={{fontSize: '.8rem', color: 'magenta'}}>Magenta: Componente Paginador</span>

        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>

            <span style={{border: 'solid 1px magenta', height: '3rem', fontSize: '1.5rem', padding: '.5rem 1rem 0 1rem'}}>Pagina {paginaActual} de {dataTotalPages}</span>
            
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={1}
                    onClick={(event) => handlerNavigationClicks(event.target.value)} 
                    title="Primer Pagina">
                    {`|<`}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={paginaActual - 1}
                    onClick={(event) => handlerNavigationClicks(event.target.value)} 
                    title="Pagina Anterior">
                    {`<`}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={buttonNumers[0]}
                    onClick={(event) => handlerNavigationClicks(event.target.value)} >
                    {buttonNumers[0]}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={buttonNumers[1]} 
                    onClick={(event) => handlerNavigationClicks(event.target.value)} >
                    {buttonNumers[1]}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={buttonNumers[2]} 
                    onClick={(event) => handlerNavigationClicks(event.target.value)} >
                    {buttonNumers[2]}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={buttonNumers[3]} 
                    onClick={(event) => handlerNavigationClicks(event.target.value)} >
                    {buttonNumers[3]}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={buttonNumers[4]} 
                    onClick={(event) => handlerNavigationClicks(event.target.value)} >
                    {buttonNumers[4]}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={paginaActual + 1} 
                    onClick={(event) => handlerNavigationClicks(event.target.value)} 
                    title="Pagina Siguiente">
                    {`>`}
                </button>
            <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                    value={dataTotalPages} 
                    onClick={(event) => handlerNavigationClicks(event.target.value)} 
                    title="Ultima Pagina">
                    {`>|`}
                </button>


            <p>Ir a Pagina:</p>
            <form action="" onSubmit={(event) => handlerGoToClick(event)}>    
                <input  type="number" 
                        style={{border: 'solid 1px magenta', height: '3rem', width: '6rem', fontSize: '1.5rem', padding: '0 .9rem'}} 
                        name="GoToInputValue"

                        />
                <button style={{border: 'solid 1px magenta', height: '3rem', width: '3rem', fontSize: '1.5rem'}} 
                        //onClick={}
                        title="Ultima Pagina">
                        {`Ir`}
                    </button>
            </form>

        </div>

    </div>
  )
}