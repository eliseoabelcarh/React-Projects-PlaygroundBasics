import React, { Component } from 'react'
import Tablero from './Tablero'
import Movimientos from './Movimientos'
import './customtictactoe.css'


class Juego extends Component {

  initialState = {
    xEsSgte: true,
    ganador: null,
    historial: [{ arrayRecuadros: Array(9).fill(null) }],
    nroMovimiento: 0,
    movimientos: [{ columna: null, fila: null }],
    recuadrosFocus: [],
    recuadrosGanadores:[]
  }

  constructor(props) {
    super(props);
    this.state = this.initialState
  }


  handleClick = (i) => {
    const stateActualObj = this.state.historial[this.state.nroMovimiento];
    const arrayRecuadrosActual = stateActualObj.arrayRecuadros;
    const ganadorActual = this.state.ganador;

    //si el recuadro ya está lleno y existe ganador no permito continuar
    if (arrayRecuadrosActual[i] !== null || ganadorActual !== null) {
      return
    }

    const arrayNuevo = arrayRecuadrosActual.slice();
    arrayNuevo[i] = this.devolverTurnoSiguiente();
    const nuevoObjetoDeHistorial = { arrayRecuadros: arrayNuevo };

    const historialNuevo = this.state.historial.slice(0, this.state.nroMovimiento + 1)
    historialNuevo.push(nuevoObjetoDeHistorial);

    const {ganador,recuadrosGanadores}  = calculateWinner(arrayNuevo);


    
    const arrayMovimientosNuevo = this.ubicacionDeMovimiento(i, this.state.nroMovimiento);



    this.setState({
      ...this.state,
      xEsSgte: this.state.xEsSgte ? false : true,
      ganador: ganador ? ganador : null,
      historial: historialNuevo,
      nroMovimiento: this.state.nroMovimiento + 1,
      movimientos: arrayMovimientosNuevo,
      recuadrosGanadores: recuadrosGanadores,
      recuadrosFocus: ganador? (recuadrosGanadores) : ([arrayMovimientosNuevo[this.state.nroMovimiento+1].indexArrayRecuadros])
    })

  }

  irAMovimientoNro = (nroMovimientoDeseado) => {
    this.setState({
      ...this.state,
      nroMovimiento: nroMovimientoDeseado,
      xEsSgte: nroMovimientoDeseado % 2 === 0 ? true : false,
      recuadrosFocus: this.state.ganador? (this.state.recuadrosGanadores) :[this.state.movimientos[nroMovimientoDeseado].indexArrayRecuadros],
    });

  }

  ubicacionDeMovimiento = (i, nroMovimiento) => {
    //i es la posición index del array clickeado (de 0 a 8)
    const fila = i >= 6 ? (3) : (
      i <= 2 ? (1) : (2)
    )
    const columna = i % 3 === 0 ? ('A') : (i === 1 || i === 4 || i === 7 ? ('B') : ('C'))
    const arrayMovimientosNuevo = this.state.movimientos.slice(0, nroMovimiento + 1)
    arrayMovimientosNuevo.push({ fila: fila, columna: columna, indexArrayRecuadros: i });
    return arrayMovimientosNuevo;
  }

  devolverTurnoSiguiente() {
    return this.state.xEsSgte ? ('X') : ('O')
  }
  reiniciarJuego = () => {
    this.setState(this.initialState)
  }


  render() {

    const turnoSgte = this.devolverTurnoSiguiente();
   
    const historial = this.state.historial;
    const stateActualObj = historial[this.state.nroMovimiento];
    const arrayRecuadrosActual = stateActualObj.arrayRecuadros;
    const estado = this.state.ganador ? ('El Ganador es: ' + this.state.ganador + '!!') : 
    (
      arrayRecuadrosActual.every((recuadro) => recuadro !== null) ? ('Hubo Empate!'):('Próximo turno: ' + turnoSgte)
      );
    const reiniciarJuego = this.state.ganador || arrayRecuadrosActual.every((recuadro) => recuadro !== null) ?
      (<button className='btn btn-secondary' onClick={this.reiniciarJuego}>
        Volver a Jugar!
      </button>)
      :
      ('')

    return (
      <div className="game">

        <Tablero arrayRecuadros={arrayRecuadrosActual} recuadrosFocus={this.state.recuadrosFocus} handleClick={this.handleClick} />

        <div className="game-info">
          <div className={this.state.ganador ? ("h4 text-success") : ("h4")}>{estado} </div>

          <Movimientos historialDeMovimientos={this.state.historial} irAMovimientoNro={this.irAMovimientoNro} arrayDeMovimientos={this.state.movimientos} />

          <div>{reiniciarJuego}</div>
        </div>
      </div>
    )
  }
}

export default Juego;


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //Modificado
      return {ganador: squares[a] , recuadrosGanadores: [a,b,c]};
    }
  }
  return {ganador: null};
}