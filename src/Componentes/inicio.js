import {useRef, useState } from "react"
import Formulario from "./formulario"
import '../css/inicio.css'
/*Componente Inicio que muestra el inicio del test */
function Inicio(){
    const div=useRef({})
    const [formularioIsReady,setFormularioIsReady]=useState(false)
    const handleClick=()=>{ //funcion handle que oculta la pantalla de inicio , y cambia el estado para que el componente Formulario aparezca
        div.current.style.display="none"
        setFormularioIsReady(true)
        }

    return(
        <>
        <div className="principal" ref={div}>
            <h1>Test Real Madrid</h1>
            <p>¡Descubre si eres un Madridista de Verdad!</p>
            <button className="buttonStart" onClick={handleClick}>Comenzar Test</button>
        </div>
         {formularioIsReady ? <Formulario></Formulario>:""}
         </>
    )
}
export default Inicio