import React, {useState, useRef} from 'react'

const DataGrid = ({rows, columns, onSelect}) => {

  const [dgRows, setDGRows] = useState()
  const [dgColumns, setDGColumns] = useState(columns)
  
  
rows.map((r) => Object.entries(r).forEach(([key, value]) => (
  console.log(value)
)))


return (
  <>
  {dgRows != undefined ?
  <div className="table-container">
    <table className="table is-fullwidth">
      <thead>
        <tr>
          {dgColumns != undefined ? dgColumns.map(col => (
            <th>{col.headerName}</th>
          )) : "No Column Data Provided"}
        </tr>
      </thead>
      <tbody>
        <tr>
          
        </tr>
      </tbody>
    </table>
  </div>
  : ""}
  </>
)
}
export default DataGrid