import React, {useState, useEffect} from 'react'

const useSortData = (dataRef, sortRef) => {
  
  const [sortData, setSortData] = useState(dataRef)

  const handleSortData = () => {
    const sortedDataRef = dataRef.sort((a, b) => (a[sortRef] > b[sortRef]) ? 1 : -1 ) 
    setSortData(sortedDataRef)
  }

  useEffect(()=>{
    handleSortData(dataRef, sortRef)
    },[])

  return [sortData]
  
}
export default useSortData
