import React from 'react'
import Report from '../../Reports/Report'

const GridComponent = ({headerFields, keyProp, label, data, sortData, handleSearch, handleClick, handleAddBtn, handlePrintBtn, isVisible, toggleIsVisible}) => {

  const headerStyle = {
        borderBottomStyle: "solid",
        bottomBorderColor: "black"
      }

  return(
    
      <div className="box">
      
        <div className="title" style={headerStyle}> 
          {label} {isVisible != false ? 
            <a className="link ml-2 is-size-7" onClick={toggleIsVisible}>hide</a> : 
            <a className="link ml-2 is-size-7" onClick={toggleIsVisible}>show</a>}
          <div className="is-pulled-right is-clearfix">
            <button className="button is-small is-link is-rounded mr-1" onClick={handleAddBtn}>Add</button>

            {/**Print Report Button */}            
            <Report>
              <div className="title" style={headerStyle}>{label}</div>
              <div className="table-container">
                <nav className="level">
                  <table className="table is-hoverable is-fullwidth ">
                    <thead className="is-size-6">
                      <tr>
                        {headerFields && headerFields.map(rCol => <th style={{width: "20%"}} key={rCol.headerName}>{rCol.headerName}</th>)}
                      </tr>
                    </thead>
                    <tbody className="is-size-7">
                    {data && data.map(rItem => 
                      <tr onClick={()=>handleClick(rItem.id)} key={rItem.id}> 
                      {headerFields && headerFields.map(rCol => 
                        <td className="py-5" style={{width: "20%"}} key={rItem[rCol.headerName]} >
                          {rItem[rCol.docField]} 
                        </td>)}
                      </tr>
                      )}
                    </tbody>    
                  </table>
                </nav>
              </div>
            </Report>
            
              
            </div> 
          </div>

      {isVisible != false ?
        <div className="table-container">
          <input 
            className={handleSearch != undefined ? "input is-small is-rounded has-text-black" : "is-hidden"}
            placeholder="SEARCH" 
            onChange={handleSearch && handleSearch} 
          />
          <nav className="level">
            <table className="table is-hoverable is-fullwidth ">
              <thead className="is-size-6">
                <tr>
              {headerFields && headerFields.map(col => <th style={{width: "20%"}} key={col.headerName}>
              
              {col.headerName}</th>)}
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
      </div>  : "" }
  </div> 
  )
}
export default GridComponent