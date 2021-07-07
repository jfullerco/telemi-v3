import React from 'react'

import MapListTable from '../Tables/MapListTable'

const PageField = ({field, fieldData, relatedDataMap, handleViewDrawer}) => {
  
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
          case "related-select":
            return (
              <>
                {[fieldData].map(d => <a onClick={(e)=>handleViewDrawer({isVisible: true, data: {...d}})}>{d[f.dataField]}</a> )}
              </>
            )
          case "map-list":
            return (
              <>

                <MapListTable 
                  headerFields={f.relatedHeaderFields}
                  data={relatedDataMap}
                  delBtn={true}
                  colRef={f.RelatedCollection}
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