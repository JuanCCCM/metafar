import React from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { AccionTabla, TablaProps } from "./Tabla_types";
import { useNavigate } from "react-router-dom";

const Tabla: React.FC<TablaProps> = ({ acciones, pending }) => {
  const navigate = useNavigate();
  const columnas = [
    {
      name: "Símbolo",
      selector: (row: AccionTabla) => row.symbol,
      sortable: true,
      cell: (row: AccionTabla) => (
        <Button
          variant="light"
          onClick={() => navigate(`/accion/${row.symbol}`)}
        >
          {row.symbol}
        </Button>
      ),
    },
    {
      name: "Nombre",
      selector: (row: AccionTabla) => row.name,
      sortable: true,
    },
    {
      name: "Moneda",
      selector: (row: AccionTabla) => row.currency,
      sortable: true,
    },
    {
      name: "Tipo",
      selector: (row: AccionTabla) => row.type,
      sortable: true,
    },
  ];

  return (
    <DataTable
      columns={columnas}
      data={acciones}
      pagination
      persistTableHead
      progressPending={pending}
    />
  );
};

export default Tabla;
