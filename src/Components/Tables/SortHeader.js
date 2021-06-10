import React from 'react'

const useSort = ({label, colRef, data, setData}) => {

  const useSort = () => { 
    
    const sortedDataRef = data != "" ? data.sort((a, b) => (a.colRef > b.colRef) ? 1 : -1) : ""
    setData(sortedDataRef)
  }
  

  return(
    <>
    {data && data != "" ? 
      <a onClick={handleSort} className="link">{label}</a> :
      "test"
    }
    </>
  )
}
export default SortHeader