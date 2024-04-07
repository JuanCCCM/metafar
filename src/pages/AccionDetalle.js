import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerCotizacion, obtenerDetalleAccion } from '../api/accionesApi'; // Asegúrate de implementar esta función correctamente en tu API.
import GraficoAccion from '../components/GraficoAccion';
import { Col, Container, Row } from 'react-bootstrap';

const AccionDetalle = () => {
  const { simbolo } = useParams();
  const [tipoVisualizacion, setTipoVisualizacion] = useState('real'); // 'real' o 'historico'
  const [intervalo, setIntervalo] = useState('5min');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [cotizacion, setCotizacion] = useState([]);
  const [ultimoUpdate, setUltimoUpdate] = useState('');
  const [nombre, setNombre] = useState('');
  const [moneda, setMoneda] = useState('');
  useEffect(() => {
    const cargarDetalleAccion = async () => {
      const datos = await obtenerDetalleAccion(simbolo);
      setNombre(datos.name)
      setMoneda(datos.currency)
    };
     cargarDetalleAccion();
  }, [simbolo]);

  useEffect(() => {
    let intervalId;

    const cargarCotizacion = async () => {
      try {
        const respuesta = await obtenerCotizacion(simbolo, intervalo, fechaDesde, fechaHasta, tipoVisualizacion);
        if (respuesta && Array.isArray(respuesta)) {
          // Ordenar los datos por datetime antes de actualizar el estado
          console.log(respuesta, "respuestax")
          const datosOrdenados = respuesta.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
          const cotizacionData = datosOrdenados.map(dato => [new Date(dato.datetime).getTime(), parseFloat(dato.close)]);
          setCotizacion(cotizacionData);
          setUltimoUpdate(`Última actualización: ${new Date().toLocaleTimeString()}`);
        } else {
          console.error('La respuesta de la API no es un array', respuesta);
          setCotizacion([]);
        }
      } catch (error) {
        console.error('Error al cargar la cotización', error);
        setCotizacion([]);
      }
    };
    cargarCotizacion();

    if (tipoVisualizacion === 'real') {
      // Actualizar cotización cada minuto según el intervalo seleccionado
      const delay = intervalo === '1min' ? 60000 : intervalo === '5min' ? 300000 : 900000;
      intervalId = setInterval(cargarCotizacion, delay);
    }

    return () => clearInterval(intervalId); // Limpieza al desmontar o cambiar de tipo
  }, [tipoVisualizacion, intervalo, fechaDesde, fechaHasta, simbolo]);
console.log(useParams(), "effff")
  return (
    <Container fluid className='bg-light'>
    <Row>
    <Col className="d-flex bg-danger text-white justify-content-center">
      <h1>{simbolo} - {nombre} - {moneda} </h1>
      </Col>
      </Row>
      <Row>
        <Col md="auto">
        <label>
          <input
            type="radio"
            value="real"
            checked={tipoVisualizacion === 'real'}
            onChange={() => setTipoVisualizacion('real')}
          /> Tiempo Real
        </label>
        </Col>
        <Col md="auto">
        <label>
          <input
            type="radio"
            value="historico"
            checked={tipoVisualizacion === 'historico'}
            onChange={() => setTipoVisualizacion('historico')}
          /> Histórico
        </label>
        </Col>
        <Col md="auto" className='d-flex flex-row'>
          <div style={{paddingRight: "4px"}}>
            <p>Intervalo</p>
            </div>
            <div>
        <select value={intervalo} onChange={(e) => setIntervalo(e.target.value)}>
          <option value="1min">1 min</option>
          <option value="5min">5 min</option>
          <option value="15min">15 min</option>
        </select>
        </div>
        </Col>
        
        {tipoVisualizacion === 'historico' && (
          <Col md="auto" className='d-flex flex-row'>
          <>
          <div style={{paddingRight: "4px"}}>
          <p>Fecha desde:</p>
          </div>
          <div style={{paddingRight: "8px"}}>
            <input
              type="datetime-local"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
            />
            </div>
            
            <div style={{paddingRight: "4px"}}>
              <p>Fecha hasta:</p>
            </div>
            <div>
            <input
              type="datetime-local"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
            />
            </div>
          </>
          </Col>
        )}
        
      </Row>
      
      <GraficoAccion cotizacion={cotizacion} intervalo={intervalo} />
      
      <Row>
    <Col className="d-flex justify-content-center">
    {tipoVisualizacion === 'real' && <div>{ultimoUpdate}</div>}
      </Col>
      </Row>
    </Container>
  );
};

export default AccionDetalle;