import "../styles/CuentaAtras.css"
import { useState, useEffect } from "react";

function CuentaAtras() {

    const fechaBoda = new Date("2027-07-24T00:00:00").getTime();

    const formatear = (num) => String(num).padStart(2,'0');
    
    function calcular(){
        const ahora=new Date().getTime();
        const diferencia=fechaBoda-ahora;

        if (diferencia<=0){
            return {
                dias: 0,
                horas: 0,
                minutos: 0,
                segundos: 0
            }
        }

        return {
            dias: formatear(Math.floor(diferencia/(1000*3600*24))),
            horas: formatear(Math.floor((diferencia/(1000*3600))%24)),
            minutos: formatear(Math.floor((diferencia/(1000*60))%60)),
            segundos: formatear(Math.floor((diferencia/1000)%60))
        }
    }

    const[tiempo, setTiempo]=useState(calcular);

    useEffect(() =>{
        const timer=setInterval( ()=>{
            setTiempo(calcular);
        }, 1000);

        return () => clearInterval(timer);

    },[])

    
    
    return (
        <div className="cuenta-atras">
            <div>
                <span>{tiempo.dias}</span>
                <p>Días</p>
            </div>

            <div>
                <span>{tiempo.horas}</span>
                <p>Horas</p>
            </div>

            <div>
                <span>{tiempo.minutos}</span>
                <p>Minutos</p>
            </div>

            <div>
                <span>{tiempo.segundos}</span>
                <p>Segundos</p>
            </div>
        </div>
    );
}

export default CuentaAtras;