/* eslint-disable react/react-in-jsx-scope */
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

function Basic() {
  // Row Data: The data to be displayed.
  const [rowData] = useState<IRow[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);

  return (
    <div
      className={
        "ag-theme-quartz"
      }
      style={{ width: '100%', height: '500px' }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  )
}

export default Basic
