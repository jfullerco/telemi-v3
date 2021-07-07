import React from 'react'

const MapListTable = ({
  data,
  headerFields,

}) => {
  return(
    <>
      <table className="table is-hoverable is-fullwidth ">
        <thead className="is-size-6">
          <tr>
            {headerFields && headerFields.map(col => 
              <th style={{width: "20%"}} key={col.keyProp}>

                {col.headerName && col.headerName}

              </th>
            )}
          </tr>
        </thead>
        <tbody className="is-size-7">
            
          { data && data != undefined ? data.map(item => 
            <tr onClick={()=>handleClick(item.id)} key={item.id}> 
              {headerFields && headerFields.map(col => 

                <td className="py-5" style={{width: "20%"}} key={item[col.headerName]} >

                  {col.fieldType === 'currency' ? "$" : ""}{item[col.docField]} 

                </td>

              )}
            </tr>
          ) : "" }
          
        </tbody>  
      </table>
    </>
  )
}
export default MapListTable