import React from 'react';

class Movimientos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      on: true
    }
  }

  render() {

    const { historialDeMovimientos, irAMovimientoNro, arrayDeMovimientos } = this.props;

    const movimientos = historialDeMovimientos.map((arrayRecuadroObjeto, nroMovimiento) => {

      if (nroMovimiento !== 0) {
        return (
          <li key={nroMovimiento} className="text-center">
            <button className='btn btn-info m-1' onClick={() => irAMovimientoNro(nroMovimiento)}  >
              Ir a Movimiento: {nroMovimiento}
            </button>
            {'Posición: ' + arrayDeMovimientos[nroMovimiento].fila + arrayDeMovimientos[nroMovimiento].columna}
          </li>
        )

      } else { return null }
    });

    const switchMovimientos = () => {
      const btn = document.getElementById("customSwitches");
      if(!btn.checked){
        this.setState({
          on: true
        })
      } else {
        this.setState({
          on: false
        })
      }
    }

    const listaMovimientos = this.state.on ? (movimientos) : (movimientos.reverse());


    return (

      <div>
        <div class="custom-control custom-switch">
          <input onChange={switchMovimientos} type="checkbox" class="custom-control-input" id="customSwitches" />
          <label class="custom-control-label" for="customSwitches">Switch Movimientos</label>
        </div>
        <ul className="notDot pl-0">
          {listaMovimientos}
        </ul>
      </div>

    )
  }
}

export default Movimientos;