import React from 'react'

const CheckIfNeedsCache = ({value, setValue, fallbackValue, handleSetCache, children}) => {
  value != undefined & value != "" ? value : handleSetCache(fallbackValue, setValue)
  return(
    <>
      {children}
    </>
  ) 
}
export default CheckIfNeedsCache