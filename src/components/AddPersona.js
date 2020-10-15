import React, {Component} from 'react';

class AddPersona extends Component{

    initialState = {
        nombre:'',
        edad : '',
        id: null
    }
    constructor(props){
        super(props);
        this.state = this.initialState;
    }

    handleChange = (e) =>{
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }
    handleSubmit =(e) =>{
        e.preventDefault();
        this.props.agregarALista(this.state);
        this.resetForm();
    }
    resetForm(){
        this.setState(this.initialState);

    }

    render(){
        return(
            <div className="card text-dark p-3 m-3">
             <div className="card-header">Actualizando lista desde otro componente: </div>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group pr-3">
                    <input className="form-control m-3" type="text" id = "nombre" placeholder="Nombre" onChange={this.handleChange} value={this.state.nombre}/>
                    <input className="form-control m-3" type="number" id = "edad" placeholder="Edad" onChange={this.handleChange} value={this.state.edad}/>
                    <button className="btn btn-secondary" >Agregar a Lista</button>
                </div>
                </form>
            </div>
           
        )
    }
}

export default AddPersona;

