import React from 'react'

import DeleteButton from '../Buttons/DeleteButton'

const MapListTable = ({
  data,
  colRef,
  headerFields,
  handleClick
}) => {
  return(
    <>
      <table className="table is-hoverable">
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
            <tr key={item.id}> 
            
              {headerFields && headerFields.map(col =>

                <td className="py-5" style={{ width: "20%" }} key={item[col.headerName]} name={col.relatedCollection} value={item[col.docField]}>

                  <a onClick={(e) => handleClick({ colRef: colRef, id: item.id })}>
                    {col.fieldType === 'currency' ? "$" : ""}{item[col.docField]}
                  </a>
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