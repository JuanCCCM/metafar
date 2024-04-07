import axios from 'axios';

const BASE_URL = 'https://api.twelvedata.com';
const API_KEY = process.env.REACT_APP_API_KEY;

export const obtenerAcciones = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/stocks?source=docs&exchange=NYSE`);
      console.log(response.data.data, "responseee")
      return response.data.data; // Ajusta según la respuesta de la API
    } catch (error) {
      console.error('Error al obtener acciones', error);
      return [];
    }
  };

  export const obtenerDetalleAccion = async (simbolo) => {
    try {
      const response = await axios.get(`${BASE_URL}/stocks?symbol=${simbolo}&apikey=${API_KEY}`);
      return response.data.data[0]; // Ajusta según la respuesta de la API
    } catch (error) {
      console.error(`Error al obtener el detalle de la acción ${simbolo}`, error);
      return {};
    }
  };
  
  export const obtenerCotizacion = async (simbolo, intervalo, fechaDesde = '', fechaHasta = '', tipoVisualizacion = 'real') => {
    
    let url = `${BASE_URL}?symbol=${simbolo}&interval=${intervalo}&apikey=${API_KEY}`;
  
    // Si la visualización es histórica y se proporcionaron fechas, añádelas a la URL
    if (tipoVisualizacion === 'historico' && fechaDesde && fechaHasta) {
      url += `&start_date=${fechaDesde}&end_date=${fechaHasta}`;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Twelvedata envuelve la serie temporal en un objeto 'values' dentro de la respuesta.
      // Asegúrate de que este ajuste refleje la estructura real de la respuesta de tu API.
      if(data && data.values) {
        return data.values;
      } else {
        console.error('No se encontraron datos en la respuesta de la API:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al realizar la solicitud a la API:', error);
      return [];
    }
  };