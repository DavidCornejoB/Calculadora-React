import React from "react";
import '../Stylesheets/BotonClear.css'

const BotonClear = (props) => (
    <div className="boton-clear" onClick={ props.handleClick }>
        {props.children}
    </div>
);

export default BotonClear;