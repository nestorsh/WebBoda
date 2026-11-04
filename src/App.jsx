import { Routes, Route } from "react-router-dom";

import Portada from "./pages/Portada.jsx";
import Formulario from "./pages/Formulario.jsx";

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Portada />}
            />

            <Route
                path="/confirmacion/:grupo"
                element={<Formulario />}
            />

            <Route
                path="/inicio/:grupo"
                element={<Portada />}
            />


        </Routes>
    );
}

