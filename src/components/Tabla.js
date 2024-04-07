import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Tabla = ({ acciones }) => {
  const columnas = [
    {
      name: 'Símbolo',
      selector: row => row.symbol,
      sortable: true,
      cell: row => <Button variant="light" href={`/accion/${row.symbol}`}>{row.symbol}</Button>,
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Moneda',
      selector: row => row.currency,
      sortable: true,
    },
    {
      name: 'Tipo',
      selector: row => row.type,
      sortable: true,
    },
  ];

 
  return (
    <DataTable
      columns={columnas}
      data={acciones}
      pagination
      persistTableHead
    />
  );
};

export default Tabla;