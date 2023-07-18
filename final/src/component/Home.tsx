import { useNavigate } from "react-router-dom";
import '../App.css';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useEffect, useState } from "react";


export default function Home() {
  const nav = useNavigate();
  const [keys, setKeys] = useState<string[]>([]);

  localStorage.removeItem("undefined");
  useEffect(() => {
    const keys = Object.keys(localStorage);
    setKeys(keys);
  }, []);

  console.log(keys);
  const columnDefs = [
    { headerName: "Key", field: "key" },
    {
      headerName: "",
      cellRenderer: (params: any) => (
        <button onClick={() => nav(`/EditData/${params.data.key}`)}>Edit Data</button>
      ),
      maxWidth: 100,
    },
  ];

  const rowData = keys.map(key => ({ key }));

  return (
    <div className="Home-btn">
      <button onClick={() => { nav("/Tree") }}>Add data</button>
      <br></br>
      <br></br>
      
      {keys.length>0?(<div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>):(<p>No Data</p>)}
      
    </div>
  )
}
