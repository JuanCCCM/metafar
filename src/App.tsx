import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccionesLista from './pages/AccionesLista';
import AccionDetalle from './pages/AccionDetalle';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AccionesLista />} />
          <Route path="/accion/:simbolo" element={<AccionDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;