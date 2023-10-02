import React from "react";
import '../Stylesheets/Pantalla.css';

const Pantalla = ({ input, miniInput }) => (
    <div className="input">
        <div className="mini-input">
            {miniInput}
        </div>
        {input}
    </div>
);

export default Pantalla;