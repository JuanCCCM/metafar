import React, { useState, useEffect, useMemo } from 'react';
import { obtenerAcciones } from '../api/accionesApi';
import Tabla from '../components/Tabla';
import { Container, Row, Col } from 'react-bootstrap'
import { Accion } from '../api/accionesApi_Types';

const AccionesLista = () => {
  const [acciones, setAcciones] = useState<Accion[]>([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroSimbolo, setFiltroSimbolo] = useState('');
  const [pending, setPending ] = useState<boolean>(true)

  useEffect(() => {
    const cargarAcciones = async () => {
      setPending(true)
      const datos = await obtenerAcciones();
      setAcciones(datos);
      setPending(false)
    };

    cargarAcciones();
  }, []);

  const accionesFiltradas = useMemo(() => acciones.filter(accion =>
    accion.name.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    accion.symbol.toLowerCase().includes(filtroSimbolo.toLowerCase())
  ), [acciones, filtroNombre, filtroSimbolo]);

 

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
      <Tabla acciones={accionesFiltradas} pending={pending}  />
      
      
    </Container>
  );
};

export default AccionesLista;