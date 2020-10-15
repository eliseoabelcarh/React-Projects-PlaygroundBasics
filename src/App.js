import React, { Component } from 'react';
import './App.css';

//components
import Carta from './components/Carta'
import Lista from './components/Lista'
import AddPersona from './components/AddPersona';
import Tareas from './components/Tareas'
import Game from './components/Tictactoe'
import Juego from './components/customTictactoe/Juego'
import Tamagotchi from './components/Tamagotchi';

class App extends Component {

  state = {
    personas: [
      { nombre: 'Jose', edad: 18, id: 1 },
      { nombre: 'Juan', edad: 50, id: 2 },
      { nombre: 'Santiago', edad: 35, id: 3 }
    ]
  }


  agregarALista = (persona) => {
    persona.id = Math.random() * 10;
    let lista = [...this.state.personas, persona]
    this.setState({
      ...this.state,
      personas: lista
    });
  }

  eliminarDeLista = (persona) => {
    const listaActualizada = this.state.personas.filter(p => p !== persona);
    this.setState({
      ...this.state,
      personas: listaActualizada
    });
  }

  render() {
    return (
      <div className="App ">
        <div className="card-deck">

          <Carta nombre='Juan' edad='25' />
          <Lista array={this.state.personas} eliminarDeLista={this.eliminarDeLista} />
          <AddPersona agregarALista={this.agregarALista} />
          <Tareas />

          <div className="card text-dark p-3 m-3" >
            <div className="card-header">Tictactoe: Tutorial oficial de React</div>
            <div className="card-body ">
              <Game />
            </div>
          </div>

          <div className="card text-dark p-3 m-3" >
            <div className="card-header">Tictactoe personalizado</div>
            <div className="card-body ">
              <Juego />
            </div>
          </div>

          <div className="card text-dark p-3 m-3" >
            <div className="card-header">Tamagotchi</div>
            <div className="card-body ">
              <Tamagotchi />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
