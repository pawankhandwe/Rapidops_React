import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {  useEffect, useRef, useState } from 'react';
import '../App.css';
import { data } from '../MOCK_DATA'
import { EuiIcon } from '@elastic/eui';
// import Search from './search';


export function Ag_grid(): JSX.Element {
  const [rowData, setrow] = useState<any>([]);
  const ag_ref = useRef<AgGridReact>(null);
  const [btnVisible, setbtnVisible] = useState(true);

  useEffect(() => { setrow(data) }, []);
  var gridapi: any;

  const onGridready = () => {
    gridapi = ag_ref;
  }


  const columnDefs = [
    { headerName: "First Name", field: "first_name", sortable: true, unSortIcon: true, editable: true, flex: 1, hide: false },
    { headerName: "Last Name", field: "last_name", sortable: true, unSortIcon: true, flex: 1, editable: true, hide: false },
    { headerName: "Gender", field: "gender", sortable: true, unSortIcon: true, flex: 1, editable: true, hide: false },
    { headerName: "Email", field: "email", sortable: true, unSortIcon: true, flex: 1, editable: true, hide: false },
    { headerName: "Date of Birth", field: "dob", sortable: true, unSortIcon: true, flex: 1, editable: true, hide: false },
    {
      // headerName: "Actions",

      cellRenderer: (params: any) => (
        <div>
          <EuiIcon
            type="pencil"
            onClick={() => onEditButtonClick(params.data.id)}

          />
          <EuiIcon
            type="trash"
            onClick={() => deleteitem(params.data.id)}
            style={{ marginLeft: "40px" }}
          />
        </div>
      ),
    },
  ];

  const onBtHideMedals = (params: any, index: number) => {
    const hidedata: any = ag_ref.current?.columnApi?.getColumnState();
    ag_ref.current?.columnApi.applyColumnState({
      state: [
        { colId: params, hide: !hidedata[index].hide },
      ],
    });
  };



  function onAdd() {
    const N_id = { id: Date.now(), first_name: "", last_name: "", email: "", gender: "", dob: "" };
    setrow([N_id, ...rowData]);
    console.log("hii");
    onEditButtonClick(N_id.id);
  }

  const deleteitem = (id: number) => {
    const newitem = rowData?.filter((elem: any) => {
      return id !== elem.id;
    });
    setrow(newitem);
  }

  const onEditButtonClick = (index: number) => {

    ag_ref.current?.api.setFocusedCell(index, 'first_name');
    ag_ref.current?.api.startEditingCell({
      rowIndex: index,
      colKey: 'first_name'
    });
  }

  const onBtnExport = () => {
    ag_ref.current?.api.exportDataAsCsv();
  };

  function onFilterTextBoxChanged(filterText: string) {
    ag_ref.current?.api.setQuickFilter(filterText);
  }

  return (
    <>
      <div className='search'>
        <h4>Search : <div><input onChange={(e) => onFilterTextBoxChanged(e.target.value)}></input>
          <div>
            <select className="my-select">
              {
                columnDefs.filter((x: any) => x.field).map((x: any, i: number) => {

                  return <option key={i} value={x.id} style={{ color: x.hide ? 'gray' : 'black' }} onClick={() => onBtHideMedals(x.field, i)}>{x.field}</option>
                })
              }
            </select>
          </div>
        </div></h4>
      </div>

      <div className='btn'>
        <button onClick={onAdd}>Add</button>
        <button onClick={onBtnExport}>Export To Excel</button>
      </div>

      <div className='flex'>
        <div className='ag-theme-alpine' style={{ height: 310, width: 1210 }}>
          <AgGridReact ref={ag_ref} rowData={rowData}
            columnDefs={columnDefs} pagination={true} paginationPageSize={5} onGridReady={onGridready} editType={'fullRow'} />
        </div>
      </div>
    </>
  );
}