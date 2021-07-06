import React from 'react'

const PageField = ({field, fieldData}) => {
  
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
                {[fieldData].map(d => console.log(d[f.dataField])) }
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