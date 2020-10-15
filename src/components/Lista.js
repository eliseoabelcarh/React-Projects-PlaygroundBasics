import React, {Component} from 'react';


//se debe instalar la dependencia
import Fade from 'react-reveal/Fade';

class Lista extends Component{
    
    

    render(){
       
        const esprimerElemento = (primer_elemento,elemento) => {
            return primer_elemento === elemento ? (true) : (false);
        }
        const estilo = (condicion) => {
            return condicion ?
             ("card text-dark p-3 m-3 border-primary") : ("card text-dark p-3 m-3");
        }
        const fade = (div, condicion) => {
            return condicion ?
            ( <Fade top >{div}</Fade>) : (div)
        }
        const devolverSegunCondicion  = (condicion, elemTrue, elemFalse) => {
            return condicion? elemTrue: elemFalse;
        }

        const LIMITE_EDAD = 18;
        const {array, eliminarDeLista} = this.props;
        
        

        const listar = array.reverse().map(
            (persona) => {

            const esElPrimero = esprimerElemento(array[0], persona);

               return (
                    (
                            fade(
                            (<div className={estilo(esElPrimero)}  key={persona.id}>

                                {devolverSegunCondicion(
                                    persona.edad > LIMITE_EDAD ,
                                    
                                (<div>{persona.nombre} {': '}{persona.edad} años
                                    <button className="close" onClick={()=> eliminarDeLista(persona)}>
                                    <span>&times;</span>
                                    </button>
                                </div>),

                                (<div>{persona.nombre} <strong>es menor de {LIMITE_EDAD} años</strong>
                                    <button className="close" onClick={()=> eliminarDeLista(persona)}>
                                        <span>&times;</span>
                                    </button></div>)
                                )}
                            
                            </div>) , 
                            
                            esElPrimero
                            
                            )
                    )
                )
            }
        );



        return(
           
                <div className="card text-dark p-3 m-3" style={{width: 18 + 'em'}}>
                    <div className="card-header">Listando Array desde props</div>
                    <div className="card-body ">
                    {array.length > 0? (listar): ('no hay elementos, agrega alguno')}
                      
                    </div>      
                </div>

        )
    }
}

export default Lista;