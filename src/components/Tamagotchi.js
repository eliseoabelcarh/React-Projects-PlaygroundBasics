import React, { Component } from 'react';
import '../index.css';
import Bounce from 'react-reveal/Bounce';

class Tamagotchi extends Component {

    estados = ['Feliz', 'Triste', 'Hambriento', 'Sediento'];
    respuestas = ['Feliz', 'Vomita', 'Me putea', 'Se caga', 'Muerde', 'Sos boludo?', 'Bip bip bip', 'Se mea'];
    acciones = ['Mimo', 'Comer', 'Tomar'];

    constructor(props) {
        super(props);
        this.state = {
            estadoActual: 'Click en Start para empezar!',
            respuesta: null,
        }
    }

    getRandomNum() {
        //cambiar 3 por 5
        return parseInt(Math.random() * (5 - 1) + 1);
    }
    cambiarEstadoRandom = () => {
        let nroRandom = this.getRandomNum();
        this.setState({
            ...this.state,
            estadoActual: this.estados[nroRandom - 1]
        })
        setTimeout(() => { this.cambiarEstadoRandom() }, 7000);
    }
    handleStart = () => {
        this.cambiarEstadoRandom();
    }
    handleMimo = () => {
        const indexEstadoActual = this.devuelveIndexEstado(this.state.estadoActual);
        this.emitirRespuesta(this.acciones[0], indexEstadoActual);
    }
    handleComer = () => {
        const indexEstadoActual = this.devuelveIndexEstado(this.state.estadoActual);
        this.emitirRespuesta(this.acciones[1], indexEstadoActual);
    }
    handleTomar = () => {
        const indexEstadoActual = this.devuelveIndexEstado(this.state.estadoActual);
        this.emitirRespuesta(this.acciones[2], indexEstadoActual);
    }


    devuelveIndexEstado(estadoActual) {
        return this.estados.indexOf(estadoActual);
    }
    emitirRespuesta(accion, indexEstadoActual) {
        const respuesta = this.handleRespuestas(accion, indexEstadoActual);
        if (respuesta) {
            this.setState({
                ...this.state,
                respuesta: respuesta
            });
        }
        setTimeout(() => {
            this.setState({
                ...this.state,
                respuesta: null
            });
        }, 3000)
    }
    handleRespuestas(accion, indexEstado) {

        if (accion && indexEstado === 0) {      //feliz
            return this.respuestas[5];
        }
        if (indexEstado === 1) { //triste
            switch (accion) {
                case 'Mimo':
                    return this.respuestas[0];
                case 'Comer':
                    return this.respuestas[1];
                case 'Tomar':
                    return this.respuestas[2];
                default:
                    return null
            }
        }
        if (indexEstado === 2) { //hambriento
            switch (accion) {
                case 'Mimo':
                    return this.respuestas[4];
                case 'Comer':
                    return this.respuestas[0];
                case 'Tomar':
                    return this.respuestas[3];
                default:
                    return null

            }
        }
        if (indexEstado === 3) { //sediento
            switch (accion) {
                case 'Mimo':
                    return this.respuestas[7];
                case 'Comer':
                    return this.respuestas[6];
                case 'Tomar':
                    return this.respuestas[0];
                default:
                    return null
            }
        }
    }

    render() {

        const respuestaDiv = this.state.respuesta ? (
            <Bounce left>
                <div id="respuestaDiv">{this.state.respuesta}</div>
            </Bounce>
        ) : (
                <div></div>
            )

        return (
            <div>
                <span>Estado Random( ) cada 7 seg.</span>
                <div id="estadoActualTamagotchi"> {this.state.estadoActual}</div>
                {respuestaDiv}
                <div id="btnstamagotchiContainer">
                    <button className="btn btn-secondary mr-4 first" onClick={this.handleStart}>Start</button>
                    <button className="btn btn-primary mr-4" onClick={this.handleMimo}>Mimo</button>
                    <button className="btn btn-primary  mr-4" onClick={this.handleComer}>Comer</button>
                    <button className="btn btn-primary last" onClick={this.handleTomar}>Tomar</button>
                </div>
            </div>
        )
    }
}

export default Tamagotchi;