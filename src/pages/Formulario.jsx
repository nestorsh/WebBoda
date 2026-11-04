import Cabecera from "./Cabecera";
import Footer from "./Footer";
import "../styles/Form.css"
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../utils/supabase'
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
 


export default function Formulario(){
    //const codigoGrupo='fe14fca4-d096-4113-965b-c4f950dcc8b5';
    const codigoGrupo=useParams().grupo;

    const [invitados, setInvitados] = useState([]);
    const [invitado, setInvitado]=useState([]);
    const [error, setError]=useState(null);
    const [guardando, setGuardando] = useState(false);
    const [guardandoInvitado, setGuardandoInvitado] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [invitadoSeleccionado, setInvitadoSeleccionado]=useState(0);
    const [mensajeExitoso, setMensajeExitoso]=useState("");
    const [asistencia, setAsistencia]=useState(true);
    const [permiso, setPermiso]=useState(false);
    const [grupo, setGrupo]=useState("");
    const inputRef=useRef(null);
    var valorBusqueda=0;

    
    useEffect (() => {
        async function obtenerInvitados () {
            const {data, error} = await supabase.schema('public').rpc("ver_invitados", {grupo:codigoGrupo});
            setGrupo(data[0].denominacion);
            console.log('Datos recibidos:', data);


            if(error){
                setError(error.message);
                console.error('Error de Supabase:', error);
                return;
            }

            setInvitados(data);
        }

        obtenerInvitados();


    }, [guardando,guardandoInvitado]);

    function manejadorSelector(e){
        setInvitadoSeleccionado(e.target.value);
        valorBusqueda=e.target.value;
        var nInvitado=invitados.find(buscarInvitado);
        if (nInvitado === undefined) {
            nInvitado={
                nombre:"",
                asistencia:null,
                menu:null,
                dieta:null, 
                denominacion: grupo
            }   
        }
        setInvitado(nInvitado);
        setAsistencia(nInvitado.asistencia);
        setPermiso(nInvitado.permiso);
        setGrupo(nInvitado.denominacion);
        setMensaje("");
        setMensajeExitoso("");
    }

    function buscarInvitado(value, index, array){
        if(value.id===valorBusqueda){
            return value;
        }
        return null;
    }

    async function insertarInvitado(e){
        const nombreNuevo=inputRef.current.value;
        setGuardandoInvitado(true);
        try{
            if(invitado.permiso){
                const {error} =await supabase.schema("public").rpc("inserta", {
                    nombre_n: nombreNuevo,
                    grupo: String(invitado.idgrupo),
                    permiso:false,
                    id_i:String(invitado.id)
                });
                setPermiso(false);
                setMensajeExitoso("¡Invitado/a registrada!");
            }else{
                setMensaje("No se pudo agregar el invitado/a");
            }
            
        }catch(error){
            setError("No se pudo agregar el invitado/a");
            setMensaje("No se pudo agregar el invitado/a");
        }finally{
            setGuardandoInvitado(false);
        }

    }

    async function guardarRespuestas(event){
        setMensajeExitoso("");
        event.preventDefault();
        setError(null);

        const formulario=new FormData(event.currentTarget);
        const asistenciaValor = formulario.get("asistencia");

        if(asistenciaValor === null){
            setError("Se debe seleccionar un invitado e indicar si asistirá");
            setMensaje("Se debe seleccionar un invitado/a e indicar si asistirá");
            setMensajeExitoso("");
            return;
        }

        if(invitadoSeleccionado===0){
            setError("Se debe seleccionar un invitado");
            setMensaje("Se debe seleccionar un invitado/a");
            setMensajeExitoso("");
            return;
        }

        setGuardando(true);

        try{

            const {error} =await supabase.schema("public").rpc("actualiza", {
                ide: String(invitadoSeleccionado),
                asis: asistenciaValor,
                aler: formulario.get("alergias") ?? null,
                die: formulario.get("dieta") ?? null,
                men: formulario.get("comida") ?? null,
            });
            setMensajeExitoso("¡Datos guardados!");
            setInvitadoSeleccionado(0);
            setMensaje("");
        }catch(error){
            setError("No se pudieron guardar las respuestas.");
        } finally{
            setGuardando(false);
            setPermiso(false);
        }
    }

    return (
        <>
        <Cabecera />
        {mensajeExitoso && <div id="mensajeExito" className="alerta">
            <span className="alerta-mensaje">{mensajeExitoso}</span>
        </div>}
        {mensaje && <div id="mensajeAviso" className="alerta">
            <span className="alerta-mensaje">{mensaje}</span>
        </div>}
        <div className="container">
            <div id="intro-asistencia" className="caja">
                <div><h3>Formulario Asistencia - {grupo ?? null}</h3></div>
            </div>

            <div id="caja_selector" className="caja">
                <Form.Group id="selector" controlId="invitados">
                    <Form.Label>Selecciona un invitado/a: </Form.Label>
                    <Form.Select name="invitados" id="invitados" value={invitadoSeleccionado} onChange={manejadorSelector}>
                        <option key="0" value="0">Invitado...</option>
                        {invitados.map((invitado) => (
                            <option  key={invitado.id} value={invitado.id}>{invitado.nombre}</option>
                        ))}   
                    </Form.Select>
                </Form.Group>
                {!invitado.bebe && !invitado.menor && permiso && asistencia && <><div id="caja_extra">
                    <br></br>
                    <label htmlFor="invitado_nuevo">Introduce el nombre del invitado/a: </label>
                    <input type="text" ref={inputRef} id="invitado_nuevo" name="invitado_nuevo"></input>
                    <button type="button" onClick={insertarInvitado}>Añadir</button>
                </div></>}

            </div>
        
            <form key={invitado.id ?? "sin-invitado"} onSubmit={guardarRespuestas}>
                <div id="sec_asitencia" className="caja">
                    <h4>¿Asistirás?</h4>
                    <div>
                        <input type="radio" id="input_si" name="asistencia" value="true" defaultChecked={invitado.asistencia===true} onChange={(e) => setAsistencia(true)} required></input>
                        <label htmlFor="input_si">Sí <span className="emojis">&#128525;</span></label>
                    </div>
                    <div>
                        <input type="radio" id="input_no" name="asistencia" value="false" defaultChecked={invitado.asistencia===false} onChange={(e) => setAsistencia(false)} required></input>
                        <label htmlFor="input_no">No <span className="emojis">&#128532;</span></label>
                    </div>
                </div>
                {!invitado.bebe && <><div id="sec_comida" className="caja">
                    <h4>¿Qué te gustaría comer?</h4>
                    {!invitado.menor && !invitado.bebe &&
                    <>
                    <div>
                        <input type="radio" id="input_carne" name="comida" value="carne" defaultChecked={invitado.menu==="carne"} disabled={!asistencia} required></input>
                        <label htmlFor="input_carne">Carne <span className="emojis">&#127830;</span></label>
                    </div>
                    
                    <div>
                        <input type="radio" id="input_pescado" name="comida" value="pescado" defaultChecked={invitado.menu==="pescado"} disabled={!asistencia} required></input>
                        <label htmlFor="input_pescado">Pescado <span className="emojis">&#128031;</span></label>
                    </div>
                    <div>
                        <input type="radio" id="input_vegetariano" name="comida" value="vegetariana" defaultChecked={invitado.menu==="vegetariana"} disabled={!asistencia} required></input>
                        <label htmlFor="input_vegtariano">Opción vegetariana <span className="emojis">&#129367;</span></label>
                    </div>
                    <div>
                        <input type="radio" id="input_celiaco" name="comida" value="celiaca" defaultChecked={invitado.menu==="celiaca"} disabled={!asistencia} required></input>
                        <label htmlFor="input_celiaco">Opción celiaca <span className="emojis">&#x1F33E;&#128683;</span></label>
                    </div>
                    </>}
                    {invitado.menor &&
                    <>
                    <div>
                        <input type="radio" id="input_infantil" name="comida" value="infantil" defaultChecked={invitado.menu==="infantil"} disabled={!asistencia} required></input>
                        <label htmlFor="input_infantil">Menú infantil <span className="emojis">&#10024;</span></label>
                    </div>
                    </>}
                                        
                </div></>}
                {!invitado.bebe && 
                <><div id="sec_dieta" className="caja">
                    <h4>¿Tienes alguna alergia que debamos tener en cuenta?</h4>
                    {invitado.alergia !== null 
                        ? <div className="caja_texto">
                            <textarea id="alergias" name="alergias" rows="3" col="3" defaultValue={invitado.alergia} disabled={!asistencia}></textarea>
                        </div>
                        : <div className="caja_texto">
                            <textarea id="alergias" name="alergias" rows="3" col="3" disabled={!asistencia}></textarea>
                        </div>
                    }         
                    
                </div></>}
                
                <div className="botonera">
                    <input type="submit" value="Guardar"></input>
                </div>
            </form>

 
        </div>
        
        <Footer />

        </>
    )
}