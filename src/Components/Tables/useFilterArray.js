import React, { useState, useEffect } from 'react'

const useFilterArray = (data, params) => {
  const [dataRef, setDataRef] = useState(data)

  return dataRef.filter(data => data[params.colRef] == params.filterRef)
}
export default useFilterArray