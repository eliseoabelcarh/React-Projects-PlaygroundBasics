import React, {Component} from 'react'
//se debe instalar la dependencia
import Fade from 'react-reveal/Fade';

class Tareas extends Component{

    initialState = {
        error:'',
        tareaNueva:{id: 0, detalle: ''},
        tareas:[
            {id: 1, detalle: 'comprar leche'},
            {id: 2, detalle: 'ir a lavandería'}
        ]
    }
    constructor(props){
        super(props);
        this.state = this.initialState;
    }
    
    remover = (e) => {
        //ojo que se obtiene un string desde el atributo midato
        const idAEliminar= parseInt(e.currentTarget.getAttribute('midato'));
        const listaNueva= this.state.tareas.filter(t => t.id !== idAEliminar );
        this.setState(
            {...this.state,
            tareas: listaNueva
            }
        );
    }
    render(){
    const {tareas} = this.state;
    const mostrarTareas = tareas.map((tarea)=> {
        return (
            <div className="card text-dark p-3 m-3" key={tarea.id}>
                <div key={tarea.id} > {tarea.detalle}
                    <button  key={tarea.id} type="button" midato= {tarea.id} className="close" aria-label="Close" onClick={this.remover}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        )
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let detalle = this.state.tareaNueva.detalle;
        if(detalle === ''){
            mostrarError()
            return
        }else{
            const nuevaLista = [...this.state.tareas, this.state.tareaNueva];
            this.setState({
                ...this.state,
                tareas: nuevaLista,
                tareaNueva:{id:0,detalle:''}
            });
        }
        
    }
   const mostrarError = () => {
       this.setState({
           ...this.state,
           error:'no puede estar vacío'
       });
        setTimeout(()=>{
            this.setState({
                ...this.state,
                error:''
            })
        } , 2000)
        

   }
    const handleChange = (e) => {
        let tarea = {id: this.state.tareas.length+1, detalle: e.target.value}
        this.setState({ 
            ...this.state,
            [e.target.name]: tarea })
    }

        return(
            <div className="card text-dark p-3 m-3" >
              <div className="card-header">Tareas: independiente de otros componentes</div>
                    <div className="card-body ">
                    {this.state.tareas.length>0? mostrarTareas : 'No hay tareas'}
                   
                   <form onSubmit={handleSubmit}>
                        <div className="form-group pr-3">
                            <input className="form-control m-3" name="tareaNueva" type="text" placeholder=" Nueva Tarea" onChange={handleChange} value={this.state.tareaNueva.detalle}  />
                            <button className="btn btn-primary" >Agregar Tarea</button>
                            {this.state.error!==''?(
                                <Fade right><div id='error' className="text-danger">{this.state.error}</div></Fade>
                                ):
                                (
                                    <div></div>
                                )}
                            
                        </div>
                    </form>
                    </div> 
                    
            </div>
        )
    }
} 

export default Tareas;
