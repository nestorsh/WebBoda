import Cabecera from "./Cabecera";
import Footer from "./Footer";
import "../styles/Portada.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import imagenAnillos from "../assets/anillos.png";
import imagenCopas from "../assets/copas.png";
import imagenIglesia from "../assets/iglesia.png";
import imagenAlianzas from "../assets/anillos_flores.png";
import collage from "../assets/collage.svg";
import logo from "../assets/logo.png";

function Portada() {
  const location = useLocation();
  const {grupo}=useParams();
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);

            document.getElementById(id)?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [location]);
    return (
      <main className="web-boda">
        <Cabecera/>
        <header className="portada" id="inicio">
          <div className="portada-contenido">
            <div className="portada-texto">

              <h1>
                Néstor
                <span className="subtitulo">
                  <span className="ampersand">&amp;</span>
                  {" "}Kimberley
                </span>
              </h1>

              <div className="raya" />

              <p className="fecha">
                24 JUNIO 2027
              </p>

              <p className="mensaje">
                Nos hace ilusión celebrar este día
                rodeados de las personas que queremos.
              </p>

              <Link to={`/confirmacion/${grupo}`} className="boton">
                CONFIRMAR ASISTENCIA →
              </Link>

            </div>

            <div className="portada-ilustracion">
              <img src={logo} alt="logo" />
            </div>
          </div>

          <div className="separador-floral" aria-hidden="true">
            <span />
            <span className="mini-flor">❀</span>
            <span />
          </div>
        </header>

        <section className="historia" id="historia">
          <div className="seccion-texto">
            <p className="etiqueta">UN CAMINO JUNTOS</p>
            <h2>Nuestra historia</h2>

            <p>
              Nos conocemos desde 2012 y 
              seguramente nos habrás visto juntos en múltiples ocasiones.
              Hay momentos que cambian una historia
              para siempre y es por ello que queremos celebrar el comienzo
              de esta nueva etapa rodeados de las personas
              que nos han visto crecer.
            </p>

            <p className="frase">
              Y queremos compartirlo contigo <span>♡</span>
            </p>
          </div>

          <div className="seccion-ilustracion">
            <img id="collage" src={collage} alt="Imágenes" />
          </div>
        </section>

        <section className="detalles" id="detalles">
          <p className="etiqueta">RESERVA LA FECHA</p>
          <h2>Detalles de la boda</h2>
          <p className="introduccion">
            Todo lo que necesitas saber para acompañarnos.
          </p>

          <div className="detalles-grid">
            <article className="detalle">
              <div className="icono">
                <img src={imagenAnillos} alt="Imagen anillos" />
              </div>
              <h3>FECHA Y HORA</h3>
              <p>24 de junio de 2027</p>
              <p>13:15 h</p>
            </article>

            <article className="detalle">
              <div className="icono coral">
                <img src={imagenIglesia} alt="Imagen anillos" />
              </div>
              <h3>CEREMONIA</h3>
              <p>Basílica de Nuestra Señora del Pino</p>
              <p>Teror</p>
            </article>

            <article className="detalle">
              <div className="icono mostaza">
                <img src={imagenCopas} alt="Imagen anillos" />
              </div>
              <h3>CELEBRACIÓN</h3>
              <p>Hotel Rural Maipez</p>
              <p><Link to="https://maps.app.goo.gl/GcLpWpVm8rFFUb4n6">c/ La Calzada, 104</Link></p>
            </article>
          </div>
        </section>

        <section className="confirmacion" id="confirmacion">
          <div className="confirmacion-texto">
            <p className="etiqueta">QUEREMOS CONTAR CONTIGO</p>
            <h2>¿Nos acompañas?</h2>
            <p>
              Confirma tu asistencia y comparte con nosotros
              tus preferencias para ese día.
            </p>

            <Link to={`/confirmacion/${grupo}`} className="boton">
              CONFIRMAR ASISTENCIA →
            </Link>
          </div>

          <div className="confirmacion-ilustracion">
            <img src={imagenAlianzas} alt="Imagen anillos" />
          </div>
        </section>

        <Footer/>
      </main>
    );
}


export default Portada;
