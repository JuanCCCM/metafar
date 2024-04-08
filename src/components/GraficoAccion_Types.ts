export type CotizacionElemento = [number, number];

export interface GraficoAccionProps {
  cotizacion: CotizacionElemento[];
  intervalo: '1min' | '5min' | '15min';
}