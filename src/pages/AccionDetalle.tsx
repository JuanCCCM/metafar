import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerCotizacion, obtenerDetalleAccion } from '../api/accionesApi'; 
import GraficoAccion from '../components/GraficoAccion';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { CotizacionElemento } from '../components/GraficoAccion_Types';

const AccionDetalle = () => {
  const { simbolo } = useParams<{ simbolo: string }>();
  const [tipoVisualizacion, setTipoVisualizacion] = useState<"real" | "historico">('real'); 
  const [intervalo, setIntervalo] = useState<'1min' | '5min' | '15min'>('5min');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [cotizacion, setCotizacion] = useState<CotizacionElemento[]>([]);
  const [ultimoUpdate, setUltimoUpdate] = useState('');
  const [nombre, setNombre] = useState('');
  const [moneda, setMoneda] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (simbolo) { 
      const cargarDetalleAccion = async () => {
        const datos = await obtenerDetalleAccion(simbolo);
        setNombre(datos.name);
        setMoneda(datos.currency);
      };
      cargarDetalleAccion();
    }
  }, [simbolo]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const cargarCotizacion = async () => {
      if (simbolo) try {
        const respuesta = await obtenerCotizacion(simbolo, intervalo, fechaDesde, fechaHasta, tipoVisualizacion);
        if (respuesta && Array.isArray(respuesta)) {
          const datosOrdenados = respuesta.sort((a, b) => {
            const dateA = new Date(a.datetime).getTime(); 
            const dateB = new Date(b.datetime).getTime(); 
            return dateA - dateB; 
          });
          const cotizacionData: CotizacionElemento[] = datosOrdenados.map(dato => [new Date(dato.datetime).getTime(), parseFloat(dato.close)]);
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
      const delay = intervalo === '1min' ? 60000 : intervalo === '5min' ? 300000 : 900000;
      intervalId = setInterval(cargarCotizacion, delay);
    }

    return () => clearInterval(intervalId); 
  }, [tipoVisualizacion, intervalo, fechaDesde, fechaHasta, simbolo]);
  return (
    <Container fluid className='bg-light'>
    <Row>
    <Col md="auto" className="d-flex bg-danger justify-content-start">
          <Button
            onClick={() => navigate('/')}
            style={{
              background: `url('/arrow.png') no-repeat center center / contain`,
              border: 'none',
              width: '50px',
              height: '50px', 
            }}
          />
        </Col>
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
        <select value={intervalo} onChange={(e) => setIntervalo(e.target.value as '1min' | '5min' | '15min')}>
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