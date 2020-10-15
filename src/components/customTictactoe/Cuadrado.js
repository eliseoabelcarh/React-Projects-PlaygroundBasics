import React from 'react'

const Cuadrado = (props) => {

    const { valorRecuadro, clickACuadrado, focus  } = props;
    

    return (
        <button className={!focus? ("square"):("square text-success")}  onClick={clickACuadrado} >
            {valorRecuadro}
        </button>
    )


}

export default Cuadrado;

