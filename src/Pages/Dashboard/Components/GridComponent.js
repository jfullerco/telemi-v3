import React from 'react'

const GridComponent = ({headerFields, keyProp, label, data, handleSearch, handleClick, handleAddBtn}) => {

  const headerStyle = {
        borderBottomStyle: "solid",
        bottomBorderColor: "black"
      }

  return(
    
      <div className="box">
      
        <div className="title" style={headerStyle}> 
          {label}
            <div className="tile is-pulled-right">
              <button className="button is-small is-link is-rounded mr-1" onClick={handleAddBtn}>Add</button>
              <input 
                className={handleSearch != undefined ? "input is-small is-rounded has-text-black" : "is-hidden"}
                placeholder="SEARCH" 
                onChange={handleSearch && handleSearch} 
              />
            </div> 
        </div>
      
        <div className="table-container">
          <nav className="level">
            <table className="table is-hoverable is-fullwidth ">
              <thead className="is-size-6">
                <tr>
              {headerFields && headerFields.map(col => <th key={col.headerName}>{col.headerName}</th>)}
              </tr>
            </thead>
            <tbody className="is-size-7">
              {data && data.map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => <td className="py-5" style={{width: "20%"}} key={item[col.headerName]} >{item[col.docField]} </td>)}
                </tr>
              )}
              

          </tbody>    
        </table>
        </nav>
      </div>  
  </div> 
  )
}
export default GridComponent