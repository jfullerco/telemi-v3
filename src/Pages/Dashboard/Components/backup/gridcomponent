import React from 'react'
import Report from '../../Reports/Report'

import Column from '../../../Components/Layout/Column'
import FilterSelectInput from '../../../Components/Tables/useFilterArray'


const GridComponent = ({
  headerFields,  
  label, 
  data,
  resetter, 
  handleSearch,
  handleFilter, 
  handleClick, 
  handleAddBtn,  
  isVisible, 
  toggleIsVisible}) => {

  

  const headerStyle = {
        borderBottomStyle: "solid",
        bottomBorderColor: "black"
      }

  return(
      
      <div className={data != undefined ? "box" : "is-hidden"}>
      
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
                  <table className="table is-hoverable is-fullwidth ">
                    <thead className="is-size-6">
                      <tr>
                        {headerFields && headerFields.map(rCol => 
                        <th style={{width: "20%"}} key={rCol.keyProp}>   
                            {rCol.headerName}
                        </th>)}
                      </tr>
                    </thead>
                    <tbody className="is-size-7">
                    {data && data != undefined ? data.map(rItem => 
                      <tr onClick={()=>handleClick(rItem.id)} key={rItem.id}> 
                      {headerFields && headerFields.map(rCol => 
                        <td className="py-5" style={{width: "20%"}} key={rItem[rCol.headerName]} >
                          {rItem[rCol.docField]} 
                        </td>)}
                      </tr>
                      ) : ""}
                    </tbody>    
                  </table>
              </div>
            </Report>
              
            </div> 
          </div>

      {isVisible != false ?

        <div className="table-container">
          
          <Column>
            <input 
            className={handleSearch != undefined ? "input is-small is-rounded has-text-black" : "is-hidden"}
            placeholder="SEARCH" 
            onChange={handleSearch && handleSearch} 
            />
          </Column>
          
          <table className="table is-hoverable is-fullwidth ">
            <thead className="is-size-6">
              <tr>
                {headerFields && headerFields.map(col => 
                  <th style={{width: "20%"}} key={col.keyProp}>

                    {col.headerName}

                  <FilterSelectInput
                    dataRef={data}
                    colRef={col.docField}
                    onSelect={(e)=>handleFilter(e)}
                    onReset={(e)=>resetter(e)}
                    isFilterable={col.filterable}
                  />

                  </th>
                )}
              </tr>
            </thead>
            <tbody className="is-size-7">
            
              {data && data != undefined ? data.map(item => 
                <tr onClick={()=>handleClick(item.id)} key={item.id}> 
                  {headerFields && headerFields.map(col => 
                    <td className="py-5" style={{width: "20%"}} key={item[col.headerName]} >
                      {item[col.docField]} 
                    </td>)}
                </tr>
              ) : ""}
          </tbody> 
          <tfoot>
            
          </tfoot>   
        </table>
      
      </div>  : "" }
  </div> 
  )
}
export default GridComponent