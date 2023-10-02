import React from "react";
import '../Stylesheets/Boton.css'

function Boton(props) {

    const esOperador = valor => {
        return isNaN(valor) && (valor !== '.') && (valor !== '=');
    }
    return (
        <div className={`boton-contenedor ${esOperador(props.children) ? 'operador' : ''}`.trimEnd()}>
            <button>{props.children}</button>
        </div>
    );
}

export default Boton;