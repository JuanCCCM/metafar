import React, { useState, useEffect, useMemo } from 'react';
import { obtenerAcciones } from '../api/accionesApi';
import Tabla from '../components/Tabla';
import { Container, Row, Col } from 'react-bootstrap'

const AccionesLista = () => {
  const [acciones, setAcciones] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroSimbolo, setFiltroSimbolo] = useState('');

  useEffect(() => {
    const cargarAcciones = async () => {
      const datos = await obtenerAcciones();
      console.log(datos, "acciones sin filtrar")
      setAcciones(datos);
    };

    cargarAcciones();
  }, []);

  const accionesFiltradas = useMemo(() => acciones.filter(accion =>
    accion.name.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    accion.symbol.toLowerCase().includes(filtroSimbolo.toLowerCase())
  ), [acciones, filtroNombre, filtroSimbolo]);

 
console.log(accionesFiltradas, "acciones")
  return (
    <Container fluid className='bg-light'>
      <Row>
        <Col className="d-flex bg-danger text-white justify-content-center">
      <h1>Acciones Disponibles</h1>
      </Col>
      </Row>
      <Row>
      <Col>
      <Row className='p-2 justify-content-start'>
        <Col className='col-3'>
      
        <input
          type="text"
          placeholder="Buscar por símbolo..."
          value={filtroSimbolo}
          onChange={(e) => setFiltroSimbolo(e.target.value)}
        />
        </Col>
        <Col className='col-4'>
        
         <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
      </Col>
      </Row>
      </Col>
      </Row>
      <Tabla acciones={accionesFiltradas}  />
      
      
    </Container>
  );
};

export default AccionesLista;