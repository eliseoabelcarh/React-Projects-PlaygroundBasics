import React , {Component} from 'react';

class Carta extends Component{

    constructor(props){
        super(props);
        this.state = {
            nombre: 'valorInicial1',
            edad: 'valorInicial2'
        }
    }
    
    handleClick = () => {
        //desestructuro en mismos valores props que recibo de componente padre
        const {nombre, edad } = this.props;
        this.setState({
            ...this.state,
            nombre: nombre,
            edad: edad
        });
    }

    render(){

        


        return(
            <div className="card text-dark p-3 m-3">
                <div className="card-header">Usando props para cambiar state: </div>
                <button className="btn btn-primary m-2" onClick = {this.handleClick}>click actualizar valores con this.props</button>
                <div>this.state.nombre: {'  '}
                <strong>
                     {this.state.nombre}
                </strong>
                </div>
               
                <div>this.state.nombre: {'  '}
                <strong>
                    {this.state.edad}
                </strong>

                </div>
              
            </div>
        )
    }
}

export default Carta;
