import './App.css';
import logo from './Images/react.png';
import Boton from './Components/Boton';
import Pantalla from './Components/Pantalla';
import BotonClear from './Components/BotonClear';

import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = useState('0'); //PANTALLA
  let [memory, setmemory] = useState(""); //MEMORIA

  /**
   * @param {*} valor CORRESPONDE A LOS CARACTERES DIGITADOS POR EL USUARIO
   * MÉTODO PARA AGREGAR VALORES A LA PANTALLA
   */

  const agregarInput = valor => {
    try {
      // SI EL VALOR EN PANTALLA ES 0 O 'CLEAR PLEASE', BORRAMOS TODO EL VALOR Y LO REEMPLAZAMOS POR LO DIGITADO POR EL USUARIO
      if (input === '0' || input === 'CLEAR PLEASE!') {
        setInput(valor);
      } else { // SINO, VAMOS CONCATENANDO LOS VALORES INGRESADOS POR EL USUARIO EN EL IMPUT:

        //SI DEL VALOR CONCATENADO, SU ÚLTIMO CARACTER ES UN OPERADOR, GUARDAMOS ÉSE VALOR EN memory CON TODO Y OPERADOR, Y LOS ELIMINAMOS DE LA PANTALLA
        if (input.slice(-1) === "+" || input.slice(-1) === "-" || input.slice(-1) === "*" || input.slice(-1) === "/") {
          setmemory(memory.concat(input)); //GUARDAMOS EL VALOR Y EL OPERADOR PARA HACER LA OPERACIÓN MÁS TARDE
          setInput(valor); //RESETEAMOS LA PANTALLA E INGRESAMOS EL SIGUIENTE VALOR DESPUÉS DEL OPERADOR
        } else {
          setInput(input.concat(valor)); //CONCATENAMOS LAS CIFRAS INGRESADAS POR EL USUARIO
        }
      }
    } catch (error) {
      // EN CASO DE QUE EL RESULTADO DE LA OPERACIÓN NO SE HAYA BORRADO, SE PEDIRÁ LIMPIAR PANTALLA PARA EVITAR ERROR.
      setInput('CLEAR PLEASE!');
      setmemory("");
    }
  };

  /**
   * MÉTODO PARA LIMPIEZA DE PANTALLA Y MEMORIA
   */
  const clearInput = () => {
    setInput("0")
    setmemory("");
  };

  /**
   * MÉTODO PARA CALCULAR RESULTADO
   */
  const calcularResultado = () => {
    /**
     * EN CASO DE QUE SE QUIERA CALCULAR EL RESULTADO, SIENDO QUE EL ULTIMO CARACTER DEL INPUT ES UN OPERADOR, SE ELIMINA DICHO OPERADOR
     * Y SE CALCULA EL RESULTADO:
     */
    try {
      if (input.slice(-1) === "+" || input.slice(-1) === "-" || input.slice(-1) === "*" || input.slice(-1) === "/") {
        setInput(evaluate(memory.concat(input.slice(0, input.length - 1))));
        setmemory(memory.concat(input.slice(0, input.length - 1)));
      } else { // SIMPLEMENTE SE CALCULA EL RESULTADO:
        setInput(evaluate(memory.concat(input))); //EL MÉTODO evaluate() RECIBE UNA CADENA DE CARACTERES QUE CORRESPONDE A UNA OP MATEMÁTICA, Y LA CALCULA
        setmemory(memory.concat(input));
      }
    } catch (error) {
      // EN CASO DE QUE EL RESULTADO DE LA OPERACIÓN NO SE HAYA BORRADO, SE PEDIRÁ LIMPIAR PANTALLA PARA EVITAR ERROR.
      setInput(input);
    }

  };

  return (
    <div className="App">
      <div className='logo-contenedor'>
        <img className='logo' src={logo} alt='Logo de aplicación' />
      </div>

      <div className='contenedor-calculadora'>
        <Pantalla input={input} miniInput={memory}/>

        <div className='fila'>
          <Boton handleClick={agregarInput}>7</Boton>
          <Boton handleClick={agregarInput}>8</Boton>
          <Boton handleClick={agregarInput}>9</Boton>
          <Boton handleClick={agregarInput}>-</Boton>
        </div>
        <div className='fila'>
          <Boton handleClick={agregarInput}>4</Boton>
          <Boton handleClick={agregarInput}>5</Boton>
          <Boton handleClick={agregarInput}>6</Boton>
          <Boton handleClick={agregarInput}>+</Boton>
        </div>
        <div className='fila'>
          <Boton handleClick={agregarInput}>1</Boton>
          <Boton handleClick={agregarInput}>2</Boton>
          <Boton handleClick={agregarInput}>3</Boton>
          <Boton handleClick={agregarInput}>*</Boton>
        </div>
        <div className='fila'>
          <Boton handleClick={agregarInput}>/</Boton>
          <Boton handleClick={agregarInput}>0</Boton>
          <Boton handleClick={agregarInput}>.</Boton>
          <Boton handleClick={calcularResultado}>=</Boton>
        </div>
        <div className='fila'>
          <BotonClear handleClick={clearInput}>Clear</BotonClear>
        </div>
      </div>
    </div>
  );
}

export default App;
