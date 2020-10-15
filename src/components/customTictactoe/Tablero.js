import React, { Component } from 'react'
import Cuadrado from './Cuadrado'


class Tablero extends Component {

  columnas = ['', 'A', 'B', 'C']
  filas = ['1', '2', '3']
 

  renderCuadrado(i) {
    const array = this.props.recuadrosFocus;
   
    //let recuadroFocus = parseInt(this.props.recuadrosFocus);
    const isFocus = array.includes(i);
    return (<Cuadrado key={i} valorRecuadro={this.props.arrayRecuadros[i]} focus={isFocus} clickACuadrado={() => this.props.handleClick(i)} />)
  }

  renderFila(nroFila) {
    return (
      <div key={'Fila' + nroFila} className="filasOColumnas">{nroFila}</div>
    )
  }

  renderLinea(inicio, valorFila) {
    let i = 0;
    const array = [];
    array.push(this.renderFila(this.filas[valorFila]));
    while (i < 3) {
      array.push(this.renderCuadrado(inicio));
      i++;
      inicio++;
    }
    return <div className="board-row">{array}</div>;
  }

  render() {

    const renderColumnasHeader = this.columnas.map((valorColumna, index) => {
      return <div key={index} className="filasOColumnas">{valorColumna}</div>
    });


    const linea1 = this.renderLinea(0, 0);
    const linea2 = this.renderLinea(3, 1);
    const linea3 = this.renderLinea(6, 2);

    return (
      <div className="game-board">
        <div>
          <div className="board-row">
            {renderColumnasHeader}
          </div>

          {linea1}
          {linea2}
          {linea3}

        </div>
      </div>
    )
  }

}

export default Tablero;

