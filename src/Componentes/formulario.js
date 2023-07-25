import { useRef, useState } from "react";
import {
  preguntasRealMadrid,
  respuestasCorrectas,
} from "../variables/variables";
import "../css/formulario.css";
/*Componente Formulario,que retorna un un formulario con input tipo checkbox */
function Formulario() {
  const preguntas = [];
  const [isChecked, setChecked] = useState([]); //estado que guarda el valor del input marcado
  const [numsChecked, setNumChecked] = useState(1); //estado que guarda el valor de la cantida de inputs marcados
  const inputs = useRef({}); //variable para manejar en el DOM los inputs
  const [contador, setContador] = useState(0); //estado para manejar el numero de pregunta
  const formRef = useRef({}); //variable para manejar en el DOM
  const divRigth = useRef({}); //variable para manejar en el DOM
  let [rigthAnswer, setRigthAnswers] = useState(0); //estado para contabilizar las preguntas correctas
  
  /*funcion handle que se llama al hacer click en la opciones del test, 
  comprueba si el valor del check esta en el estado,en caso de no estar lo agrega , en caso contrario lo elimina */
  const handleClick = (event) => {
    if (!isChecked.includes(event.target.value)) {
      setChecked([...isChecked, event.target.value]);
    } else if (
      isChecked.includes(event.target.value) &&
      event.target.checked === false
    ) {
      setChecked(isChecked.filter((value) => value !== event.target.value));
    }
  };

  /*funcion handle que comprueba las respuestas marcadas , y compara con las respuestas correcta
  devuelve valor numerico */
  const handleRevision = (answers) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === respuestasCorrectas[i]) {
        setRigthAnswers((rigthAnswer += 1));
      }
    }
    return rigthAnswer;
  };

  /*funcion handle que comprueba el numero de respuestas checkeadas, ese valor lo asigna a un estado
  cuando llegue a la pregunta 10,revisa las respuestas*/
  const handleIsValid = () => {
    const inputsChecked = Object.keys(inputs.current);
    let checked = 0;
    for (let i = 0; i < inputsChecked.length; i++) {
      let input = inputsChecked[i];
      if (inputs.current[input].checked === true) {
        checked++;
      }
    }
    if (checked === 1) {
      setNumChecked(1);
      contador < 8 ? setContador(contador + 1) : setContador(9);

      if (contador === 9) {
        formRef.current.style.display = "none";
        divRigth.current.style.display = "flex";
        divRigth.current.button.style.display = "none";
        handleRevision(isChecked);
        setContador(10);
      }
    } else {
      setNumChecked(2);
    }
  };

  /*iteracion por las preguntas, para crear varios elementos */
  preguntasRealMadrid.forEach((value) => {
    preguntas.push(
      <>
        <p key={value.pregunta} className="pregunta">
          {value.pregunta}
        </p>
        <label
          key={value.opciones[0]}
          onClick={(event) => //cambia de color
            event.target.style.backgroundColor === "rgb(189, 164, 223)"
              ? (event.target.style.backgroundColor = "rgb(140, 197, 214)")
              : (event.target.style.backgroundColor = "rgb(189, 164, 223)")
          }
          className="opciones"
        >
          {value.opciones[0]}
          <input
            ref={(input) => (inputs.current.inputA = input)}
            key={value.opciones[0]}
            type="checkbox"
            name="pregunta"
            value={value.opciones[0]}
            onChange={handleClick} //agrega el valor al estado
            checked={null}
          />
        </label>
        <label
          key={value.opciones[1]}
          onClick={(event) =>
            event.target.style.backgroundColor === "rgb(189, 164, 223)"
              ? (event.target.style.backgroundColor = "rgb(140, 197, 214)")
              : (event.target.style.backgroundColor = "rgb(189, 164, 223)")
          }
          className="opciones"
        >
          {value.opciones[1]}
          <input
            ref={(input) => (inputs.current.InputB = input)}
            key={value.opciones[1]}
            type="checkbox"
            name="pregunta"
            value={value.opciones[1]}
            onChange={handleClick}
            checked={null}
          />
        </label>
        <label
          key={value.opciones[2]}
          onClick={(event) =>
            event.target.style.backgroundColor === "rgb(189, 164, 223)"
              ? (event.target.style.backgroundColor = "rgb(140, 197, 214)")
              : (event.target.style.backgroundColor = "rgb(189, 164, 223)")
          }
          className="opciones"
        >
          {value.opciones[2]}
          <input
            ref={(input) => (inputs.current.InputC = input)}
            key={value.opciones[2]}
            type="checkbox"
            name="pregunta"
            value={value.opciones[2]}
            onChange={handleClick}
            checked={null}
          />
        </label>
        <label
          key={value.opciones[3]}
          onClick={(event) =>
            event.target.style.backgroundColor === "rgb(189, 164, 223)"
              ? (event.target.style.backgroundColor = "rgb(140, 197, 214)")
              : (event.target.style.backgroundColor = "rgb(189, 164, 223)")
          }
          className="opciones"
        >
          {value.opciones[3]}
          <input
            ref={(input) => (inputs.current.InputD = input)}
            key={value.opciones[3]}
            type="checkbox"
            name="pregunta"
            value={value.opciones[3]}
            onChange={handleClick}
            checked={null}
          />
        </label>
      </>
    );
  });

  return (
    <>
      <form ref={formRef} id="formularioRealMadrid">
        {preguntas[contador]}
      </form>
      {numsChecked !== 1 ? (
        <p style={{ color: "red" }}>Debes marcar solo una Opcion**</p>  //comprueba el numero de opciones marcadas, en caso verdadero muestra un aviso
      ) : (
        ""
      )}
      <button
        className="buttonForm"
        ref={(button) => (divRigth.current.button = button)}
        onClick={handleIsValid} //comprueba el numero de checks
      >
        {contador === 9 ? "Finalizar" : "Siguiente"}
      </button>
      <div ref={divRigth} className="rigthAnswer">
        <p>Respuestas Correctas {rigthAnswer}/10 </p>
        <button className="restart" onClick={() => window.location.reload()}>
          Empezar Test
        </button>
      </div>
      {contador >= 10 ? (
        ""
      ) : (
        <strong>
          {" "}
          <p style={{ fontSize: "20px" }}>{contador + 1}/10</p>
        </strong>
      )}
    </>
  );
}
export default Formulario;
