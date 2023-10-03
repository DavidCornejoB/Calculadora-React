import React from "react";
import '../Stylesheets/Boton.css'

function Boton(props) {

    const esOperador = valor => {
        return isNaN(valor) && (valor !== '.') && (valor !== '=');
    }
    return (
        <div className={`boton-contenedor ${esOperador(props.children) ? 'operador' : ''}`.trimEnd()} onClick={() => props.handleClick(props.children)}>
            {props.children}
        </div>
    );
}

export default Boton;