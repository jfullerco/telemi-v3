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
                {[fieldData].map(d => console.log("d:", d, "relatedData:", relatedDataMap, "field:", f)) }
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