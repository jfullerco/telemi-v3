import React from 'react'

const SortHeader = ({label, colRef, data, setData}) => {

  const sortedDataRef = data != "" ? data.sort(colRef) : ""

  return(
    <>
    {data && data != undefined ? 
      <a onClick={() => setData(sortedDataRef)} className="link">{label}</a> :
      {label}
    }
    </>
  )
}
export default SortHeader