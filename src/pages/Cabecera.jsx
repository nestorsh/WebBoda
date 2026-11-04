import "../styles/cabecera.css";
import { Link,useLocation,useParams } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Cabecera(){
	const codigoGrupo=useParams().grupo;
    return (
        <>
        <nav className="nave">
			<div className="logo"><img src={logo} alt="logo" /></div>
  			<ul className="menu">
			    <li><Link to={`/inicio/${codigoGrupo}`}>Inicio</Link></li>
			    <li><Link to={`/inicio/${codigoGrupo}#historia`}>Nuestra historia</Link></li>
			    <li><Link to={`/inicio/${codigoGrupo}#detalles`}>Detalles</Link></li>
			    <li><Link to={`/confirmacion/${codigoGrupo}`}>Confirmación</Link></li>
 			</ul>
		</nav>
        </>
    )
}
