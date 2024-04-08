import axios from "axios";
import { Accion } from "./accionesApi_Types";

const BASE_URL = "https://api.twelvedata.com";
const API_KEY = process.env.REACT_APP_API_KEY;

export const obtenerAcciones = async (): Promise<Accion[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/stocks?source=docs&exchange=NYSE`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener acciones", error);
    throw new Error(`No se pudo obtener la lista de acciones`);
  }
};

export const obtenerDetalleAccion = async (
  simbolo: string
): Promise<Accion> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/stocks?symbol=${simbolo}&apikey=${API_KEY}`
    );
    return response.data.data[0];
  } catch (error) {
    console.error(`Error al obtener el detalle de la acción ${simbolo}`, error);
    throw new Error(`No se pudo obtener el detalle para la acción ${simbolo}`);
  }
};

export const obtenerCotizacion = async (
  simbolo: string,
  intervalo: string,
  fechaDesde: string = "",
  fechaHasta: string = "",
  tipoVisualizacion: "real" | "historico" = "real"
) => {
  let url = `${BASE_URL}/time_series?symbol=${simbolo}&interval=${intervalo}&apikey=${API_KEY}`;

  if (tipoVisualizacion === "historico" && fechaDesde && fechaHasta) {
    url = `${BASE_URL}/time_series?symbol=${simbolo}&interval=${intervalo}&start_date=${fechaDesde}&end_date=${fechaHasta}&apikey=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.values) {
      
      return data.values;
    } else {
      console.error("No se encontraron datos en la respuesta de la API:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al realizar la solicitud a la API:", error);
    return [];
  }
};
