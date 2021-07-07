import React from 'react'

import MapListTable from '../Tables/MapListTable'

const PageField = ({field, fieldData, relatedDataMap}) => {
  
  return(
    <>
    {field && [field].map(f => {
      switch (f.inputFieldType) {

          case "text":
            return (
              
              <>  {[fieldData].map(d => d[f.dataField])} </>
              
            )
          case "currency":
            return (
              <>
                $ {[fieldData].map(d => d[f.dataField])}
              </>
            )
          case "map-list":
            return (
              <>
                <MapListTable 
                  headerFields={f.relatedHeaderFields}
                  data={relatedDataMap}
                />
                
              </>
            )
            default:
              return (
                <>
                  {[fieldData].map(d => d[f.dataField])}
                </>
              )
          }
        })
      } 
    </>
  )
}

export default PageField