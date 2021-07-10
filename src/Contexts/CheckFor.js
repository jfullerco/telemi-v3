import React from 'react'

const CheckFor = ({value, setValue, fallbackValue, handleSetCache, children}) => {
  value != undefined & value != "" ? value : handleSetCache(fallbackValue, setValue)
  return(
    <>
      {children}
    </>
  ) 
}
export default CheckFor