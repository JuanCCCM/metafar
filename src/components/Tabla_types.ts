export interface AccionTabla {
    symbol: string;
    name: string;
    currency: string;
    type: string;
  }
  
  export interface TablaProps {
    acciones: AccionTabla[];
    pending: boolean
  }