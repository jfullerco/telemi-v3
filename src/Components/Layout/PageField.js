import React from 'react'

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
              {console.log(relatedDataMap)}
                {[fieldData].map(d => relatedDataMap != undefined ? relatedDataMap.filter(r => r[relatedDataField] === d).map(r => console.log(r)) : "") }
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