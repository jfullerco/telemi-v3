import React from 'react'

import MapListTable from '../Tables/MapListTable'

const PageField = ({field, fieldData, relatedDataMap, handleViewDrawer}) => {
  
  return(
    <>
    {field && [field].map(item => {
      switch (item.inputFieldType) {

          case "text":
            return (
              
              <>  {[fieldData].map(data => data[item.dataField])} </>
              
            )
          case "currency":
            return (
              <>
                $ {[fieldData].map(data => data[item.dataField])}
              </>
            )
          case "related-select":
            return (
              <>
                {[fieldData].map(data => <a onClick={(e)=>handleViewDrawer({id: data[item.relatedDataField], source: item.inputSource, fields: item.relatedViewFields, type: item.relatedDataType})}>{data[item.dataField]} 
                </a> )}
              </>
            )
          case "map-list":
            return (
              <>

                <MapListTable 
                  headerFields={item.relatedHeaderFields}
                  data={relatedDataMap}
                  colRef={item.RelatedCollection}
                />
                
              </>
            )
            default:
              return (
                <>
                  {[fieldData].map(data => data[item.dataField])}
                </>
              )
          }
        })
      } 
    </>
  )
}

export default PageField