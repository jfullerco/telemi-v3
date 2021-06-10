import React, {useState, useEffect} from 'react'

const sortDataHook = ({sortRef, dataRef}) => {
  
  const [sortType, setSortType] = useState()
  const [dataToSort, setDataToSort] = useState()
  const [sortedData, setSortedData] = useState()

  const useSort = ({dataRef, sortRef}) => {
    console.log(dataRef, sortRef)
      {/**setDataToSort(dataRef)
    setSortType(sortRef)
    const sortedDataRef = dataToSort.sort((a, b) => (a.sortType > b.sortType) ? 1 : -1 )
    return console.log(sortedDataRef) 
   setSortedData(sortedDataRef)*/}
  }
  
}
export {useSort, sortedData}